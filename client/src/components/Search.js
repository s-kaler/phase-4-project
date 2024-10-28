import React, { useState } from "react";

function Search(){
    const [searchLabel, setSearchLabel] = useState("Search By Artist Name or Genre")
    const [formData, setFormData] = useState({options: "artist", searchBox: ""})

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        //console.log(formData);
    };

    function handleSearchOptions(e) {
        const option = e.target.value;
        if (option === "artist") {
            setSearchLabel("Search By Artist Name or Genre")
        }
        else if (option === "song") {
            setSearchLabel("Search By Song Title")
        }
        else if (option === "playlist") {
            setSearchLabel("Search By Playlist Name")
        }
        handleChange(e)
    }

    function handleSearchSubmit(e) {
        e.preventDefault();
        if(formData.searchBox ===  "") {
            alert("Please enter a search term.")
            return;
        }
        // fetch API to search for the data based on the search term and selected option
        if (formData.options === "artist") {
            console.log("Searching for artist...")
        }
        else if (formData.options === "song") {
            console.log("Searching for song...")
        }
        else if (formData.options === "playlist") {
            console.log("Searching for playlist...")
        }
    }


    return (
        <div className="SearchPage">
            <h1>Search</h1>
            <span className="SearchBox">
                <form onSubmit={handleSearchSubmit}>
                    <p>{searchLabel}</p>
                    <select name="options" onChange={handleSearchOptions}>
                        <option value="artist">Artist</option>
                        <option value="song">Song</option>
                        <option value="playlist">Playlist</option>
                    </select>
                    <input type="text" id="searchBox" name="searchBox" onChange={handleChange}/>
                    <button type="submit">Search</button>
                </form>
            </span>
        </div>
        
    );
}

export default Search;