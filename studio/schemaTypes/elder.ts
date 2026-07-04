import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export default defineType({
  name: 'elder',
  title: 'Elder',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'age',
      title: 'Age',
      type: 'number',
    }),
    defineField({
      name: 'specialty',
      title: 'Specialty',
      description: 'Area of traditional knowledge, e.g. Mundhum recitation, weaving',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Portrait',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'audio',
      title: 'Interview Audio',
      type: 'file',
      options: {accept: 'audio/*'},
    }),
  ],
})
