import React, { useEffect, useState } from "react";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import './App.css';

function NewSong() {

    const navigate = useNavigate();
    const [user, setUser, userPlaylists] = useOutletContext();
    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter a title").max(30),
        duration: yup.number()
            .positive()
            .integer()
            .required("Must enter a duration in seconds")
            .typeError("Please enter an integer in seconds")
            .max(240),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: "",
            duration: "",
            artistId: user.id,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`/artists/${user.id}/songs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
                .then(r => r.json())
                .then(data => {
                    alert("New song added!")
                    navigate(`/artist/${user.id}`)
                })
        },
    });
    return (
        <div>
            <h1>Create a new song:</h1>
            <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
                <label htmlFor="title">Title</label>
                <br />
                <input
                    id="title"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                <p style={{ color: "red" }}> {formik.errors.title}</p>
                <label htmlFor="duration">Duration</label>
                <br />

                <input
                    id="duration"
                    name="duration"
                    onChange={formik.handleChange}
                    value={formik.values.duration}
                />
                <p style={{ color: "red" }}> {formik.errors.duration}</p>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewSong;