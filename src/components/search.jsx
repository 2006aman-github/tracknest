import React, { useState } from 'react'
import { Input } from "@/components/ui/input.jsx"

function Search() {

    const [search, setSearch] = useState('');
    return (
        <Input
            type="search"
            placholder="Search Courses"
            value = {search}
            onChange = {(e)=>{setSearch(e.target.value)}}

        />
    )
}

export default Search