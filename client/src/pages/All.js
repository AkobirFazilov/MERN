import { useRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/auth.hook";
import { AuthContext } from "../context/AuthContext";

export const All = () => {
    const { token, login, logout, userId } = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <BrowserRouter>
                <div>
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}