import React, { useEffect, useState } from "react";
import { Switch, Route, Outlet, Navigate, useNavigate } from "react-router-dom";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();


    const login = (user) => {
        /*setCurrentUser({
            username: user.username,
            blogIDs: user.blogIDs,
            userId: user.id,
        });
        */
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
    };


    return <div className="App">
        <NavBar logout={logout} currentUser={currentUser}/>
        <Outlet context={[login, currentUser]} />
    </div>
}

export default App;
