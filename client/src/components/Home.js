import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

function Home() {
    return (
        <main className="home">
            <h1>Home</h1>
            <Link to="/about">About</Link>
        </main>
    )
}