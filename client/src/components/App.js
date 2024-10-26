import React, { useEffect, useState } from "react";
import { Outlet, Switch, Route, Navigate, useNavigate } from "react-router-dom";
import NavBar from './NavBar';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState({
        username: '',
        userId: 1,
    });
    //const navigate = useNavigate();


    const login = (user) => {
        /*setCurrentUser({
            username: user.username,
            userId: user.id,
        });
        */
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
        /*
        setCurrentUser({
            username: '',
            userId: 1,
        });
        */
    };

    console.log(isLoggedIn)

    return <div className="App">
        <NavBar logout={logout} login={login} currentUser={currentUser} isLoggedIn={isLoggedIn}/>
        <Outlet context={[isLoggedIn]} />
    </div>
}

export default App;