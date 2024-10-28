import React, { useState, useEffect } from "react";
import { useParams, useOutletContext, Link } from "react-router-dom";

function ArtistPage() {
    const params = useParams();
    const [user, setUser]  = useOutletContext();
    const [isUserArtist, setIsUserArtist] = useState(false)
    const [artist, setArtist] = useState({ 
        username: "",
        biography: "",
        image_url: "",
        playlists: []
    })
    const [isEditing, setIsEditing] = useState(false)

    //console.log(params)
    useEffect(() => {
        fetch(`/artists/${params.artistId}`)
        .then(r => r.json())
        .then(data => {
            if (user && user.id === parseInt(params.artistId)) {
                setIsUserArtist(true)
            }
            setArtist({
            username: data.username,
            biography: data.biography,
            image_url: data.image_url,
        })
    })
    }, [user, params.id])

    if (isUserArtist) {
        if (isEditing) {
            // render edit form
            // when form is submitted, update artist data
        }
        else {
            return (
                <div>
                    <h1>{artist.username}'s Page (You)</h1>
                    <p>{artist.biography}</p>
                    {isEditing ? <button onClick={setIsEditing(true)}>Edit Profile</button> : <></>}
                </div>
            )
        }
        
    }
    else {
        return (
            <div>
                <h1>{artist.username}'s Page</h1>
                <p>{artist.biography}</p>
            </div>
        )
    }
    
}

export default ArtistPage;