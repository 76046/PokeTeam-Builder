const summarys = {
    s432:{ id:'s432', name:'S1', team:'t432', alternatives:['1','2','3'], date:'date1', facts:['1','2','3'], decisions:['1','2','3'] },
    s567:{ id:'s567', name:'S2', team:'t567', alternatives:['1','2','3'], date:'date2', facts:['1','2','3'], decisions:['1','2','3'] },
    s456:{ id:'s456', name:'S3', team:'t456', alternatives:['1','2','3'], date:'date3', facts:['1','2','3'], decisions:['1','2','3'] }
}

export const addSummary = (id,data) => {
    const { name=null, team=null, alternatives=[],date=null,facts=[],decisions=[] } = data
    if(!name || !team || !alternatives || !date || !id){
        throw new Error('Missing data')
    }

    const summary = summarys[id]

    if(summary){
        throw new Error('Summary exists') 
    }

    summarys[id] = {name,team,alternatives,date,facts,decisions}
} 

export const getSummary = id => {
    if(!summarys[id])
    {
        throw new Error('Summary doesn\u0027t exists')
    }
    
    return summarys[id]
}

export const updateSummary = (id,data) => {
    
    const summary = summarys[id]
    
    if(!summary){
        throw new Error('Summary doesn\u0027t exists')
    }
    
    summary.name = data?.name ?? summary.name;
    summary.team = data?.team ?? summary.team;
    summary.alternatives = data?.alternatives ?? summary.alternatives;
    summary.date = data?.date ?? summary.date;
    summary.facts = data?.facts ?? summary.facts;
    summary.decisions = data?.decisions ?? summary.decisions;
    
    summarys[id] = summary;
    
}

export const deleteSummary = id => {
    const summary = summarys[id]
    
    if(!summary){
        throw new Error('Summary doesn\u0027t exists')
    }

    delete summarys[id]
    
}