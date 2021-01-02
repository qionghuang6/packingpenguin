const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const generateId = (length) => {
    const idFunc = () => {
        const alphanum = 'abcdefghijkmnopqrstuvwxyz0123456789'
        let generated = ''
        for (let i = 0; i < length; i++) {
            generated += alphanum[Math.floor(Math.random() * alphanum.length)];
        }
        return generated
    }
    return idFunc;
}

const generateUniqueId = generateId(8);
const generateListId = generateId(6);

// push set to true means add item, push set to false means delete item
const changeItemExistence = async (path, push) => {
    const defaultItem = {
        name: "New Item",
        id: path[2],
        isPurchased: false,
        isPacked: false,
        quantity: 1,
    }
    const item = push ? defaultItem: null;
    const res = await fetch(SERVER_URL + 'api/addRemoveItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({push, item, path}),
    })
    if (!res.ok) {
        console.log("HTTP-Error: " + res.status);
    }
    return item;
}

export {
    generateUniqueId,
    generateListId,
    changeItemExistence,
}