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
            console.log(data);
            auth.login(data.token, data.userId)
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: "column", alignItems: 'center' }}>
            AuthPage
            <div>
                <input
                    type='text'
                    name='nikname'
                    onChange={changeHandler}
                    placeholder='Nikname' />
                <input
                    type='password'
                    name='password'
                    onChange={changeHandler}
                    placeholder='Password' />
            </div>
            <div>
                <button
                    onClick={loginHandler}
                    disabled={loading}>
                    Login
                </button>
                <button
                    onClick={registerHandler}
                    disabled={loading}>
                    Register
                </button>
            </div>
        </div>
    )
}