import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

function Home() {
    const [user, setUser] = useOutletContext();
    console.log(user)

    return (
        <main className="home">
            <h1>Home</h1>
        </main>
    )
}

export default Home;