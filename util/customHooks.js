import { useState, useEffect } from "react";
import { generateListId } from "./utilFunctions"

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const usePropertyState = (path, target, initVal) => {
    const [data, setData] = useState(initVal)
    const setMongoData = e => {
        const modificationObj = {
            path,
            target,
            value: e,
        }
        //e.target.path to update DB
        let route;
        switch (path.length) {
            case 3:
                route = 'api/modifyItem';
                break;
            case 2:
                route = 'api/modifyCategory'
                break;
            default:
                route = ''
        }
        console.log(route);
        async function fetchModifyItem() {
            const res = await fetch(SERVER_URL + route, {
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