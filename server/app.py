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
    def get(self):
        response_dict_list = [n.to_dict() for n in Artist.query.all()]

        response = make_response(response_dict_list, 200)

        return response

    def post(self):
        form_data = request.get_json()
        new_artist = Artist(
            name=form_data['name'],
            email=form_data['email'],
            biography=form_data['biography'],
            image_url=form_data['image_url']
        )
        new_artist.password_hash = form_data['password']

        db.session.add(new_artist)
        db.session.commit()

        response_dict =  new_artist.to_dict()

        response = make_response(response_dict, 201)
        
        return response

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
api.add_resource(Albums, '/albums')
api.add_resource(AlbumByID, '/albums/<int:album_id>')
api.add_resource(Songs, '/songs')
api.add_resource(SongByID, '/songs/<int:song_id>')
api.add_resource(Playlists, '/playlists')
api.add_resource(PlaylistByID, '/playlists/<int:playlist_id>')
#api.add_resource(PlaylistSongs, '/playlists/<int:playlist_id>/songs')


class Signup(Resource):
    def post(self):
        json = request.get_json()
        if 'email' not in json or 'username' not in json or 'password' not in json or 'image_url' not in json or 'biography' not in json:
            return {'error': 'Missing required fields'}, 422
        artist = Artist(
            username=json['username'],
            email=json['email']
        )
        artist.password_hash = json['password']
        artist.image_url = ''
        artist.biography = ''
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
        email = request.get_json()['email']
        artist = Artist.query.filter(Artist.email == email).first()
        if artist:
            password = request.get_json()['password']
            if artist.authenticate(password):
                session['artist_id'] = artist.id
                return artist.to_dict(), 200
        return {'error': 'Invalid email or password'}, 401

class Logout(Resource):
    def delete(self):
        if session['artist_id']:
            session['artist_id'] = None
            return {}, 204
        else:
            return {'error': 'Artist is not logged in'}, 401

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)