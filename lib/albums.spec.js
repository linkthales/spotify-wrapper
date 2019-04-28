'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _album = require('./album');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _sinonChai = require('sinon-chai');

var _sinonChai2 = _interopRequireDefault(_sinonChai);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_sinonChai2.default);

describe('Album', function () {
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
    it('should have getAlbum method', function () {
      _chai.assert.isFunction(_album.getAlbum);
    });

    it('should have getAlbums method', function () {
      _chai.assert.isFunction(_album.getAlbums);
    });

    it('should have getAlbumTracks method', function () {
      _chai.assert.isFunction(_album.getAlbumTracks);
    });
  });

  describe('getAlbum', function () {
    it('should call fetch method', function () {
      var album = (0, _album.getAlbum)('4aawyAB9vmqN3uQ7FjRGTy');

      _sinon2.default.assert.calledOnce(fetchedStub);
    });

    it('should call fetch with correct URL', function () {
      var album = (0, _album.getAlbum)('4aawyAB9vmqN3uQ7FjRGTy');

      _sinon2.default.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');

      var album2 = (0, _album.getAlbum)('4aawyAB9vmqN3uhgf7FjRGTy');

      _sinon2.default.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uhgf7FjRGTy');
    });

    it('should return the JSON Data from the Promise', function () {
      var artists = (0, _album.getAlbum)('4aawyAB9vmqN3uQ7FjRGTy');

      fetchedStub().then(function (data) {
        _chai.assert.deepEqual(data.json(), { album: 'name' });
      });
    });
  });

  describe('getAlbums', function () {
    it('should call fetch method', function () {
      var album = (0, _album.getAlbums)(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqfdsfdN3uQ7FjRGTy']);

      _sinon2.default.assert.calledOnce(fetchedStub);
    });

    it('should call fetch with correct URL', function () {
      var album = (0, _album.getAlbums)(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqfdsfdN3uQ7FjRGTy']);

      _sinon2.default.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqfdsfdN3uQ7FjRGTy');
    });

    it('should return the JSON Data from the Promise', function () {
      var artists = (0, _album.getAlbums)('4aawyAB9vmqN3uQ7FjRGTy');

      fetchedStub().then(function (data) {
        _chai.assert.deepEqual(data.json(), { album: 'name' });
      });
    });
  });

  describe('getAlbumTracks', function () {
    it('should call fetch method', function () {
      var album = (0, _album.getAlbumTracks)(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqfdsfdN3uQ7FjRGTy']);

      _sinon2.default.assert.calledOnce(fetchedStub);
    });

    it('should call fetch with correct URL', function () {
      var album = (0, _album.getAlbumTracks)('4aawyAB9vmqN3uQ7FjRGTy');

      _sinon2.default.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');
    });

    it('should return the JSON Data from the Promise', function () {
      var artists = (0, _album.getAlbumTracks)('4aawyAB9vmqN3uQ7FjRGTy');

      fetchedStub().then(function (data) {
        _chai.assert.deepEqual(data.json(), { album: 'name' });
      });
    });
  });
});