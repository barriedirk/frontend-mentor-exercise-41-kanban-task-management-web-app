export default {
  async afterUpdate(event: any) {
    const { params } = event;
    const { data } = params;

    // Solo si se intentó modificar la relación con tareas
    if (!data || !data.tasks) return;

    try {
      console.log("🧹 [Column Lifecycle] Limpiando tareas huérfanas...");

      // Buscamos tareas que perdieron su relación con la columna
      const orphanedTasks = await strapi.documents("api::task.task").findMany({
        filters: {
          column: { id: { $null: true } },
        },
      });

      if (orphanedTasks.length > 0) {
        console.log(`🔥 Borrando ${orphanedTasks.length} tareas huérfanas.`);
        for (const task of orphanedTasks) {
          await strapi.documents("api::task.task").delete({
            documentId: task.documentId,
          });
        }
      }
    } catch (err: any) {
      console.error("❌ Error limpiando tareas:", err.message);
    }
  },

  // Importante: Si borras la columna directamente, borra sus tareas
  async beforeDelete(event: any) {
    const { where } = event.params;
    const colDocId = where.documentId || where.id;

    if (!colDocId) return;

    try {
      const tasksOfCol = await strapi.documents("api::task.task").findMany({
        filters: { column: { documentId: colDocId } },
      });

      if (tasksOfCol.length > 0) {
        await Promise.all(
          tasksOfCol.map((task: any) =>
            strapi
              .documents("api::task.task")
              .delete({ documentId: task.documentId }),
          ),
        );
        console.log(`✅ Tareas de la columna ${colDocId} eliminadas.`);
      }
    } catch (err: any) {
      console.error("❌ Error en beforeDelete de Column:", err.message);
    }
  },
};
