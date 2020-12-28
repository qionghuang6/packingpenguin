import { useState, useEffect } from "react";
import { generateListId } from "./generateIds"

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const useItemState = (path, target, initVal) => {
    const [data, setData] = useState(initVal)
    const setMongoData = e => {
        const modificationObj = {
            checklistId: path[0], 
            categoryId: path[1], 
            itemId: path[2], 
            target,
            value: e,
        }
        //e.target.path to update DB
        console.log(modificationObj);
        setData(e)
    }
    return [data, setMongoData]
}

const useChecklist = () => {
    const [checklistId, setChecklistId] = useState("0");
    const [data, setData] = useState({name: "", categories: [], renderPurchased: false});
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
        fetchData();
    }, [checklistId]);
    // console.log(data);
    return data;
};

export {
    useItemState,
    useChecklist,
}