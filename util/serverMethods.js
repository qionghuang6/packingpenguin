const SERVER_URL = 'http://packingpenguin.vercel.app/';

const addUser = (userId) => {
    console.log(userId);
    fetch(SERVER_URL + 'api/adduser', {
        method: 'POST', 
        headers: {
            'Content-Type': 'text/html',
        },
        body: userId,
    })
}

export {
    addUser,
}