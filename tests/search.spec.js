import chai, { assert } from 'chai';
import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../lib/search';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
global.fetch = require('node-fetch');
describe('Spotify Wrapper', () => {
  let fetchedStub;
  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({
      json: () => ({
        album: 'name'
      })
    });
  });
  afterEach(() => {
    fetchedStub.restore();
  });
  describe('smoke tests', () => {
    it('should exist the search method and be a function', () => {
      assert.isFunction(search);
    });
    it('should exist the searchAlbums method and be a function', () => {
      assert.isFunction(searchAlbums);
    });
    it('should exist the searchArtists method and be a function', () => {
      assert.isFunction(searchArtists);
    });
    it('should exist the searchTracks method and be a function', () => {
      assert.isFunction(searchTracks);
    });
    it('should exist the searchPlaylists method and be a function', () => {
      assert.isFunction(searchPlaylists);
    });
  });
  describe('Generic search', () => {
    it('should call fetch function', () => {
      const artists = search();
      sinon.assert.calledOnce(fetchedStub);
    });
    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const artists = search('Incubus', 'artist');
        sinon.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/search?q=Incubus&type=artist');
        const albums = search('Incubus', 'album');
        sinon.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/search?q=Incubus&type=album');
      });
      context('passing more than one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album']);
        sinon.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
      });
    });
    it('should return the JSON Data from the Promise', () => {
      const artists = search('Incubus', 'artist');
      fetchedStub().then(data => {
        assert.deepEqual(data.json(), {
          album: 'name'
        });
      });
    });
  });
  describe('Search artists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Incubus');
      sinon.assert.calledOnce(fetchedStub);
    });
    it('should call fetch with the corret URL', () => {
      const artists = searchArtists('Incubus');
      sinon.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/search?q=Incubus&type=artist');
      const artists2 = searchArtists('Muse');
      sinon.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/search?q=Muse&type=artist');
    });
  });
  describe('Search albums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('Incubus');
      sinon.assert.calledOnce(fetchedStub);
    });
    it('should call fetch with the corret URL', () => {
      const albums = searchAlbums('Incubus');
      sinon.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/search?q=Incubus&type=album');
      const albums2 = searchAlbums('Muse');
      sinon.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/search?q=Muse&type=album');
    });
  });
  describe('Search tracks', () => {
    it('should call fetch function', () => {
      const tracks = searchTracks('Incubus');
      sinon.assert.calledOnce(fetchedStub);
    });
    it('should call fetch with the corret URL', () => {
      const tracks = searchTracks('Incubus');
      sinon.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/search?q=Incubus&type=track');
      const tracks2 = searchTracks('Muse');
      sinon.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/search?q=Muse&type=track');
    });
  });
  describe('Search playlists', () => {
    it('should call fetch function', () => {
      const playlists = searchPlaylists('Incubus');
      sinon.assert.calledOnce(fetchedStub);
    });
    it('should call fetch with the corret URL', () => {
      const playlists = searchPlaylists('Incubus');
      sinon.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/search?q=Incubus&type=playlist');
      const playlists2 = searchPlaylists('Muse');
      sinon.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/search?q=Muse&type=playlist');
    });
  });
});
