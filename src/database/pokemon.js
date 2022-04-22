const pokemons = {
    p432:{  id:'p432', name:'P1', 
            type:'type12', min_lvl:'3', 
            basic_stats:[1,2,3], move:['1','2','3'] },
    p567:{  id:'p567', name:'P2', 
            type:'type13', min_lvl:'1', 
            basic_stats:[1,2,3], move:['1','2','3'] },
    p456:{  id:'p456', name:'P3', 
            type:'type14', min_lvl:'2', 
            basic_stats:[1,2,3], move:['1','2','3'] }
}

export const addPokemon = (id,data) => {
    const { name=null,type=null,min_lvl=null,basic_stats=[],move=[] } = data
    if(!name || !type || !min_lvl || !basic_stats || !move || !id){
        throw new Error('Missing data')
    }

    const pokemon = pokemons[id]

    if(pokemon){
        throw new Error('Pokemon exists') 
    }

    pokemons[id] = {name,type,min_lvl,basic_stats,move}
} 

export const getPokemon = id => {
    if(!pokemons[id])
    {
        throw new Error('Pokemon doesn\'t exists')
    }
    
    return pokemons[id]
}

export const updatePokemon = (id,data) => {
    
    const pokemon = pokemons[id]
    
    if(!pokemon){
        throw new Error('Pokemon doesn\u0027t exists')
    }

    pokemon.name = data?.name ?? pokemon.name;
    pokemon.type = data?.type ?? pokemon.type;
    pokemon.min_lvl = data?.min_lvl ?? pokemon.min_lvl;
    pokemon.basic_stats = data?.basic_stats ?? pokemon.basic_stats;
    pokemon.move = data?.move ?? pokemon.move;
    
    pokemons[id] = pokemon;
    
}

export const deletePokemon = id => {
    const pokemon = pokemons[id]
    
    if(!pokemon){
        throw new Error('Pokemon doesn\'t exists')
    }

    delete pokemons[id]   
}