import { useEffect, useState } from "react";
import api from "../../services/Api";

const useFetch = (url) => {
    const [data,setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        getData();
    },[url]);

    const getData = async () => {
        if (!url) return;

        setLoading(true);
        try{
            const response = await api(url);
            const data = await response.json();
            setData(data);
            
        }catch(e){
            console.error(e);

        } finally {
            setLoading(false);
        }
    };
    return {
        data,
        loading
    }
}
export default useFetch;