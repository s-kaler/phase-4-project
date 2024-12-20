import React, { useState, useEffect } from "react";
import { useParams, useOutletContext, Link, useNavigate } from "react-router-dom";
import './App.css';


function Search() {
    const [user, setUser, userPlaylists, setUserPlaylists] = useOutletContext();
    const [searchLabel, setSearchLabel] = useState("Search By Artist Name")
    const [formData, setFormData] = useState({options: "artist", searchBox: ""})
    const [searchResults, setResults] = useState([])
    const [allArtists, setAllArtists] = useState([])
    const [allSongs, setAllSongs] = useState([])
    const [allPlaylists, setAllPlaylists] = useState([])
    const [isSearchWiped, setSearchWiped] = useState(true)

    useEffect(() => {
        fetch(`/artists`)
        .then(r => r.json())
        .then(data => {
            //console.log(data)
            setAllArtists(data)
        })
        fetch(`/songs`)
        .then(r => r.json())
        .then(data => {
            //console.log(data)
            setAllSongs(data)
        })
        fetch(`/playlists`)
        .then(r => r.json())
        .then(data => {
            //console.log(data)
            setAllPlaylists(data)
        })
    }, [])


    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setSearchWiped(true)
        //console.log(formData);
    };

    function handleSearchOptions(e) {
        const option = e.target.value;
        if (option === "artist") {
            setSearchLabel("Search By Artist Name")
        }
        else if (option === "song") {
            setSearchLabel("Search By Song Title")
        }
        else if (option === "playlist") {
            setSearchLabel("Search By Playlist Name or Genre")
        }
        handleChange(e)
    }


    let userPlaylistOptions = []

    if (userPlaylists) {
        if (userPlaylists.length > 0) {
            userPlaylistOptions = userPlaylists.map(playlist => (
                <option key={playlist.id} value={playlist.id} name={playlist.name}>{playlist.name}</option>
            ))
        }
        else {
            userPlaylistOptions = <option value=""></option>
        }
    }

    function handleAddToPlaylist(song, e) {
        e.preventDefault();
        //console.log(e.target.selections.value)
        //console.log(song.id)
        fetch(`/playlists/${e.target.selections.value}/songs`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                song_id: song.id,
                rating: "0"
            }),
        })
            .then(r => r.json())
            .then(data => {
                //console.log(data)
                alert("Song added to playlist!")
            })

    }

    function handleSearchSubmit(e) {
        e.preventDefault();
        setSearchWiped(false)
        if(formData.searchBox ===  "") {
            alert("Please enter a search term.")
            return;
        }
        // fetch API to search for the data based on the search term and selected option
        if (formData.options === "artist") {
            setResults(allArtists.filter(artist => artist.username.toLowerCase().includes(formData.searchBox.toLowerCase())))
        }
        else if (formData.options === "song") {
            setResults(allSongs.filter(song => song.title.toLowerCase().includes(formData.searchBox.toLowerCase())))
            
        }
        else if (formData.options === "playlist") {
            setResults(allPlaylists.filter(playlist => playlist.name.toLowerCase().includes(formData.searchBox.toLowerCase())  || playlist.genre.toLowerCase().includes(formData.searchBox.toLowerCase())))
        }
    }

    function formatDuration(duration) {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    if(user.id !== '')
    {
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
                {searchLabel.includes('Artist') && !isSearchWiped ?
                <div className="ResultsDiv">
                    { searchResults.length > 0 ?
                        searchResults.map(artist => (
                            <h2 key={artist.id}>
                                <Link to={`/artist/${artist.id}`}>{artist.username}</Link>
                            </h2>
                        ))
                        :
                        <h2>No artists found.</h2>
                    }
                </div>
                :
                <>
                </>
                }
                {searchLabel.includes('Song') && !isSearchWiped ?
                <div className="ResultsDiv">
                    <h2>Results</h2>
                    {searchResults.length > 0 ?
                        searchResults.map(song => (
                            <div key={song.id}>
                                <p>{song.title} by <Link to={`/artist/${song.artist.id}`}>{song.artist.username}</Link> - {formatDuration(song.duration)}</p>
                                {userPlaylists.length > 0 ?
                                    <form onSubmit={(e) => handleAddToPlaylist(song, e)}>
                                        <select name="selections">
                                            {userPlaylistOptions}
                                        </select>
                                        <button type="submit">Add To Playlist</button>
                                    </form>
                                : <></>}
                            </div>
                        ))
                        :
                        <h2>No songs found.</h2>
                    }
                </div>
                :
                <></>
                }
                {searchLabel.includes('Playlist') && !isSearchWiped ?
                <div>
                    <h2>Results</h2>
                    { searchResults.length > 0 ?
                        searchResults.map(playlist => (
                            <h2 key={playlist.id}>
                                <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
                            </h2>
                        ))
                        :
                        <h2>No playlists found.</h2>
                    }
                </div>
                :
                <></>
                }
            </div>
        );
    }
    else {
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
                        <input type="text" id="searchBox" name="searchBox" onChange={handleChange} />
                        <button type="submit">Search</button>
                    </form>
                </span>
                {searchLabel.includes('Artist') && !isSearchWiped ?
                    <div className="ResultsDiv">
                        <h2>Results</h2>
                        { searchResults.length > 0 ?
                            searchResults.map(artist => (
                                <h2 key={artist.id}>
                                    <Link to={`/artist/${artist.id}`}>{artist.username}</Link>
                                </h2>
                            ))
                            :
                            <h2>No artists found.</h2>
                        }
                    </div>
                    :
                    <>
                    </>
                }
                {searchLabel.includes('Song') && !isSearchWiped ?
                    <div className="ResultsDiv">
                        <h2>Results</h2>
                        { searchResults.length > 0 ?
                            searchResults.map(song => (
                                <div key={song.id}>
                                    <p>{song.title} by <Link to={`/artist/${song.artist.id}`}>{song.artist.username}</Link> - {formatDuration(song.duration)}</p>
                                </div>
                            ))
                            :
                            <h2>No songs found.</h2>
                        }
                    </div>
                    :
                    <></>
                }
                {searchLabel.includes('Playlist') && !isSearchWiped ?
                    <div className="ResultsDiv">
                        <h2>Results</h2>
                        {  searchResults.length > 0 ?
                            searchResults.map(playlist => (
                                <h2 key={playlist.id}>
                                    <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
                                </h2>
                            ))
                            :
                            <h2>No playlists found.</h2>
                        }
                    </div>
                    :
                    <></>
                }
            </div>
        );
    }
}

export default Search;