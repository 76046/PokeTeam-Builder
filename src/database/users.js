const users = {
    u432:{ id:'u432', username:'U1', password:'xyz123^X@', email:'email@test.pl',friends:['u456'], teams:['t432'] },
    u567:{ id:'u567', username:'U2', password:'xyz123^X@', email:'email@test.pl', friends:['u456'], teams:['t567'] },
    u456:{ id:'u456', username:'U3', password:'xyz123^X@', email:'email@test.pl', friends:['u432','u567'], teams:['t456'] }
}

export const addUser = (id,data) =>{
    const { username=null, password=null,email=null,friends=[],teams=[] } = data
    if(!username || !password || !email || !id ){
        throw new Error('Missing data')
    }

    const user = users[id]

    if(user){
        throw new Error('User exists') 
    }

    users[id] = {id,username,password,email,friends,teams}
}

export const getUser = id => {
    if(!users[id])
    {
        throw new Error('User doesn\u0027t exists')
    }
    
    return users[id]
}

export const updateUser = (id,data) => {
    
    const user = users[id]
    
    if(!user){
        throw new Error('User doesn\u0027t exists')
    }

    user.username = data?.username ?? user.username;
    user.password = data?.password ?? user.password;
    user.email = data?.email ?? user.email;
    user.friends = data?.friends ?? user.friends;
    user.teams = data?.teams ?? user.teams;
    
    users[id] = user;
    
}

export const deleteUser = id => {
    const user = users[id]
    
    if(!user){
        throw new Error('User doesn\u0027t exists')
    }

    delete users[id]  
}

export const getUserFriend = id => {
    if(!users[id])
    {
        throw new Error('User doesn\u0027t exists')
    }
    
    return users[id].friends
}

