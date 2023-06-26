import { useEffect, useState } from "react";
import axios from 'axios'

const useFetch = ( url ) => {
    const [data, setData] = useState();

    useEffect(
        ()=>{
            const fetchData = async (url) => {
                const response = await axios.get(url)
                const jsonData = await response.data
                setData(jsonData)
            }

            fetchData(url)
        },[url]
    )
    
    return [data];
};

export default useFetch;
