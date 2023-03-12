import React, { useState } from "react";
import { MdSearch } from 'react-icons/md';

const Search= ({handleSearchNote})=> {
    const [searchText,setSearchText] = useState('');
    const handleChange=(event)=>{
        setSearchText(event.target.value)
        searchText=='' && handleKey();
        handleSearchNote(searchText)
    }

   const  handleKey =()=>{
    handleSearchNote(searchText)

   }
    return(
        <div className="search">
            <MdSearch className='search-icons' size='1.3em' />
            <input 
            value={searchText}
            onChange={handleChange}
            placeholder="Search..."
            onKeyDown={handleKey}
            />
        </div>
    )
}

export default Search;