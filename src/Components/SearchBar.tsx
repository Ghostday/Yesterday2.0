import { useState } from "react";
import { TextField, Autocomplete } from '@mui/material'

export default function SearchBar() {

    const stockOptions = () => {
        return ["empty", "array"]
    }

    return (
    <Autocomplete 
    freeSolo
    id="search-bar"
    options={stockOptions()}
    renderInput={(params: any) => <TextField {...params} label="Search for Stock or Option"/> }

    />
    )
}