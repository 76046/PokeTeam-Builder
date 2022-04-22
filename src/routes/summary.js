import { Router } from 'express'
import * as controller from '../controllers/summary.js'

const router = Router()

// # == Summary

router.post('/', controller.postSummary)
router.get('/:id', controller.getSummaryById)
router.put('/:id', controller.putSummaryById)
router.delete('/:id', controller.deleteSummaryById)
router.get('/summaries', controller.getSummaries)

export default router