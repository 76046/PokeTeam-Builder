const moves = {
    m432:{ id:'m432', name:'T1', type:'type1' },
    m567:{ id:'m567', name:'T2', type:'type2' },
    m456:{ id:'m456', name:'T3', type:'type3' }
}

export const addMove = (id,data) => {
    const { name=null,type=null } = data
    if(!name || !type || !id){
        throw new Error('Missing data')
    }

    const move = moves[id]

    if(move){
        throw new Error('Move exists') 
    }

    moves[id] = {name,type}
} 

export const getMove = id => {
    if(!moves[id])
    {
        throw new Error('Move doesn\u0027t exists')
    }
    
    return moves[id]
}

export const updateMove = (id,data) => {
    
    const move = moves[id]
    
    if(!move){
        throw new Error('Move doesn\u0027t exists')
    }

    move.name = data?.name ?? move.name;
    move.type = data?.type ?? move.type;

    moves[id] = move;
}

export const deleteMove = id => {
    const move = moves[id]
    
    if(!move){
        throw new Error('Move doesn\u0027t exists')
    }

    delete moves[id]
    
}