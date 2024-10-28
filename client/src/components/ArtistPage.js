import React, { useState, useEffect } from "react";
import { useParams, useOutletContext, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import ArtistSongs from "./ArtistSongs"

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
    //use local file image in /client/src/images/default-avatar.jpg
    const defaultImg = "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
    const [imageURL, setImageURL] = useState(defaultImg)

    //console.log(params)
    useEffect(() => {
        fetch(`/artists/${params.artistId}`)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            if (user && user.id === parseInt(params.artistId)) {
                setIsUserArtist(true)
            }
            setArtist({
                username: data.username,
                biography: data.biography,
                image_url: data.image_url,
            })
            if (data.image_url === "") {
                setImageURL(defaultImg)
            }
            else {
                setImageURL(data.image_url)
            }
        })
    }, [user, params.artistId])

    
    function handleEditClick() {
        setIsEditing(!isEditing)
    }

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username").max(15),
        biography: yup.string().max(250),
        image_url: yup.string().url().test(
            'is-image',
            'Must be a valid image URL',
            (value) => {
                if (!value) return true; // Allow empty values

                const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'];
                return imageExtensions.some(ext => value.toLowerCase().endsWith(ext));
            }
        ),
        
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: user.username,
            biography: user.biography,
            image_url: user.image_url,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/artists/${params.artistId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
            .then(r => r.json())
            .then(data => {
                setArtist({
                    username: data.username,
                    biography: data.biography,
                    image_url: data.image_url
                })
                //console.log(data)
                if(data.image_url === "") {
                    setImageURL(defaultImg)
                }
                else {
                    setImageURL(data.image_url)
                }
                setIsEditing(false)
                alert("Profile updated successfully!")
            })
        },
    });

    const editFormik = (
        <>
            <h2>Edit Profile</h2>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                <p style={{ color: "red" }}> {formik.errors.username}</p>
                <br></br>
                <label htmlFor="biography">Biography:</label>
                <textarea
                    id="biography"
                    name="biography"
                    onChange={formik.handleChange}
                    value={formik.values.biography}
                />
                <p style={{ color: "red" }}> {formik.errors.biography}</p><br></br>
                <label htmlFor="image_url">Image URL:</label>
                <input
                    id="image_url"
                    name="image_url"
                    onChange={formik.handleChange}
                    value={formik.values.image_url}
                />
                <p style={{ color: "red" }}> {formik.errors.image_url}</p>
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
                {isEditing ? editFormik :
                    <div className="ArtistDiv">
                        <h1>{artist.username}'s page</h1>
                        <img src={imageURL} alt={artist.username} className="avatar"/>
                        <p>{artist.biography}</p>
                        <br></br>
                        <button name="edit-button" onClick={handleEditClick}>Edit Profile</button>
                    </div>
                }
                </>
        )
    }

    //<ArtistSongs artistId={params.artistId} /> 
    else {
        return (
            <>
                <div className="ArtistDiv">
                    <h1>{artist.username}'s page</h1>
                    <img src={imageURL} alt={artist.username} className="avatar" />
                    <p>{artist.biography}</p>
                </div>
            </>
        )
    }
    
}

export default ArtistPage;