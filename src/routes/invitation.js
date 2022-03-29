import { Router } from 'express'
import * as controller from '../controllers/invitation.js'

const router = Router()

// # == Invitation

router.post('/', controller.postInvitation)
router.delete('/:id', controller.deleteInvitationById)
router.get('/invitations', controller.getInvitationsById)

export default router