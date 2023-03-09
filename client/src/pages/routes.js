import React, { useEffect } from "react";
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from "../Layout";
import { AuthPage } from "./AuthPage";
import { GanrePage } from "./GanrePage";
import { CreateBook } from './CreateBook';
import App from "../App";
import { NoPage } from "./NoPage";
import { useState } from "react";
import { useHttp } from '../hooks/http.hook';

export const useRoutes = isAuthenticated => {
    const [user, setUser] = useState(null)
    const { request } = useHttp()

    const getUser = async (userId) => {
        if (!userId) {
            return
        }
        const user = await request(`http://localhost:5000/api/users/${userId}`)
        setUser(user)
    }

    useEffect(() => {
        getUser(JSON.parse(localStorage.getItem('userData'))?.userId)
    }, [])

    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<App />} />
                    <Route path='/ganre-page/:ganre' element={<GanrePage />} />
                    {
                        user?.isAdmin && <Route path="/create-book" element={<CreateBook />} />
                    }
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
        </Routes>
    )
}