import {addUser, getUser, updateUser, deleteUser, getUserFriend} from '../database/users.js'

export const postUser = (req, res) =>{
    try{
        addUser(req.body.id,req.body)
        return res.status(201).end('User added');
    }catch(err){
        return res.status(400).end(err.message)
    }
}

export const getUserById = (req, res) =>{
    try{
        const user = getUser(req.params.id)
        return res.send(req.format(user))
    }catch(err){
        return res.status(400).end(err.message)
    }
}  

export const putUserById = (req, res) =>{
    try{
        updateUser(req.params.id,req.body)
        return res.status(200).end(`User with id:${req.params.id} is updated`)    
    }catch(err){
        return res.status(401).end(err.message)
    }
}  

export const deleteUserById = (req, res) =>{ // Admin
    try{
        deleteUser(req.params.id)
        return res.status(200).end(`User with id:${req.params.id} is deleted`)
    }catch(err){
        return res.status(401).end(err.message)
    }
}  
         
export const postUserAccept = (req, res) =>{
    //????//
    return res.status(418).end('Not implemented')
}

export const getUserFriends = (req, res) =>{
    //????//
    // try{
    //     const user = getUserFriend(req.params.id)
    //     return res.json(user)
    // }catch(err){
    //     return res.status(400).end(err.message)
    // }
}

export const getUserInvitations = (req, res) =>{
    //????//
    return res.status(418).end('Not implemented')
}

export const postUserInvite = (req, res) =>{
    //????//
    return res.status(418).end('Not implemented')
} 

export const postUserLogin = (req, res) =>{
    //????//
    return res.status(418).end('Not implemented')
} 

export const getUserStart = (req, res) =>{
    //????//
    return res.status(418).end('Not implemented')
}

export const getUserSummaries = (req, res) =>{
    return res.status(418).end('Not implemented')
}   