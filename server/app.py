#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, jsonify, request, make_response, session
from flask_migrate import Migrate
from flask_restful import Api, Resource

# Local imports
from config import app, db, api
# Add your model imports

from models import db, Artist, Artist, Song, Playlist, PlaylistSong

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
            username=form_data['username'],
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

api.add_resource(Artists, '/artists')

class ArtistByID(Resource):
    def get(self, id):
        artist = Artist.query.filter(Artist.id == id).first()
        response_dict = artist.to_dict()
        response = make_response(response_dict,200)

        return response
    
    def patch(self, id):
        artist = Artist.query.filter(Artist.id == id).first()
        data = request.get_json()

        for attr in data:
            setattr(artist, attr, data[attr])

        db.session.add(artist)
        db.session.commit()

        response_dict = artist.to_dict()

        response = make_response(response_dict, 200)

        return response
    
    def delete(self, id):
        artist = Artist.query.filter(Artist.id == id).first()
        db.session.delete(artist)
        db.session.commit()

        response = make_response('',204)

        return response

api.add_resource(ArtistByID, '/artists/<int:id>')

class Songs(Resource):
    def get(self):
        response_dict_list = [n.to_dict() for n in Song.query.all()]

        response = make_response(response_dict_list, 200)

        return response


api.add_resource(Songs, '/songs')

class ArtistSong(Resource):
    def get(self, artist_id):
        songs = Song.query.filter(Song.artist_id == artist_id).all()
        response_dict_list = [n.to_dict() for n in songs]
        response = make_response(response_dict_list, 200)
        return response
    
    def post(self, artist_id):
        form_data = request.get_json()
        new_song = Song(
            title=form_data['title'],
            duration=form_data['duration'],
            artist_id=artist_id
        )

        db.session.add(new_song)
        db.session.commit()

        response_dict =  new_song.to_dict()

        response = make_response(response_dict, 201)
        
        return response

api.add_resource(ArtistSong, '/artists/<int:artist_id>/songs')


class SongByID(Resource):
    def get(self, id):
        song = Song.query.filter(Song.id == id).first()

        response_dict = song.to_dict()

        response = make_response(response_dict, 200)
        return response
    
    def patch(self, id):
        song = Song.query.filter(Song.id == id).first()
        data = request.get_json()

        for attr in data:
            setattr(song, attr, data[attr])

        db.session.add(song)
        db.session.commit()

        response_dict = song.to_dict()

        response = make_response(response_dict, 200)
        return response
    
    def delete(self, id):
        song = Song.query.filter(Song.id == id).first()
        db.session.delete(song)
        db.session.commit()

        response = make_response('', 204)
        return response

api.add_resource(SongByID, '/songs/<int:id>')

class Playlists(Resource):
    def get(self):
        response_dict_list = [n.to_dict() for n in Playlist.query.all()]

        response = make_response(response_dict_list, 200)

        return response

    def post(self):
        form_data = request.get_json()
        new_song = Playlist(
            title=form_data['title'],
            duration=form_data['duration'],
            artist_id=form_data['artist_id']
        )

        db.session.add(new_song)
        db.session.commit()

        response_dict =  new_song.to_dict()

        response = make_response(response_dict, 201)
        
        return response
    

api.add_resource(Playlists, '/playlists')

class ArtistPlaylist(Resource):
    def get(self, artist_id):
        playlists = Playlist.query.filter(Playlist.artist_id == artist_id).all()
        response_dict_list = [n.to_dict() for n in playlists]
        response = make_response(response_dict_list, 200)
        return response
    
    def post(self, artist_id):
        form_data = request.get_json()
        new_playlist = Playlist(
            name=form_data['name'],
            artist_id=artist_id
        )

        db.session.add(new_playlist)
        db.session.commit()

        response_dict =  new_playlist.to_dict()

        response = make_response(response_dict, 201)
        
        return response

api.add_resource(ArtistPlaylist, '/artists/<int:artist_id>/playlists')


class PlaylistByID(Resource):
    def get(self, id):
        playlist = Playlist.query.filter(Playlist.id == id).first()

        response_dict = playlist.to_dict()

        response = make_response(response_dict, 200)
        return response
    
    def patch(self, id):
        playlist = Playlist.query.filter(Playlist.id == id).first()
        data = request.get_json()

        for attr in data:
            setattr(playlist, attr, data[attr])

        db.session.add(playlist)
        db.session.commit()

        response_dict = playlist.to_dict()

        response = make_response(response_dict, 200)
        return response
    
    def delete(self, id):
        playlist = Playlist.query.filter(Playlist.id == id).first()
        db.session.delete(playlist)
        db.session.commit()

        response = make_response('', 204)
        return response

api.add_resource(PlaylistByID, '/playlists/<int:id>')

class PlaylistSongs(Resource):
    def get(self, id):
        songs = PlaylistSong.query.filter(PlaylistSong.playlist_id == id).all()
        response_dict_list = [n.to_dict() for n in songs]
        response = make_response(response_dict_list, 200)
        return response
    
    def post(self, id):
        form_data = request.get_json()
        new_playlist_song = PlaylistSong(
            song_id=form_data['song_id'],
            playlist_id=id,
            rating=form_data['rating']
        )

        db.session.add(new_playlist_song)
        db.session.commit()

        response_dict =  new_playlist_song.to_dict()

        response = make_response(response_dict, 201)
        
        return response
    
    def patch(self, id):
        playlist_song = PlaylistSong.query.filter(PlaylistSong.id == id).first()
        data = request.get_json()

        for attr in data:
            setattr(playlist_song, attr, data[attr])

        db.session.add(playlist_song)
        db.session.commit()

        response_dict = playlist_song.to_dict()

        response = make_response(response_dict, 200)
        return response

api.add_resource(PlaylistSongs, '/playlists/<int:id>/songs')

class  PlaylistSongById(Resource):
    def delete(self, id):
        playlist_song = PlaylistSong.query.filter(PlaylistSong.id == id).first()
        db.session.delete(playlist_song)
        db.session.commit()

        response = make_response('', 204)
        return response
    
api.add_resource(PlaylistSongById, '/playlistsongs/<int:id>')

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
        artist.image_url = None
        artist.biography = None
        try:
            db.session.add(artist)
            db.session.commit()
            #session['artist_id'] = artist.id
            return artist.to_dict(), 201
        except Exception as err:
            session.rollback()
            if "UNIQUE constraint failed: user.user" in str(err):
                return {'error': 'Username already exists'}, 422
            elif "UNIQUE constraint failed: user.email" in str(err):
                return {'error': 'Email already exists'}, 422

class CheckSession(Resource):
    def get(self):
        
        #artist_id = session['artist_id']
        artist = Artist.query.filter(Artist.id == session['artist_id']).first()
        if artist:
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