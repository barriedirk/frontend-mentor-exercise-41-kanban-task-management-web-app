export default {
  async beforeUpdate(event: any) {
    const { data, where } = event.params;
    const docId = where.documentId || where.id;

    console.log(`🕵️ [Column Lifecycle] Update en columna: ${docId}`);
    console.log(
      `Value de 'board' recibido:`,
      JSON.stringify(data.board, null, 2),
    );

    // Strapi 5 puede mandar null, { disconnect: [...] } o simplemente omitirlo
    const isDisconnecting =
      data.board === null ||
      (data.board?.disconnect && data.board.disconnect.length > 0);

    if (isDisconnecting) {
      console.log(`🚨 ALERTA: Columna ${docId} detectó desvinculación.`);

      // Usamos un pequeño delay para asegurar que la transacción del Board no bloquee el delete
      setTimeout(async () => {
        try {
          console.log(
            `🪓 Ejecutando borrado forzado de la columna huérfana: ${docId}`,
          );
          await strapi
            .documents("api::column.column")
            .delete({ documentId: docId });
          console.log(`✅ Columna ${docId} eliminada del mapa.`);
        } catch (e: any) {
          console.log(
            `ℹ️ Nota: La columna ${docId} ya no existe o no se pudo borrar:`,
            e.message,
          );
        }
      }, 500);
    }
  },
};
