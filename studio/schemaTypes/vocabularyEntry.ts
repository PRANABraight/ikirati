import {defineField, defineType} from 'sanity'
import {TranslateIcon} from '@sanity/icons'

export default defineType({
  name: 'vocabularyEntry',
  title: 'Vocabulary Entry',
  type: 'document',
  icon: TranslateIcon,
  fields: [
    defineField({
      name: 'word',
      title: 'Word',
      description: 'The word in the Kirati language',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'Limbu', value: 'limbu'},
          {title: 'Rai (Bantawa)', value: 'rai-bantawa'},
          {title: 'Rai (Chamling)', value: 'rai-chamling'},
          {title: 'Rai (Kulung)', value: 'rai-kulung'},
          {title: 'Yakkha', value: 'yakkha'},
          {title: 'Sunuwar', value: 'sunuwar'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'translation',
      title: 'English Translation',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pronunciation',
      title: 'Pronunciation',
      description: 'Phonetic guide, e.g. "yaa-koo"',
      type: 'string',
    }),
    defineField({
      name: 'example',
      title: 'Example Phrase',
      type: 'string',
    }),
    defineField({
      name: 'audio',
      title: 'Pronunciation Audio',
      type: 'file',
      options: {accept: 'audio/*'},
    }),
  ],
})
