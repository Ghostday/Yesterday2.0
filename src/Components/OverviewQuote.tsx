import { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import { APIKey } from '../api';

type AppProps = {
    stock: string;
}

export default function OverviewQuote({stock}: AppProps){
    console.log("OverviewQuote: ", stock)

    const [details, setDetails] = useState<any>({})

    const fetchQuote = (stock: string) => {
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${APIKey}`)
        .then(response => response.json())
        .then(data => {
            setDetails(data["Global Quote"])
        })
    }
    
    useEffect(() => {
        fetchQuote(stock)
    }, [stock])

    return (
        <>
        {details ? 
            <Paper variant='outlined'>
            <h2>Change Amount: {details["09. change"]}</h2> 
            <h2>Change Percent: {details["10. change percent"]}</h2>
            </Paper>
        : <h2>Loading</h2>}
        </>
    )
}