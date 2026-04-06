# Auditoría Técnica - Kanban Web App

A continuación se presenta una auditoría técnica profunda y crítica basada en la estructura de tu proyecto Kanban (Store, Services, Components y Tipos), enfocada en estabilidad, escalabilidad y prácticas de nivel Principal Engineer.

---

## 1. Arquitectura de Estado (Zustand)
**Calificación: 7.5 / 10**

**Lo que está bien:**
- El estado está centralizado y permite inyectar acciones (`moveTaskInStore`, `setAddTask`) que encapsulan la lógica de transformación del tablero.
- El patrón de devolver un valor (`calculatedPosition`) desde una acción síncrona del store para ser consumido por el componente y efectuar la llamada asíncrona es un excelente uso de responsabilidades. Mantiene el store limpio de "side-effects" (API calls).

**Lo que podría ser mejor:**
- **Mutaciones Involuntarias:** En `moveTaskInStore` se hace un clon superficial de las columnas (`[...state.activeBoard.columns]`), pero se muta la tarea extraída directamente: `movedTask.columnId = destinationColId` y `movedTask.position = calculatedPosition`. Esto rompe los principios de inmutabilidad de React/Zustand si en algún momento otras partes de la app mantienen referencias a esos objetos mutados.
- **Acoplamiento del Estado:** `useBoardStore` mezcla la lista de `boards`, el `activeBoard` completo, y estados de UI como `isSyncing` o `isLoading`.
- **Patrón Snapshot en UI:** El clon profundo con `JSON.parse(JSON.stringify(activeBoard))` se realiza en el componente `BoardColumns.tsx`. Esto es costoso en memoria y rendimiento si el tablero crece mucho con cientos de tareas y subtareas.

**El "Por qué" técnico:**
Para escalar un store de Zustand que maneja anidamiento profundo (Board -> Columns -> Tasks -> Subtasks), la mutación sutil sin inmutabilidad estricta (como la que provee **Immer**) causará bugs de renderizado (tareas fantasmas, drag events que se desincronizan). El componente no debería realizar el *deep clone*; el store debería ser el encargado de manejar su estado previo ("Undo/History pattern").

---

## 2. Estrategia de Persistencia
**Calificación: 8.5 / 10**

**Lo que está bien:**
- **Fractional Indexing:** Es la solución madura para este problema. Calcular el punto medio evita la re-escritura masiva de docenas de tareas en la base de datos cada vez que se mueve un ítem (lo que sucedería con índices secuenciales 0, 1, 2...).
- Integración sólida empleando Next.js Server Actions RPC (`"use server"`) en la carpeta `services/`, abstrayendo la llamada a REST de Strapi del componente. 
- Uso ordenado de `POSITION_STEP` para generar suficiencia de espacio en el índice.

**Lo que podría ser mejor:**
- **Resolución de Colisiones:** La función `fractionalIndexingTask` detecta colisiones y levanta un warning (`console.warn`), pero requiere re-indexar reactivamente y propagar ese update hacia Strapi para asegurar que la re-indexación persista.
- **Llamadas Concurrentes (Race Conditions):** En `updateColumnsOrder` se disparan múltiples promesas con `Promise.all` para actualizar cada columna con Strapi. Si la concurrencia es alta o hay fallos de red, la asincronía puede dejar índices truncos. Fallar un índice de la cadena no revierte los otros índices.

**El "Por qué" técnico:**
El Fractional Indexing se degrada por la pérdida de precisión flotante. Tarde o temprano tendrás colisiones (distance <= 1) en listas donde un ítem se mueve múltiples veces entre las mismas tareas. Es crucial implementar un sistema de **re-balancing** automático (distribuir de nuevo en `POSITION_STEP`) una vez que se activa el *warning*. 

---

## 3. UX & Resiliencia
**Calificación: 8.0 / 10**

**Lo que está bien:**
- **Optimistic UI:** La interfaz se compromete al inmediato del movimiento de la tarea a través de `moveTaskInStore`, lo que elimina percepciones de latencia. Es fundamental en herramientas Drag & Drop.
- **Rollback Pattern:** Excelente medida de seguridad reestableciendo el snapshot previo en caso de un error (`!success`) por parte de Strapi. 

**Lo que podría ser mejor:**
- **Bloqueo Síncrono (isSyncing UI-lock):** Cuando se mueve una tarea, se bloquea globalmente todo el drag-and-drop mediante la prop `isDragDisabled={isSyncing}` de las demás columnas. El usuario no puede interactuar con otra columna ni mover otras tareas que no colisionan mientras se resuelve el servidor.
- **Falta de Queue / Retry Mechanism:** Si el Drag falla por conexión, en vez de obligar al usuario a devolver su tarea y frustrarse, se debería encolar una reintentabilidad silenciosa o background sync mode.

**El "Por qué" técnico:**
El objetivo central de Optimistic UI es lograr que la app siempre esté lista para el usuario. Congelar todo el Drag Context globalmente resta dinamismo. El lockeo (`isSyncing`) debería ser atómico y apuntar al recurso alterado (ej. bloquear sólo la tarea específica mediante un `optimisticId` para que no se le pueda hacer drag de nuevo mientras transita).

---

## 4. Clean Code & TypeScript
**Calificación: 8.0 / 10**

**Lo que está bien:**
- **Arquitectura de Ficheros:** Gran estructura y separación de componentes. El patrón Model/DTO/Mapper (`mapStrapiToBoard`) ayuda masivamente a blindar la UI de futuros refactors de la API en Strapi 5.
- La organización de Services evita tener el Fetch nativo de Strapi desparramado por los handlers de todos los componentes.

**Lo que podría ser mejor:**
- **Seguridad en Tipos (Type Safety):** Hay partes en los tipos donde usas el casteo peligroso implicitamente e ignoras propiedades. `DestCol.tasks?.splice` trata un elemento posiblemente indefinido bajo validación pobre.
- **Pérdida de Responsabilidad en Componentes:** `BoardColumns.tsx` está orquestando las transacciones (hace la posición de cálculo, luego maneja `if(type === 'task')`, pide al store su snapshot, decide cómo formatear la respuesta a updateColumnsOrder). Esa lógica transaccional debería ser abstraída en un **Custom Hook** (ej. `useBoardDragDrop`) o empujada al **Store/Service**. Mantiene a los componentes de UI enfocados exclusivamente a la capa de vista de React.

**El "Por qué" técnico:**
Descargar "peso" inteligente del arbol DOM optimiza el ciclo de vida de React. Los hooks de presentacion/contenedor (Render vs Logic) o controladores aislados hacen que tu código sea fácilmente testeable para Unit Testing, a diferencia de tener reglas complejas de "Snapshot + Optimistic UI + DragDrop Orchestrator" combinadas en tu componente padre de la vista.

---
### Resumen Estratégico

El código es escalable y demuestra mucha madurez técnica resolviendo la principal barrera en la arquitectura Kanban: Los movimientos de posiciones sin cuello de botella de latencia de red. La inclusión de **Immer.js para la inmutabilidad de Zustand**, un **sistema de re-balanceo de Fractional Indexing**, y el factor de **Micro-estado en vez de locks globales** llevarán este frontend al top nivel técnico.
