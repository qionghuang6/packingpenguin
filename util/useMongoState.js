import { useState } from "react";

const useMongoState = (initVal) => {
    const [data, setData] = useState(initVal)
    const setMongoData = e => {
        setData(e)
    }
    return [data, setMongoData]
}

export default useMongoState