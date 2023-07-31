import React from 'react';
import './Search.css'
import { BiSearch } from 'react-icons/bi'
import { t } from 'i18next';

const Search = ({ setSearchQuery }) => {  
    return (
        <div className="shop__input">
            <BiSearch className='search__iconn'/>
            <input type="text" placeholder={`${t("search__placeholder")}`} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
    )
}

export default Search;