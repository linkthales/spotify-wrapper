import chai, { assert } from 'chai';
import { getAlbum, getAlbums, getAlbumTracks } from './album';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

describe('Album', () => {
  let fetchedStub;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => {
    it('should have getAlbum method', () => {
      assert.isFunction(getAlbum);
    });

    it('should have getAlbums method', () => {
      assert.isFunction(getAlbums);
    });

    it('should have getAlbumTracks method', () => {
      assert.isFunction(getAlbumTracks);
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');

      sinon.assert.calledOnce(fetchedStub);
    });

    it('should call fetch with correct URL', () => {
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');

      sinon.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');

      const album2 = getAlbum('4aawyAB9vmqN3uhgf7FjRGTy');

      sinon.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uhgf7FjRGTy');
    });

    it('should return the JSON Data from the Promise', () => {
      const artists = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');

      fetchedStub().then(data => {
        assert.deepEqual(data.json(), { album: 'name'});
      });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const album = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqfdsfdN3uQ7FjRGTy']);

      sinon.assert.calledOnce(fetchedStub);
    });

    it('should call fetch with correct URL', () => {
      const album = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqfdsfdN3uQ7FjRGTy']);

      sinon.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqfdsfdN3uQ7FjRGTy');
    });

    it('should return the JSON Data from the Promise', () => {
      const artists = getAlbums('4aawyAB9vmqN3uQ7FjRGTy');

      fetchedStub().then(data => {
        assert.deepEqual(data.json(), { album: 'name'});
      });
    });
  });

  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      const album = getAlbumTracks(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqfdsfdN3uQ7FjRGTy']);

      sinon.assert.calledOnce(fetchedStub);
    });

    it('should call fetch with correct URL', () => {
      const album = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');

      sinon.assert.calledWith(fetchedStub, 'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');
    });

    it('should return the JSON Data from the Promise', () => {
      const artists = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');

      fetchedStub().then(data => {
        assert.deepEqual(data.json(), { album: 'name'});
      });
    });
  });
});
