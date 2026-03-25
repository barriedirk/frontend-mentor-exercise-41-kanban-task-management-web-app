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

export interface LayoutSubTask extends Struct.ComponentSchema {
  collectionName: 'components_layout_sub_tasks';
  info: {
    displayName: 'SubTask';
    icon: 'alien';
  };
  attributes: {
    completed: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 40;
        minLength: 1;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'layout.column': LayoutColumn;
      'layout.sub-task': LayoutSubTask;
    }
  }
}
