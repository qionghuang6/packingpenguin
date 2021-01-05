import { useState, useEffect } from "react";
import { generateListId } from "./utilFunctions"

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const useStickyMongoState = (path, target) => {
    const[state, setStickyState] = useState()

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

const useChecklist = () => {
    const [checklistId, setChecklistId] = useState(null);
    const [data, setData] = useState(null);
    useEffect(() => {
        if (typeof window !== "undefined") {
            if(localStorage.getItem('checklistId') == null){
              localStorage.setItem('checklistId', generateListId())
            }
            setChecklistId(localStorage.getItem('checklistId'))
        }
        async function fetchData() {
            const res = await fetch(SERVER_URL + 'api/getChecklist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/html',
                },
                body: checklistId,
            })
            if (res.ok) {
                let json = await res.json();
                setData(json)
            } else {
                console.log("HTTP-Error: " + res.status);
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
}