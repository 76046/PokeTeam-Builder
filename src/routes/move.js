import { Router } from 'express'
import * as controller from '../controllers/move.js'
import auth from '../middleware/auth.js'

const router = Router()

// # == Move

router.post('/', auth, controller.postMove) // Admin
router.get('/:id', controller.getMoveById)
router.put('/:id', auth, controller.patchMoveById) // Admin
router.delete('/:id', auth, controller.deleteMoveById) // Admin
router.get('/moves', controller.getMoves)

export default router