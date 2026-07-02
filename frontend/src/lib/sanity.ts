import {createClient} from '@sanity/client'
import imageUrlBuilder, {type SanityImageSource} from '@sanity/image-url'
import {getFile, type SanityFileSource} from '@sanity/asset-utils'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export function urlForFile(source: SanityFileSource) {
  return getFile(source, {projectId, dataset}).asset.url
}
