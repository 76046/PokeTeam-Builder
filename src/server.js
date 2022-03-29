import express from 'express'
const app = express()
const port = 3000

import invitationRoutes from './routes/invitation.js'
import moveRoutes from './routes/move.js'
import pokemonRoutes from './routes/pokemon.js'
import summaryRoutes from './routes/summary.js'
import teamRoutes from './routes/team.js'
import userRoutes from './routes/user.js'

app.use('/invitation', invitationRoutes)
app.use('/move', moveRoutes)
app.use('/pokemon', pokemonRoutes)
app.use('/summary', summaryRoutes)
app.use('/team', teamRoutes)
app.use('/user', userRoutes)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})