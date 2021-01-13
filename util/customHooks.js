import { useState, useEffect } from "react";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const useStickyMongoState = (path, target, initVal) => {
    const[state, setStickyState] = useState(initVal)

    const setMongoState = newVal => {
        async function fetchModifyItem() {
            const res = await fetch(SERVER_URL + 'api/modifyProperty', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({path, target, value:newVal}),
            })
            if (!res.ok) {
                console.log("HTTP-Error: " + res.status);
            }
        }
        fetchModifyItem();
        setStickyState(newVal)
    }

    return [state, setStickyState, setMongoState]
}

const usePropertyState = (path, target, initVal) => {
    const [data, setData] = useState(initVal)
    //console.log(data)
    const route = SERVER_URL + 'api/modifyProperty';
    const setMongoData = e => {
        const modificationObj = {
            path,
            target,
            value: e,
        }
        const fetchModifyItem = async () => {
            const res = await fetch(route, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(modificationObj),
            })
            if (!res.ok) {
                console.log("HTTP-Error: " + res.status);
            }
        }
        fetchModifyItem();
        setData(e)
    }
    return [data, setMongoData]
}

const useChecklist = (checklistId, isFromSlug=false) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(SERVER_URL + 'api/getChecklist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({checklistId, isFromSlug}),
            })
            if (res.ok) {
                let json = await res.json();
                setData(json)
            } else {
                console.log("HTTP-Error: " + res.status);
                setData('error')
            }
        }
        if(checklistId) fetchData();
    }, [checklistId]);
    // console.log(data);
    return data;
};

export {
    usePropertyState,
    useChecklist,
    useStickyMongoState
}