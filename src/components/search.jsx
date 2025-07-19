import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setSearch, setCategory, setLevel, setSort } from "@/features/search/searchSlice.js"
import { Input } from "@/components/ui/input.jsx"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu.jsx"
import { Button } from "@/components/ui/button.jsx"
import { Search as SearchIcon, Filter as FilterIcon } from "lucide-react"

const filters = [
    { label: "Category", values: ["All", "Web Development", "Data Science", "Mobile Development"], action: setCategory },
    { label: "Level", values: ["All", "Beginner", "Intermediate", "Advanced"], action: setLevel },
    { label: "Sort By", values: ["Default", "Rating", "Popularity"], action: setSort },
]

function Search({ className = "" }) {
    const dispatch = useDispatch()
    const search = useSelector((s) => s.search.search)
    const [val, setVal] = useState(search)

    useEffect(() => {
        const t = setTimeout(() => dispatch(setSearch(val)), 500)
        return () => clearTimeout(t)
    }, [val, dispatch])

    return (
        <div className={`w-full flex flex-col gap-4 ${className}`}>
            <div className="relative w-full max-w-md mx-auto">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                    type="search"
                    placeholder="Search Courses"
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
            </div>

            <div className="flex justify-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                            <FilterIcon className="w-4 h-4" /> Filter
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64">
                        {filters.map(({ label, values, action }, i) => (
                            <React.Fragment key={label}>
                                <DropdownMenuLabel>{label}</DropdownMenuLabel>
                                {values.map((v) => (
                                    <DropdownMenuItem key={v} onClick={() => dispatch(action(v))}>
                                        {v}
                                    </DropdownMenuItem>
                                ))}
                                {i < filters.length - 1 && <DropdownMenuSeparator />}
                            </React.Fragment>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default Search
