import React, { useEffect, useState } from "react";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import './App.css';

function NewPlaylist() {

    const navigate = useNavigate();
    const [user, setUser, userPlaylists, setUserPlaylists] = useOutletContext();
    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a name").max(30),
        genre: yup.string().required("Must enter a genre").max(15),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            genre: "",
            artistId: user.id,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/artists/${user.id}/playlists`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
                .then(r => r.json())
                .then(data => {
                    setUserPlaylists([...userPlaylists, data]);
                    alert("New playlist created!")
                    navigate(`/playlist/${data.id}`)
                })
        },
    });
    return (
        <div>
            <h1>Create a new playlist:</h1>
            <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
                <label htmlFor="name">Name</label>
                <br />
                <input
                    id="name"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                <p style={{ color: "red" }}> {formik.errors.name}</p>
                <label htmlFor="genre">Genre</label>
                <br />
                <input
                    id="genre"
                    name="genre"
                    onChange={formik.handleChange}
                    value={formik.values.genre}
                />
                <p style={{ color: "red" }}> {formik.errors.genre}</p>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewPlaylist;