# SoundFound Music Playlists

This project is a full stack application modeling an online music library with user
authentication. In the frontend, Users can sign up and log in to access their profiles,
where they can upload new songs and create new playlists. Users who are not logged in
can view all artists and their playlists. Logging in allows users to add any songs
from other artists. There is a search page that allows users to search for other
artists, songs, and playlists. Logged in users will be able to edit their profiles,
allowing them to change their username, biography, and profile picture. From the Search
page, artist page, and playlist pages, users can add songs to any of their existing
playlists. From the playlist page, users can edit their playlists, allowing them to 
change the name of the playlist and the genre, as well as deleting the playlist.
Users can also remove any songs from an existing playlist.

This project required the front-end to include at least three routes. The NavBar 
includes links to the Home, Search, Artist, and Login pages. the Signup page is
available from the Login page and links to Artist and Playlist pages are also
accessible from the Home, Search, and Artist Pages.

In the back-end, the API allows us to view our models of Artist, Song, Playlists.
This project's requirements were to have at least three models, with two one-to-many
relationships and at least one many-to-many relationships. The relationships modeled 
are that an Artist has many Songs and Playlists, and Songs and Playlists belong to
an Artist. Many Songs can also belong to many Playlists and vice versa. Another 
requirement was to impluement CRUD actions for at least one resource and that is
the Playlist Model, allowing users to Create, Read, Update, and Delete Playlist
objects. Each resource is also able to be created and read.

Since this project is modeling a full-stack application, the server is hosted on the
local machine at port 5555 and the client react app is hosted on the on the local
machine at port 4000.
