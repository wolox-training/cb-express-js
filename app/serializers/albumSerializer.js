exports.albumSerializer = album => ({
  album_id: album.albumId,
  album_name: album.albumName,
  user_id: album.userId
});
