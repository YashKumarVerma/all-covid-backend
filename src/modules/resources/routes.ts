import express, { Request, Response } from 'express'
import { fetchDataset } from '../../services/excel/reader'
import { SuccessToResponseMapper } from '../../services/util/response.transformer'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  const data = SuccessToResponseMapper(fetchDataset().resource)
  return res.json(data)
})

export default router
