import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId: 'v93gtixd',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-01-13',
  token: 'sknbwyxl7mqWCJCqWBo6aGdgrRzbtBoVBYxPCrBKW136UUMtriPEXAl46KJaw0cyV638WexvDgBhm1W2tC64UybOhxsCUfHzb3nreNLWM8yijM1Gpn3fZPr8V6wZ2qglg6JLqwfWZdB3nzBthCOwdHgbf1yQjkco516R6puBLGdGcbmOoCzA',
})






// import { createClient } from 'next-sanity'

// import { apiVersion, dataset, projectId } from '../env'

// export const client = createClient({
//   projectId,
//   dataset,
//   apiVersion,
//   useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
//   token:'sknbwyxl7mqWCJCqWBo6aGdgrRzbtBoVBYxPCrBKW136UUMtriPEXAl46KJaw0cyV638WexvDgBhm1W2tC64UybOhxsCUfHzb3nreNLWM8yijM1Gpn3fZPr8V6wZ2qglg6JLqwfWZdB3nzBthCOwdHgbf1yQjkco516R6puBLGdGcbmOoCzA'
// })