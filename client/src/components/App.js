import React, { useEffect, useState } from "react";
import { Outlet, Switch, Route, Navigate, useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import './App.css';

function App() {
    
    const [user, setUser] = useState({
        username: '',
        id: '',
    });
    //const navigate = useNavigate();
    
    useEffect(() => {
        // auto-login
        fetch("/check_session").then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    console.log(user);
                    setUser(user)});
            }
        });
    }, []);

    return <div className="App">
        <NavBar user={user} setUser={setUser} />
        <main>
            <Outlet context={[user, setUser]}/>
        </main>
    </div>
}

export default App;