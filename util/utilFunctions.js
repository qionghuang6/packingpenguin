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
const generateListId = generateId(9);

// push set to true means add item, push set to false means delete item
const changeItemExistence = async (path, push) => {
    const defaultItem = {
        name: "",
        id: path[2],
        isPurchased: false,
        isPacked: false,
        quantity: 1,
    }
    const item = push ? defaultItem : null;
    const res = await fetch(SERVER_URL + 'api/addRemoveItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ push, item, path }),
    })
    if (!res.ok) {
        console.log("HTTP-Error: " + res.status);
    }
    return item;
}

const addIndexedItem =  async (path, index) => {
    const item = {
        name: "",
        id: path[2],
        isPurchased: false,
        isPacked: false,
        quantity: 1,
    }
    const res = await fetch(SERVER_URL + 'api/addIndexedItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({index, item, path}),
    })
    if (!res.ok) {
        console.log("HTTP-Error: " + res.status);
    }
    return item;
}

const changeCategoryExistence = async (path, push) => {
    const defaultCategory = {
        name: "New Category",
        id: path[1],
        color: getPastelColor(),
        items: [],
    }
    const category = push ? defaultCategory : null;
    const res = await fetch(SERVER_URL + 'api/addRemoveCategory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ push, category, path }),
    })
    if (!res.ok) {
        console.log("HTTP-Error: " + res.status);
    }
    return defaultCategory;
}

const clearChecklist = async (checklistId) => {
    const res = await fetch(SERVER_URL + 'api/clearChecklist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checklistId }),
    })
    if (!res.ok) {
        console.log("HTTP-Error: " + res.status);
    }
    return;
}

const PASTELS = ["#FFB5E8", "#B28DFF", "#DCD3FF", "#AFF8DB", "#BFFCC6",
    "#FFC9DE", "#FF9CEE", "#C5A3FF", "#A79AFF", "#C4FAF8", "#DBFFD6",
    "#FFCCF9", "#B5B9FF", "#85E3FF", "#F3FFE3", "#FFBEBC", "#FCC2FF",
    "#ECD4FF", "#97A2FF", "#ACE7FF", "#E7FFAC", "#FFCBC1", "#F6A6FF",
    "#FBE4FF", "#AFCBFF", "#6EB5FF", "#FFFFD1", "#FFF5BA"];

const getPastelColor = () => {
    return PASTELS[Math.floor(Math.random() * PASTELS.length)]
}

const initMiddleware = (middleware) => {
    // Function from Next.js examples
    // https://github.com/vercel/next.js/blob/canary/examples/api-routes-cors/lib/init-middleware.js
    return (req, res) =>
        new Promise((resolve, reject) => {
            middleware(req, res, (result) => {
                if (result instanceof Error) {
                    return reject(result)
                }
                return resolve(result)
            })
        })
}

const getChecklistName = async (checklistId) => {
    console.log('YEEE HAW')
    console.log(checklistId)
    const res = await fetch(SERVER_URL + 'api/getChecklist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({checklistId, isFromSlug: true}),
    })
    const ret = await res.json();
    console.log(ret);
    return ret.name;
}

const setPrimaryChecklist = (checklistId) => {
    const localLists = JSON.parse(localStorage.getItem('checklistId'));
    const index = localLists.indexOf(checklistId);
    if (index > -1) {
        localLists.splice(index, 1);
    }
    localLists.unshift(checklistId);
    localStorage.setItem('checklistId', JSON.stringify(localLists));
}

const addNewChecklist = async () => {
    const newChecklistId = generateListId();
    const res = await fetch(SERVER_URL + 'api/getChecklist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({checklistId: newChecklistId, isFromSlug: false}),
    })
    if(!res.ok){
        console.log("Error making new checklist")
    }
    let json = await res.json();
    let checklistIds = JSON.parse(localStorage.getItem('checklistId'))
    checklistIds = checklistIds.concat(newChecklistId)
    localStorage.setItem('checklistId', JSON.stringify(checklistIds));
    return({id: newChecklistId, name: json.name});
}

export {
    generateUniqueId,
    generateListId,
    changeItemExistence,
    changeCategoryExistence,
    getPastelColor,
    initMiddleware,
    addIndexedItem,
    clearChecklist,
    getChecklistName,
    setPrimaryChecklist,
    addNewChecklist,
}