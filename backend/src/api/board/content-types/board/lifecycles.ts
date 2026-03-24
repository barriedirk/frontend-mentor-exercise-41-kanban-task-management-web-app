export default {
  // Note: this code is only for a simple challenge, check for a better manage of concurrence
  async afterUpdate(event: any) {
    const { params } = event;
    const { data } = params;

    // 1. Solo actuamos si se enviaron cambios en las columnas
    if (!data || !data.columns) return;

    try {
      console.log(
        "🧹 [AfterUpdate] Buscando columnas huérfanas para limpiar...",
      );

      // 2. Buscamos todas las columnas donde el board sea null
      const orphanedColumns = await strapi
        .documents("api::column.column")
        .findMany({
          filters: {
            board: {
              id: { $null: true },
            },
          },
        });

      if (orphanedColumns.length > 0) {
        console.log(
          `🔥 Se encontraron ${orphanedColumns.length} huérfanas. Eliminando...`,
        );

        // 3. Borrado físico de cada una
        for (const col of orphanedColumns) {
          try {
            await strapi.documents("api::column.column").delete({
              documentId: col.documentId,
            });
            console.log(
              `✅ Columna eliminada permanentemente: ${col.documentId}`,
            );
          } catch (err) {
            console.log(
              `ℹ️ La columna ${col.documentId} ya había sido borrada.`,
            );
          }
        }
      } else {
        console.log("✨ No quedan columnas huérfanas.");
      }
    } catch (err: any) {
      console.error("❌ Error en afterUpdate:", err.message);
    }
  },

  async beforeDelete(event: any) {
    const { where } = event.params;

    // 1. Identificamos qué tenemos a mano
    let targetDocId = where.documentId;
    const numericId = where.id;

    try {
      // 2. TRADUCCIÓN: Si solo tenemos el '1', buscamos el documentId usando filtros
      if (!targetDocId && numericId) {
        console.log(`🔍 Buscando DocumentID para el ID numérico: ${numericId}`);

        const entities = await strapi.documents("api::board.board").findMany({
          filters: {
            id: numericId, // Aquí TS no se queja porque es un filtro genérico
          },
          limit: 1,
        });

        targetDocId = entities[0]?.documentId;
      }

      if (!targetDocId) {
        console.log("⚠️ [Board Delete] No se pudo determinar el DocumentID.");
        return;
      }

      console.log(
        `⚠️ [Board Delete] Limpiando columnas para DocumentID: ${targetDocId}`,
      );

      // 3. Buscamos y borramos las columnas vinculadas
      const columnsOfBoard = await strapi
        .documents("api::column.column")
        .findMany({
          filters: {
            board: {
              documentId: targetDocId,
            },
          },
        });

      if (columnsOfBoard && columnsOfBoard.length > 0) {
        console.log(
          `🔥 [Delete] Encontradas ${columnsOfBoard.length} columnas. Borrando...`,
        );

        await Promise.all(
          columnsOfBoard.map((col: any) =>
            strapi.documents("api::column.column").delete({
              documentId: col.documentId,
            }),
          ),
        );

        console.log(`✅ Limpieza completa para el board ${targetDocId}.`);
      } else {
        console.log(`ℹ️ El board ${targetDocId} no tenía columnas.`);
      }
    } catch (err: any) {
      console.error("❌ Error en beforeDelete:", err.message);
    }
  },
};
