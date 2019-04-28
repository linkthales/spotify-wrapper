import { API_URL } from './config';
import { toJSON } from './utils';
const spotifyApiKey = require('../credentials/spotify').apiKey

export const search = (query, type) => fetch(`${API_URL}/search?q=${query}&type=${type}`, {
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + spotifyApiKey,
    'Content-Type': 'application/json'
  }
}).then(toJSON);

export const searchArtists = (query) => search(query, 'artist');

export const searchAlbums = (query) => search(query, 'album');

export const searchTracks = (query) => search(query, 'track');

export const searchPlaylists = (query) => search(query, 'playlist');
