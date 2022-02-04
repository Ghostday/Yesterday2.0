import { useState, useEffect } from "react";
import { TextField, Autocomplete } from '@mui/material'
import { APIKey } from '../api'

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<any>([]);
  const [search, setSearch] = useState("");
  const loading = open && options.length === 0;
  const stockOptions = ["empty", "array"]

  let searchResults = function(input: string) {
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${input}&apikey=${APIKey}`)
    .then(Response => Response.json())
    .then(data => {
      console.log(data)
      if (!("Note" in data)) {
        let results = data.bestMatches
        console.log(results)
        return results
      }
      else {
        console.log('Api Exceeded')
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    let active: boolean = true;

    if (!loading) {
      return undefined;
    }
  
  (async () => {
    // await

    if (active) {
      setOptions(searchResults(search));
    }
  })();

  return () => {
    active = false;
  };
  
  }, [loading]);




  return (
    <Autocomplete
      freeSolo
      id="search-bar"
      sx={{ maxWidth: "70vw", minWidth: "25vw", }}
      options={stockOptions}
      value={search}
      disableClearable
      onInputChange={(event: any, newValue: string) => {
        setSearch(newValue)
      }}
      renderInput={(params: any) => {
        return (
          <TextField
            {...params}
            label="Search for Stock or Option"
            inputProps={{
              ...params.inputProps,
              type: 'search',
            }} />
        )
      }}

    />
  )
}