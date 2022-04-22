import { Router } from 'express'
import * as controller from '../controllers/team.js'

const router = Router()

// # == Team

router.post('/', controller.postTeam)
router.get('/:id', controller.getTeamById)
router.put('/:id', controller.putTeamById)
router.delete('/:id', controller.deleteTeamById)
router.post('/teams', controller.postTeams)

export default router