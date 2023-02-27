import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurent',
  title: 'Restaurent',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Restaurent name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short Description',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image of the restaurent',
    },
    {
      name: 'long',
      type: 'number',
      title: 'Latitude of the restaurent',
    },
    {
      name: 'lat',
      type: 'number',
      title: 'Longitude of the restaurent',
    },
    {
      name: 'address',
      type: 'string',
      title: 'Restaurent address',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Enter a rating from (1-5 start)',
      validation: (Rule) =>
        Rule.required().min(1).max(5).error('Please enter a value between 1 and 5'),
    },
    {
      name: 'type',
      title: 'Category',
      validation: (Rule) => Rule.required(),
      type: 'reference',
      to: [{type: 'category'}],
    },
    {
      name: 'dishes',
      title: 'Dishes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'dish'}]}],
    },
  ],
})
