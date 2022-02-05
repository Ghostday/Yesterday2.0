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
        setOptions(results)
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
    console.log('Effect Firing');
    let active: boolean = true;

    if (!loading) {
      return undefined;
    }
  
    (async () => {
      if (active && search.length > 2) {
        // TODO: Need to add debounce here to prevent multi-fetching
        console.log('Active IF firing');
        searchResults(search);
      }
      console.log(options)
    })();

    return () => {
      active = false;
    };
  
  }, [loading, search, options]);




  return (
    <Autocomplete
      freeSolo
      id="search-bar"
      sx={{ maxWidth: "70vw", minWidth: "25vw", }}
      options={options.map((option: { [x: string]: any; }) => option["2. name"])}
      value={search}
      open={open}
      loading={loading}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
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