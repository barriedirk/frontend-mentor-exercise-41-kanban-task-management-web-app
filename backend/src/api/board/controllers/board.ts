import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::board.board",
  ({ strapi }) => ({
    async find(ctx) {
      const { user } = ctx.state;

      if (!ctx.state.user) return ctx.unauthorized();

      ctx.query = ctx.query || {};

      const existingFilters = (ctx.query.filters as Record<string, any>) || {};

      ctx.query.filters = {
        ...existingFilters,
        users_permissions_user: user.id,
      };

      const { data, meta } = await super.find(ctx);

      return { data, meta };
    },
    async create(ctx) {
      const { user } = ctx.state;

      if (!user) return ctx.unauthorized("You must be logged in");

      ctx.request.body.data = {
        ...ctx.request.body.data,
        users_permissions_user: user.id,
      };

      const response = await super.create(ctx);

      return response;
    },
  }),
);
