import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './Layout.css';
import { useHttp } from '../src/hooks/http.hook';
import { useState, useEffect } from 'react';

function Layout() {   //Layout
    const { loading, request } = useHttp()
    const [inpValue, setInpValue] = useState("")
    const [ganres, setGanres] = useState(null)

    const getGanres = async () => {
        const ganres = await request('http://localhost:5000/api/ganres')
        setGanres(ganres)
    }
    useEffect(() => {
        getGanres()
    }, [])

    return (
        <div>
            <div className='header'>
                <div className='logo'>Logo</div>
                <div className='headerText'>Header</div>
                <div>
                    <input className='search' placeholder='Search' value={inpValue} onChange={(e) => setInpValue(e.target.value)} />
                </div>

            </div>
            <div className='navBar' style={{ display: "flex", flexDirection: "row", justifyContent: "center", justifyContent: "space-evenly" }}>
                <Link to="/">Home</Link>
                <Link to="/create-book">Create Book</Link>
                {/* <Link to="/book">Created Book</Link> */}
            </div>
            <div className='main'>
                <nav>
                    <ul>
                        {
                            ganres && ganres.map(({ _id, name }, i) => {
                                return <li key={_id}>
                                    <Link to={`ganre-page/${_id}`}>{name}</Link>
                                </li>
                            })
                        }

                    </ul>
                </nav>
                <div className='content'>
                    {
                        <Outlet context={[inpValue]} />
                    }
                </div>
            </div>
            <div>
                <h1>Footer</h1>
                <div>
                    {
                        // books
                    }
                    {/* {
                        books && books.map(el => {
                            if (el.title === inpValue) {
                                return (
                                    <div key={el['_id']}>{el.title}{el.ganre.name}{el.description}<hr /></div>
                                )
                            }
                        })
                    } */}
                </div>
            </div>
        </div >
    )
}

export default Layout;