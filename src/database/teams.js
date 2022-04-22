const teams = {
    t432:{ id:'t432', name:'C1', pokemons:[1,3,4] },
    t567:{ id:'t567', name:'C2', pokemons:[2,5,6] },
    t456:{ id:'t456', name:'C3', pokemons:[9,7,8] }
}

export const addTeam = (id,data) => {
    const { name=null, pokemons=null } = data
    if(!name || !pokemons || !id){
        throw new Error('Missing data')
    }

    const team = teams[id]

    if(team){
        throw new Error('Team exists') 
    }

    teams[id] = {id,name,pokemons}
} 

export const getTeam = id => {
    if(!teams[id])
    {
        throw new Error('Team doesn\'t exists')
    }
    
    return teams[id]
}

export const updateTeam = (id,data) => {
    
    const team = teams[id]
    
    if(!team){
        throw new Error('Team doesn\u0027t exists')
    }
    
    // const { name=null, pokemons=null } = data
    // if(!name || !pokemons){
    //     throw new Error('Missing data')
    // } 
    //????????????????????????????
    
    team.name = data?.name ?? team.name;
    team.pokemons = data?.pokemons ?? team.pokemons;
    
    teams[id] = team;
    
    
}

export const deleteTeam = id => {
    const team = teams[id]
    
    if(!team){
        throw new Error('Team doesn\u0027t exists')
    }

    delete teams[id]
    
}

