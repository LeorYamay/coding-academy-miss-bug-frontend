
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

export function AppHeader() {

    return (
        <header className='app-header container'>
            
            <div className='header-container'>
                <nav className='app-nav'>
                    <NavLink to="/">Home</NavLink> |<NavLink to="/bug">Bugs</NavLink> |
                    <NavLink to="/about">About</NavLink>
                </nav>
                <h1>Bugs are Forever</h1>
            </div>
        </header>
    )
}
