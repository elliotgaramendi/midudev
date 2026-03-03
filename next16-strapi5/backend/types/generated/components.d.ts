import type { Schema, Struct } from '@strapi/strapi';

export interface ModulesHero extends Struct.ComponentSchema {
  collectionName: 'components_modules_heroes';
  info: {
    displayName: 'Hero';
    icon: 'grid';
  };
  attributes: {
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    subheading: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'modules.hero': ModulesHero;
    }
  }
}
