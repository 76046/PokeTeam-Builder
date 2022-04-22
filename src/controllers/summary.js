import {addSummary, getSummary, updateSummary, deleteSummary} from '../database/summary.js'


export const postSummary = (req, res) =>{
    try{
        addSummary(req.body.id,req.body)
        return res.status(201).end('Summary added');
    }catch(err){
        return res.status(400).end(err.message)
    }
}

export const getSummaryById = (req, res) =>{
    try{
        const summary = getSummary(req.params.id)
        return res.send(req.format(summary))
    }catch(err){
        return res.status(400).end(err.message)
    }
}

export const putSummaryById = (req, res) =>{
    try{
        updateSummary(req.params.id,req.body)
        return res.status(200).end(`Summary with id:${req.params.id} is updated`)    
    }catch(err){
        return res.status(401).end(err.message)
    }
}

export const deleteSummaryById = (req, res) =>{
    try{
        deleteSummary(req.params.id)
        return res.status(200).end(`Summary with id:${req.params.id} is deleted`)
    }catch(err){
        return res.status(401).end(err.message)
    }
}

export const getSummaries = (req, res) =>{
    return res.status(418).end('Not implemented')
}