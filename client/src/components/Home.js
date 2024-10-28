import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

function Home() {
    const [user, setUser] = useOutletContext();
    console.log(user)
    
    return (
        <>
            <h1>Home</h1>
        </>
    )
}

export default Home;