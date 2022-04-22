import {addTeam, getTeam,updateTeam,deleteTeam} from '../database/teams.js'

export const postTeam = (req, res) =>{
    try{
        addTeam(req.body.id,req.body)
        return res.status(201).end('Team added');
    }catch(err){
        return res.status(400).end(err.message)
    }

    //return res.status(418).end('Not implemented')
}

export const getTeamById = (req, res) =>{
    
    try{
        const team = getTeam(req.params.id)
        return res.send(req.format(team))
    }catch(err){
        return res.status(400).end(err.message)
    }
    
    // const team = getTeam(req.params.id)

    // if(!team)
    //     return res.status(404).end(`Team with id:${req.params.id} not found`)
    
    // return res.json(team)
    
    //return res.status(418).end('Not implemented')
}

export const putTeamById = (req, res) =>{

    try{
        updateTeam(req.params.id,req.body)
        return res.status(200).end(`Team with id:${req.params.id} is updated`)    
    }catch(err){
        return res.status(401).end(err.message)
    }
    //return res.status(418).end('Not implemented')
}

export const deleteTeamById = (req, res) =>{

    try{
        deleteTeam(req.params.id)
        return res.status(200).end(`Team with id:${req.params.id} is deleted`)
    }catch(err){
        return res.status(401).end(err.message)
    } 
}

export const postTeams = (req, res) =>{  
    return res.status(418).end('Not implemented') 
}
