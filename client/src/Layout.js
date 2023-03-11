import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import './Layout.css';
import { useHttp } from '../src/hooks/http.hook';
import { useState, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import logo from './favicon.png'

function Layout() {   //Layout
    const { request } = useHttp()
    const [inpValue, setInpValue] = useState("")
    const [ganres, setGanres] = useState(null)
    const [user, setUser] = useState(null)
    const auth = useContext(AuthContext)

    const getUser = async (userId) => {
        const user = await request(`http://localhost:5000/api/users/${userId}`)
        setUser(user)
    }

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        routeChange()
    }

    const getGanres = async () => {
        const ganres = await request('http://localhost:5000/api/ganres')
        setGanres(ganres)
    }

    useEffect(() => {
        getGanres()
        getUser(JSON.parse(localStorage.getItem('userData')).userId)
    }, [])
    return (
        <div>
            <div className='header'>
                <div className='logo'><img style={{
                    height: '13vh',
                    margin: '0px'
                }} src={logo} /></div>
                <div className='headerText'>НМНАУ</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input className='search' placeholder='Search' value={inpValue} onChange={(e) => setInpValue(e.target.value)} />
                </div>

            </div>
            <div className='navBar'>
                <Link to="/" className='home'>Home</Link>
                {
                    user?.isAdmin && <Link to="/create-book" id='create-book'>Create Book</Link>
                }
                <Link to='/' className='exit' onClick={logoutHandler}>Exit</Link>
            </div>
            <div className='main'>
                <div className='ganres'>
                    {
                        ganres && ganres.map(({ _id, name }, i) => {
                            return <div
                                className='ganre'
                                key={_id}>
                                <Link to={`ganre-page/${_id}`}>{name}</Link>
                            </div>
                        })
                    }
                </div>
                <div className='content'>
                    {
                        <Outlet context={[inpValue]} />
                    }
                </div>
            </div>
            <div className='Footer' style={{ display: "flex", alignItems: 'center', justifyContent: 'center', width: "100%", height: "20vh", flexDirection: "column" }}>
                <h1>Footer</h1>
                <div>

                </div>
            </div>
        </div >
    )
}

export default Layout;