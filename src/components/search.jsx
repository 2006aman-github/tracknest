import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSearch } from '@/features/search/searchSlice.js'
import { Input } from '@/components/ui/input.jsx'

function Search() {
    const d = useDispatch()
    const s = useSelector((st) => st.search.search)
    const [val, setVal] = useState(s)

    useEffect(() => {
        const t = setTimeout(() => {
            console.log("Dispatching:", val)
            d(setSearch(val))
        }, 500)

        return () => clearTimeout(t)
    }, [val, d])


    useEffect(() => {
        console.log(val);
    }, [val])

    return (
        <Input
            type="search"
            placeholder="Search Courses"
            value={val}
            onChange={(e) => setVal(e.target.value)}
        />
    )
}

export default Search
