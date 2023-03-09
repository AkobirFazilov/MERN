import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const { loading, request } = useHttp()
    const [authForm, setAuthForm] = useState({
        nikname: '',
        password: ''
    });

    const changeHandler = event => {
        setAuthForm({ ...authForm, [event.target.name]: event.target.value })

    }

    const registerHandler = async () => {
        try {
            const data = await request('http://localhost:5000/api/register', 'POST', authForm)
            console.log(data.message);
            alert(data.message)
        } catch (e) {
            alert(e)
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('http://localhost:5000/api/login', 'POST', authForm)
            auth.login(data.token, data.userId)
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: "column",
            alignItems: 'center',
            height: '100vh',
            width: '100%',
            justifyContent: 'center'
        }}>
            <div style={{
                display: 'flex',
                width: 'fit-content',
                height: 'fit-content',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: '20px',
                backgroundColor: '#986C41',
                borderRadius: '20px'
            }}>
                <label htmlFor='nikname' style={{
                    fontWeight: "500",
                    color: 'white'
                }}>Nikname</label>
                <input
                    style={{
                        width: '250px',
                        height: '30px',
                        marginBottom: '10px',
                        borderRadius: '5px',
                        border: "none"
                    }}
                    type='text'
                    id='nikname'
                    name='nikname'
                    onChange={changeHandler}
                    placeholder='Enter your nikname' />
                <label htmlFor='password' style={{
                    fontWeight: "500",
                    color: 'white'
                }}>Password</label>
                <input style={{
                    width: '250px',
                    height: '30px',
                    borderRadius: '5px',
                    border: "none"
                }}
                    type='password'
                    id='password'
                    name='password'
                    onChange={changeHandler}
                    placeholder='Enter your password' />
            </div>
            <div style={{
                display: "flex",
                width: '270px',
                height: 'fit-content',
                justifyContent: 'space-between',
                padding: '10px'
            }}>
                <button
                    onClick={loginHandler}
                    disabled={loading}
                    style={{
                        width: '130px',
                        border: "none",
                        cursor: 'pointer',
                        borderRadius: '5px'
                    }}>
                    Login
                </button>
                <button
                    onClick={registerHandler}
                    disabled={loading}
                    style={{
                        width: "130px",
                        border: 'none',
                        cursor: "pointer",
                        borderRadius: '5px',
                    }}>
                    Register
                </button>
            </div>
        </div>
    )
}