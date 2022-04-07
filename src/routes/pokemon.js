import { Router } from 'express'
import * as controller from '../controllers/pokemon.js'
import auth from '../middleware/auth.js'

const router = Router()

// # == Pokemon

router.post('/', controller.postPokemon)
router.get('/:id', auth, controller.getPokemonById) // Admin
router.put('/:id', auth, controller.patchPokemonById) // Admin
router.delete('/:id', auth, controller.deletePokemonById) // Admin
router.post('/pokemons', controller.getPokemons)

export default router