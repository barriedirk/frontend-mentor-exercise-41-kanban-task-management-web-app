import type { Schema, Struct } from '@strapi/strapi';

export interface LayoutColumn extends Struct.ComponentSchema {
  collectionName: 'components_layout_columns';
  info: {
    displayName: 'Column';
  };
  attributes: {
    name: Schema.Attribute.String;
    position: Schema.Attribute.Integer;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'layout.column': LayoutColumn;
    }
  }
}
