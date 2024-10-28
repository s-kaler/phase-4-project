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
    }, [user, params.artistId])


    function handleEditClick() {
        setIsEditing(!isEditing)
    }

    function handleEditSubmit(e) {
        e.preventDefault()
        fetch(`/artists/${params.artistId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: artist.username,
                biography: artist.biography,
                image_url: artist.image_url
            })
        })
        .then(r  => r.json())
        .then(data => {
            setArtist({
                username: data.username,
                biography: data.biography,
                image_url: data.image_url
            })
            //console.log(data)
            setIsEditing(false)
            alert("Profile updated successfully!")
        })

    }

    const editForm = (
        <>
            <form onSubmit={handleEditSubmit}>
                <label>Username:</label>
                <input type="text" value={artist.username} onChange={(e) => setArtist({ ...artist, username: e.target.value })} />
                <br></br>
                <label>Biography:</label>
                <textarea value={artist.biography} onChange={(e) => setArtist({ ...artist, biography: e.target.value })}></textarea>
                <br></br>
                <label>Image URL:</label>
                <input type="text" value={artist.image_url} onChange={(e) => setArtist({ ...artist, image_url: e.target.value })} />
                <br></br>
                <button type="submit">Update Profile</button>
            </form>
            <br></br>
            <button type="button" onClick={handleEditClick}>Cancel</button>
        </>     
    )

        

    if (isUserArtist) {
        //console.log(isEditing)
        return (
            <>  
                {isEditing ? editForm :
                    <div className="ArtistDiv">
                        <h1>{artist.username}'s Page (You)</h1>
                        <p>{artist.biography}</p>
                        <button name="edit-button" onClick={handleEditClick}>Edit Profile</button>
                    </div>
                }
            </>
        )
    }
    else {
        return (
            <div className="ArtistDiv">
                <h1>{artist.username}'s Page</h1>
                <p>{artist.biography}</p>
            </div>
        )
    }
    
}

export default ArtistPage;