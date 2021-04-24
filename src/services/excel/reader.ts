import { read, WorkBook, utils } from 'xlsx'
import * as fs from 'fs'
import * as path from 'path'
import { Dataset, OxygenDataset, ResourceDataset } from './interface'
import { logger } from '../logger/winston'

let dataset: Dataset

/**
 * to load dataset from given file
 */
const initializeDatasets = () => {
  try {
    const b = fs.readFileSync(path.join(__dirname, '../../../resources/dataset.xlsx'))
    const wb: WorkBook = read(b)

    const oxygenDataset: Array<OxygenDataset> = utils.sheet_to_json(wb.Sheets.oxygen)
    let resourceDataset: Array<ResourceDataset> = utils.sheet_to_json(wb.Sheets.resource)
    /** save dataset into memory to be used by other modules */

    /** convert tags to individual string components */
    resourceDataset = resourceDataset.map((row: ResourceDataset | any) => {
      const filteredData: ResourceDataset = {
        credits: row.credit,
        description: row.description,
        image: row.image,
        reference: row.reference,
        timestamp: row.timestamp,
        title: row.title,
        tags: row.tags.split(',').map((x: string) => x.trim()),
      }

      return filteredData
    })

    dataset = {
      oxygen: oxygenDataset,
      resource: resourceDataset,
    }
    logger.info('dataset.load.successful')
  } catch (e) {
    logger.error('dataset.load')
  }
}

initializeDatasets()

const fetchDataset = (): Dataset => dataset

export { initializeDatasets, fetchDataset }
