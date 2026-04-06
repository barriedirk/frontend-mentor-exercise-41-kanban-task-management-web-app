export default {
  /**
   * Antes de crear una tarea
   */
  async beforeCreate(event: any) {
    const { data } = event.params;

    // Validamos que la relación 'column' esté presente
    // En Strapi 5, el ID de la relación suele venir en data.column
    if (!data.column) {
      // Usamos un throw genérico si @strapi/utils falla,
      // Strapi lo capturará como un 400 automáticamente.
      throw new Error(
        "A task must be associated with a column. Orphan tasks are not allowed.",
      );
    }
  },

  /**
   * Antes de actualizar una tarea
   */
  async beforeUpdate(event: any) {
    const { data, where } = event.params;

    // 1. Validar si se está intentando quitar la columna (ponerla en null)
    if (Object.prototype.hasOwnProperty.call(data, "column") && !data.column) {
      throw new Error(
        "Cannot remove the column relationship. A task must always belong to a column.",
      );
    }

    // 2. Verificar integridad en la base de datos
    // Usamos strapi.db.query que es más directo para lifecycles en v5
    const existingTask = await strapi.db.query("api::task.task").findOne({
      where: { id: where.id },
      populate: ["column"],
    });

    // Validamos la existencia de la columna de forma segura para TS
    const hasColumn = existingTask && (existingTask as any).column;

    if (!hasColumn && !data.column) {
      throw new Error(
        "Integrity Error: This task is missing a column reference.",
      );
    }
  },
};
