/* eslint-disable dot-notation */
import { read, WorkBook, utils } from 'xlsx'
import * as fs from 'fs'
import * as path from 'path'
import { Dataset, ResourceDataset } from './interface'
import { logger } from '../logger/winston'

let dataset: Dataset

/**
 * to load dataset from given file
 */
const initializeDatasets = () => {
  try {
    const b = fs.readFileSync(path.join(__dirname, '../../../resources/dataset.xlsx'))
    const wb: WorkBook = read(b)

    let resourceDataset: Array<ResourceDataset> = utils.sheet_to_json(wb.Sheets.resource)
    /** save dataset into memory to be used by other modules */

    /** convert tags to individual string components */
    resourceDataset = resourceDataset.map((row: ResourceDataset | any) => {
      const filteredData: ResourceDataset = {
        credits: row['Original Credits < OPTIONAL >'],
        description: row['Description'],
        image: row['Image < OPTIONAL >'],
        reference: row['Reference URL < OPTIONAL >'],
        timestamp: row['Timestamp'],
        title: row['Title'],
        tags: row['Tags'],
        location: row['Location / City'],
        volunteer: row['Volunteer Name'],
      }

      return filteredData
    })

    dataset = {
      resource: resourceDataset,
    }
    logger.info('dataset.load.successful')
  } catch (e) {
    logger.error('dataset.load')
    logger.error(e)
  }
}

initializeDatasets()

const fetchDataset = (): Dataset => dataset

export { initializeDatasets, fetchDataset }
