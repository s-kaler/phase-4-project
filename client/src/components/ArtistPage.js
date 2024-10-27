import React, { useState, useEffect } from "react";
import { useParams, useOutletContext, Link } from "react-router-dom";

function ArtistPage() {
    const params = useParams();
    const isLoggedIn = useOutletContext();
    
    return (
        <div>
            <h1>Artist Page:</h1>
            
        </div>
    )
}

export default ArtistPage;