/** breakdown of any date into user friendly format */
// interface LastModified {
//   day: number
//   month: number
//   year: number
// }

/**
 * interface for Oxygen Dataset
 */
// export interface OxygenDataset {
//   timestamp: number
//   name: string
//   city: string
//   contact: string
//   address: string
//   verified: LastModified
// }

/**
 * interface for resource dataset
 */
export interface ResourceDataset {
  timestamp: number
  title: string
  description: string
  tags: Array<string>
  image: string
  reference: string
  credits: string
  location: string
  volunteer: string
}

export interface Dataset {
  resource: Array<ResourceDataset>
  tags: Array<string>
}
