import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export default defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Sacred Places', value: 'sacred-places'},
          {title: 'Traditional Crafts', value: 'traditional-crafts'},
          {title: 'Community Events', value: 'community-events'},
          {title: 'Historical Photos', value: 'historical-photos'},
          {title: 'Landscape', value: 'landscape'},
        ],
      },
    }),
  ],
})
