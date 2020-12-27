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

export {
    generateUniqueId,
    generateListId
}