import { useState, useEffect } from "react";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import { Button, Error, Input, FormField, Label } from "../styles";
import styled from "styled-components";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useOutletContext();

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        }).then((r) => {
            if (r.ok) {
                setError(null);
                setIsLoggedIn(true);
                const interval = setTimeout(() => {
                    r.json().then((user) => setUser(user));
                    setIsLoading(false);
                    navigate("/");
                }, 500);
            } else {
                setIsLoading(false);
                setError("Invalid credentials")
            }
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br></br>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br></br>
                <button type="submit">
                    {isLoading ? "Loading..." : "Login"}
                </button>
                <p>{error}</p>
            </form>
            <br></br>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
        
    );
}

export default Login;