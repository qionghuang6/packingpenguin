import { useState } from "react";

const useMongoState = (initVal) => {
    const [data, setData] = useState(initVal)
    //set init
    const setMongoData = e => {
        //e.target.path to update DB
        setData(e)
    }
    return [data, setMongoData]
}

export {
    useMongoState,
}