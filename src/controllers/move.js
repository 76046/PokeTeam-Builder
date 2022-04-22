import {addMove, getMove, updateMove, deleteMove} from '../database/move.js'

export const postMove = (req, res) =>{ // Admin
    try{
        addMove(req.body.id,req.body)
        return res.status(201).end('Move added');
    }catch(err){
        return res.status(400).end(err.message)
    }
}  

export const getMoveById = (req, res) =>{
    try{
        const move = getMove(req.params.id)
        return res.send(req.format(move))
    }catch(err){
        return res.status(400).end(err.message)
    }
}

export const putMoveById = (req, res) =>{ // Admin
    try{
        updateMove(req.params.id,req.body)
        return res.status(200).end(`Move with id:${req.params.id} is updated`)    
    }catch(err){
        return res.status(401).end(err.message)
    }
} 

export const deleteMoveById = (req, res) =>{ // Admin
    try{
        deleteMove(req.params.id)
        return res.status(200).end(`Move with id:${req.params.id} is deleted`)
    }catch(err){
        return res.status(401).end(err.message)
    }
}   

export const getMoves = (req, res) =>{
    return res.status(418).end('Not implemented')    
}