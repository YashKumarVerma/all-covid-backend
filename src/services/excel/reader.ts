/* eslint-disable dot-notation */
import { read, WorkBook, utils } from 'xlsx'
import * as fs from 'fs'
import * as path from 'path'
import { Dataset, ResourceDataset } from './interface'
import { logger } from '../logger/winston'

let dataset: Dataset

/** to calculate unique tag heads */
const computeUniqueTagNames = (resourceDataset: Array<ResourceDataset>): Array<string> => {
  const uniqueTags: Array<string> = []
  resourceDataset.forEach((resource: ResourceDataset) => {
    resource.tags.forEach((tag: string) => {
      if (uniqueTags.includes(tag) === false) {
        uniqueTags.push(tag)
      }
    })
  })
  return uniqueTags
}

/**
 * to load dataset from given file
 */
const initializeDatasets = () => {
  try {
    const b = fs.readFileSync(path.join(__dirname, '../../../resources/dataset.xlsx'))
    const wb: WorkBook = read(b)

    let resourceDataset: Array<ResourceDataset> = utils.sheet_to_json(wb.Sheets.resource, {
      raw: false,
    })
    /** save dataset into memory to be used by other modules */

    /** convert tags to individual string components */
    resourceDataset = resourceDataset.map((row: ResourceDataset | any) => {
      const filteredData: ResourceDataset = {
        credits: row['Original Credits < OPTIONAL >'],
        description: row['Description'],
        image: row['Image < OPTIONAL >'],
        reference: row['Reference URL < OPTIONAL >'],
        timestamp: Date.parse(row['Timestamp']),
        title: row['Title'],
        tags: row['Tags'].split(',').map((x: string) => x.trim()),
        location: row['Location / City'],
        volunteer: row['Volunteer Name'],
      }
      return filteredData
    })

    logger.info('dataset.load.successful')
    const uniqueTags = computeUniqueTagNames(resourceDataset)

    /** populate export data */
    dataset = {
      resource: resourceDataset,
      tags: uniqueTags,
    }
  } catch (e) {
    logger.error('dataset.load')
    logger.error(e)
  }
}

const fetchDataset = (): Dataset => dataset

export { initializeDatasets, fetchDataset }
