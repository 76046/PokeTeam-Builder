import {addPokemon, getPokemon, updatePokemon, deletePokemon} from '../database/pokemon.js'

export const postPokemon = (req, res) =>{
    try{
        addPokemon(req.body.id,req.body)
        return res.status(201).end('Pokemon added');
    }catch(err){
        return res.status(406).end(err.message)
    }
}

export const getPokemonById = (req, res) =>{ // Admin
    try{
        const pokemon = getPokemon(req.params.id)
        //res.setHeader('Content-Type','text/html')
        //return res.status(200).end('<h1>Hello World</h1>')
        return res.send(req.format(pokemon))
    }catch(err){
        return res.status(406).end(err.message)
    }
}

export const putPokemonById = (req, res) =>{ // Admin
    try{
        updatePokemon(req.params.id,req.body)
        return res.status(200).end(`Pokemon with id:${req.params.id} is updated`)    
    }catch(err){
        return res.status(406).end(err.message)
    }
}
             
export const deletePokemonById = (req, res) =>{ // Admin
    try{
        deletePokemon(req.params.id)
        return res.status(200).end(`Pokemon with id:${req.params.id} is deleted`)
    }catch(err){
        return res.status(406).end(err.message)
    }
}
     
export const getPokemons = (req, res) =>{
    return res.status(418).end('Not implemented')
}
