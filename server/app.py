#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, jsonify, request, make_response, session
from flask_migrate import Migrate
from flask_restful import Api, Resource

# Local imports
from config import app, db, api
# Add your model imports

from models import db, Artist, Artist, Album, Song, Playlist, PlaylistSong

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

################################################################
class Artists(Resource):
    pass

class ArtistByID(Resource):
    pass

################################################################



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

api.add_resource(Artists, '/artists')
api.add_resource(ArtistByID, '/artists/<int:artist_id>')
api.add_resource(Artists, '/artists')
api.add_resource(ArtistByID, '/artists/<int:artist_id>')
api.add_resource(Albums, '/albums')
api.add_resource(AlbumByID, '/albums/<int:album_id>')
api.add_resource(Songs, '/songs')
api.add_resource(SongByID, '/songs/<int:song_id>')
api.add_resource(Playlists, '/playlists')
api.add_resource(PlaylistByID, '/playlists/<int:playlist_id>')
api.add_resource(PlaylistSongs, '/playlists/<int:playlist_id>/songs')


class Signup(Resource):
    def post(self):
        json = request.get_json()
        if 'artistname' not in json or 'password' not in json or 'image_url' not in json or 'bio' not in json:
            return {'error': 'Missing required fields'}, 422
        artist = Artist(
            artistname=json['artistname']
        )
        artist.password_hash = json['password']
        artist.image_url = json['image_url']
        artist.bio = json['bio']
        db.session.add(artist)
        db.session.commit()
        session['artist_id'] = artist.id
        return artist.to_dict(), 201

class CheckSession(Resource):
    def get(self):
        
        artist_id = session['artist_id']
        if artist_id:
            artist = Artist.query.filter(Artist.id == artist_id).first()
            return artist.to_dict(), 200
        
        return {}, 401

class Login(Resource):
    def post(self):
        artistname = request.get_json()['artistname']
        artist = Artist.query.filter(Artist.artistname == artistname).first()
        if artist:
            password = request.get_json()['password']
            if artist.authenticate(password):
                session['artist_id'] = artist.id
                return artist.to_dict(), 200
        return {'error': 'Invalid artistname or password'}, 401

class Logout(Resource):
    def delete(self):
        if session['artist_id']:
            session['artist_id'] = None
            return {}, 204
        else:
            return {'error': 'Artist is not logged in'}, 401


if __name__ == '__main__':
    app.run(port=5555, debug=True)