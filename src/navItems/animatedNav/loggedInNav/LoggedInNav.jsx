import React from 'react'
import './LoggedInNav.css'
import { Link } from 'react-router-dom'

const LoggedInNav = () => {
    return (
        <section className='logged__nav'>
            <ul className='logged__nav_list'>
                <li className=''>
                    <Link>
                        <h1>Home</h1>
                        
                    </Link>
                </li>
                <li>
                    <Link>
                        <h1>Articles</h1>
                    </Link>
                </li>
                <li>
                    <Link>
                        <h1>About Us</h1>
                    </Link>
                </li>
            </ul>
        </section>
    )
}

export default LoggedInNav