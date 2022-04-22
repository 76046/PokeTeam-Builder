import { Router } from 'express'
import * as controller from '../controllers/user.js'
import auth from '../middleware/auth.js'

const router = Router()

// # == User

router.post('/', controller.postUser)
router.get('/:id', controller.getUserById)
router.put('/:id', controller.putUserById)
router.delete('/:id', auth, controller.deleteUserById) // Admin
router.post('/accept', controller.postUserAccept)
router.get('/friends', controller.getUserFriends)
router.get('/invitations', controller.getUserInvitations)
router.post('/invite', controller.postUserInvite)
router.post('/login', controller.postUserLogin)
router.get('/start', controller.getUserStart)
router.get('/summaries', controller.getUserSummaries)

export default router




