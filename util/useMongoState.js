
const useMongoState = (initVal) => {
    const [data, setData] = useState()
    const setMongoData = e => {
        setData//(something)
        //do database stuff
    }
    return [data, setMongoData]
}

export default useMongoState
import { useState } from "react";