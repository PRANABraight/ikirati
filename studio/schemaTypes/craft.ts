import {defineField, defineType} from 'sanity'
import {PackageIcon} from '@sanity/icons'

export default defineType({
  name: 'craft',
  title: 'Craft',
  type: 'document',
  icon: PackageIcon,
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
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'Beginner'},
          {title: 'Intermediate', value: 'Intermediate'},
          {title: 'Advanced', value: 'Advanced'},
        ],
      },
    }),
    defineField({
      name: 'timeToLearn',
      title: 'Time to Learn',
      description: 'e.g. "3-6 months"',
      type: 'string',
    }),
  ],
})
