import { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";


function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(false);
            if (r.ok) {
                r.json().then((user) => onLogin(user));
            } else {
                r.json().then((err) => setErrors(err.errors));
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
                {errors.map((err) => (
                    <alert key={err}>{err}</alert>
                ))}
            </form>
            <br></br>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            <p>{errors}</p>
        </div>
        
    );
}

export default Login;