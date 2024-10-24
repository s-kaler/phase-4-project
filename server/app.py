#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports

from models import db, User, Artist, Album, Song, Playlist, PlaylistSong

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


class Users(Resource):
    pass

class UserByID(Resource):
    pass

class Artists(Resource):
    pass

class ArtistByID(Resource):
    pass

class Albums(Resource):
    pass

class AlbumByID(Resource):
    pass

class Songs(Resource):
    pass

class SongByID(Resource):
    pass

class Playlists(Resource):
    pass

class PlaylistByID(Resource):
    pass

class PlaylistSongs(Resource):
    pass

api.add_resource(Users, '/users')
api.add_resource(UserByID, '/users/<int:user_id>')
api.add_resource(Artists, '/artists')
api.add_resource(ArtistByID, '/artists/<int:artist_id>')
api.add_resource(Albums, '/albums')
api.add_resource(AlbumByID, '/albums/<int:album_id>')
api.add_resource(Songs, '/songs')
api.add_resource(SongByID, '/songs/<int:song_id>')
api.add_resource(Playlists, '/playlists')
api.add_resource(PlaylistByID, '/playlists/<int:playlist_id>')
api.add_resource(PlaylistSongs, '/playlists/<int:playlist_id>/songs')

if __name__ == '__main__':
    app.run(port=5555, debug=True)