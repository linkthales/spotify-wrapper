'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _search = require('./search');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _sinonChai = require('sinon-chai');

var _sinonChai2 = _interopRequireDefault(_sinonChai);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_sinonChai2.default);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', function () {
  var fetchedStub = void 0;

  beforeEach(function () {
    fetchedStub = _sinon2.default.stub(global, 'fetch');
    fetchedStub.resolves({ json: function json() {
        return { album: 'name' };
      } });
  });

  afterEach(function () {
    fetchedStub.restore();
  });

  describe('smoke tests', function () {
    it('should exist the search method and be a function', function () {
      _chai.assert.isFunction(_search.search);
    });

    it('should exist the searchAlbums method and be a function', function () {
      _chai.assert.isFunction(_search.searchAlbums);
    });

    it('should exist the searchArtists method and be a function', function () {
      _chai.assert.isFunction(_search.searchArtists);
    });

    it('should exist the searchTracks method and be a function', function () {
      _chai.assert.isFunction(_search.searchTracks);
    });

    it('should exist the searchPlaylists method and be a function', function () {
      _chai.assert.isFunction(_search.searchPlaylists);
    });
  });

  describe('Generic search', function () {
    it('should call fetch function', function () {
      var artists = (0, _search.search)();

      _sinon2.default.assert.calledOnce(fetchedStub);
    });

    it('should receive the correct url to fetch', function () {
      context('passing one type', function () {
        var artists = (0, _search.search)('Incubus', 'artist');

        _sinon2.default.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/search?q=Incubus&type=artist');

        var albums = (0, _search.search)('Incubus', 'album');
        _sinon2.default.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/search?q=Incubus&type=album');
      });

      context('passing more than one type', function () {
        var artistsAndAlbums = (0, _search.search)('Incubus', ['artist', 'album']);

        _sinon2.default.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
      });
    });

    it('should return the JSON Data from the Promise', function () {
      var artists = (0, _search.search)('Incubus', 'artist');

      fetchedStub().then(function (data) {
        _chai.assert.deepEqual(data.json(), { album: 'name' });
      });
    });
  });

  describe('Search artists', function () {
    it('should call fetch function', function () {
      var artists = (0, _search.searchArtists)('Incubus');

      _sinon2.default.assert.calledOnce(fetchedStub);
    });

    it('should call fetch with the corret URL', function () {
      var artists = (0, _search.searchArtists)('Incubus');

      _sinon2.default.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/search?q=Incubus&type=artist');

      var artists2 = (0, _search.searchArtists)('Muse');
      _sinon2.default.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/search?q=Muse&type=artist');
    });
  });

  describe('Search albums', function () {
    it('should call fetch function', function () {
      var albums = (0, _search.searchAlbums)('Incubus');

      _sinon2.default.assert.calledOnce(fetchedStub);
    });

    it('should call fetch with the corret URL', function () {
      var albums = (0, _search.searchAlbums)('Incubus');

      _sinon2.default.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/search?q=Incubus&type=album');

      var albums2 = (0, _search.searchAlbums)('Muse');
      _sinon2.default.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/search?q=Muse&type=album');
    });
  });

  describe('Search tracks', function () {
    it('should call fetch function', function () {
      var tracks = (0, _search.searchTracks)('Incubus');

      _sinon2.default.assert.calledOnce(fetchedStub);
    });

    it('should call fetch with the corret URL', function () {
      var tracks = (0, _search.searchTracks)('Incubus');

      _sinon2.default.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/search?q=Incubus&type=track');

      var tracks2 = (0, _search.searchTracks)('Muse');
      _sinon2.default.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/search?q=Muse&type=track');
    });
  });

  describe('Search playlists', function () {
    it('should call fetch function', function () {
      var playlists = (0, _search.searchPlaylists)('Incubus');

      _sinon2.default.assert.calledOnce(fetchedStub);
    });

    it('should call fetch with the corret URL', function () {
      var playlists = (0, _search.searchPlaylists)('Incubus');

      _sinon2.default.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/search?q=Incubus&type=playlist');

      var playlists2 = (0, _search.searchPlaylists)('Muse');
      _sinon2.default.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/search?q=Muse&type=playlist');
    });
  });
});