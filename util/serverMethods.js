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

const getChecklist = async (checklistId) => {
    const res = await fetch(SERVER_URL + 'api/getChecklist', {
        method: 'POST', 
        headers: {
            'Content-Type': 'text/html',
        },
        body: checklistId,
    })
    if (res.ok) { 
        let json = await res.json();
        return json
      } else {
        console.log("HTTP-Error: " + res.status);
    }
}

export {
    addUser,
    getChecklist,
}