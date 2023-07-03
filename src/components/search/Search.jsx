import React, { useState } from 'react';
import './Search.css'
import { BiSearch } from 'react-icons/bi'

const Search = () => {  
    return (
        <div className="shop__input">
            <BiSearch className='search__iconn'/>
            <input type="text" placeholder="Search for products" />
        </div>
    )
}

export default Search