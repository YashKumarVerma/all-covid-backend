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
    const resourceDataset: Array<ResourceDataset> = utils.sheet_to_json(wb.Sheets.resource)

    /** save dataset into memory to be used by other modules */
    dataset = {
      oxygen: oxygenDataset,
      resource: resourceDataset,
    }
    logger.info('dataset.load')
  } catch (e) {
    logger.error('dataset.load')
  }
}

const fetchDataset = (): Dataset => dataset

export { initializeDatasets, fetchDataset }
