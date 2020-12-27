import { useState, useEffect } from "react";

const SERVER_URL = 'http://localhost:3000/';

const useMongoState = (initVal) => {
    const [data, setData] = useState(initVal)
    //set init
    const setMongoData = e => {
        //e.target.path to update DB
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
    useMongoState,
    useChecklist,
}