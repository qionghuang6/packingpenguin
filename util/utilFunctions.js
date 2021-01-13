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

const changeCategoryExistence = async (path, push) => {
    const defaultCategory = {
        name: "New Category",
        id: path[1],
        color: getPastelColor(),
        items: [],
    }
    const category = push ? defaultCategory: null;
    const res = await fetch(SERVER_URL + 'api/addRemoveCategory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({push, category, path}),
    })
    if (!res.ok) {
        console.log("HTTP-Error: " + res.status);
    }
    return defaultCategory;
}

const PASTELS = ['#CCD4BF', '#E7CBA9', '#EEBAB2', '#A1CDCE', '#FFCCF9', 
                '#e8d6cf', '#F6ecf5', '#f6f6EB', '#C7CEEA', '#C4FAF8'];

const getPastelColor = () => {
    return PASTELS[Math.floor(Math.random()*PASTELS.length)]
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

export {
    generateUniqueId,
    generateListId,
    changeItemExistence,
    changeCategoryExistence,
    getPastelColor,
    initMiddleware,
}