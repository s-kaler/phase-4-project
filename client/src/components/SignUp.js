import React, { useEffect, useState } from "react";
import { useOutletContext, Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import './App.css';

function SignUp() {
    const [error, setError] = useState([]);
    const [refreshPage, setRefreshPage] = useState(false);
    //const [artists, setArtists] = useState([{}]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        //console.log("FETCH! ");
        fetch("/artists")
            .then((res) => res.json())
            .then((data) => {
                //setArtists(data);
                //console.log(data);
            });
    }, [refreshPage]);


    const formSchema = yup.object().shape({
        email: yup.string().email("Invalid email").required("Must enter email"),
        username: yup.string().required("Must enter a username").max(15),
        password: yup.string().required("Please enter a password").max(20)
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            biography: "",
            image_url: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("artists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            }).then((res) => {
                if (res.status == 201) {
                    setRefreshPage(!refreshPage);
                    setIsSubmitted(true);
                    alert("Successfully signed up!")
                    const interval = setTimeout(() => {
                        navigate("/");
                    }, 500);
                    
                }
                else if(res.status == 422) {
                    console.log(res.error);
                }
            });
        },
    });


    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <br />
                <input
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <p style={{ color: "red" }}> {formik.errors.email}</p>

                <label htmlFor="name">Username</label>
                <br />
                <input
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                />
                <p style={{ color: "red" }}> {formik.errors.username}</p>

                <label htmlFor="password">Password</label>
                <br />
                <input 
                id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <p style={{ color: "red" }}> {formik.errors.password}</p>

                {isSubmitted ? <button disabled={true}>Submitted</button>: <button type="submit">Submit</button>}
                
            </form>
            <p>{error}</p>
            {isSubmitted ? <p></p> : null}
        </div>
    );
    



}

export default SignUp;
