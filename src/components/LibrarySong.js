import React from "react";

const LibrarySong = ({
  songs,
  song,
  setCurrentSong,
  id,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song); //asi cambiamos el estado a la cancion que fue clicada
    //add active state
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          //devuelve la cancion entera pero cambia el active a true
          ...song,
          active: true,
        };
      }
      return {
        //devuelve la cancion entera pero cambia el active a false
        ...song,
        active: false,
      };
    });
    //definimos el state para el array que hemos creado con el map
    setSongs(newSongs);
    //check if the song is playing
    if (isPlaying) audioRef.current.play();
  };
  //si la cancion esta active se añade la clase selected y sino no se añade nada
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
