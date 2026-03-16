import { useEffect, useState } from "react";
import api from "../../services/Api";

const useFetch = (url) => {
    const [data,setData] = useState([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps

    useEffect(()=> {
        getData();
    },[url]);

    const getData = async () => {
        if (!url) return;

        try{
            const response = await api(url);
            const data = await response.json();
            setData(data);
            
        }catch(e){
            console.error(e);
        }
    };
    return {
        data
    }
}
export default useFetch;