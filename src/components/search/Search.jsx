import React, { useState } from 'react';
import './Search.css'

const Search = () => {  
    return (
        <div className="shop__input">
            <i className="bx bx-search search__iconn"></i>
            <input type="text" placeholder="Search for products" />
        </div>
    )
}

export default Search