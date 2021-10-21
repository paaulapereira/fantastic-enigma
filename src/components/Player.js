import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faForward,
  faBackward,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  setSongInfo,
  songInfo,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  const activeLibraryHandler = (nextPrev) => {
    //add active state
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
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
  };
  //events
  const playSongHandler = () => {
    //si esta sonando y hacen click al boton, se hace pause, sino se toca la cancion
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying); //cambia el valor al opuesto de lo que estaba
    }
  };

  const getTime = (time) => {
    return (
      //conseguimos los minutos y los segundos despues
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2) //slice es una funcion que formata bien el numero
    );
  };
  const dragHandler = (e) => {
    //la e es de eventos
    //cambia el audio para donde se fue arrastrado el evento (del range)
    audioRef.current.currentTime = e.target.value;
    //cambia el state para que se actualice con la informacion anterior y cambie el current time al valor donde fue arrastradi
    setSongInfo({ ...songInfo, currentTime: e.target.value }); //los tres puntos es para mantener la informacion que tenia
  };
  //el async significa que la funcion es asincrona
  //esperamos que se cambien los estados siempre antes de seguir con el await
  //await the setStates
  const skipTrackHandler = async (direction) => {
    //si los ids son iguales significa que estamos en ese id, y se coge el index de esa canción
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      //cambia a la cancion siguiente, y cuando llegan al mismo numero se vuelve al 0
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]); //el await es para que espere que se defina la cancion
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      //si el index actual es -1 (que estamos volviendo de la primera a la ultima cancion), se cambia automaticamente a la ultima cancion
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]); //songs.lenght son 8 pero los arrays empiezan en 7 y la ultima cancion es la 7
        activeLibraryHandler(songs[songs.length - 1]);
        if (isPlaying) audioRef.current.play();
        return;
      } //esa linea es solo si estamos en el medio de las canciones
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };
  //añadir los estilos
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  const linearGrad = {
    background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div style={linearGrad} className="track">
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          size="2x"
          icon={faBackward}
          onClick={() => skipTrackHandler("skip-back")}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faForward}
        />
      </div>
    </div>
  );
};

export default Player;
//OBSERVACIONES DEL RETURN

//onClick={()=>skipTrackHandler(back)} cuando una funcion tiene un parametro, se inicializa sola, pero si la pones como ejecucion de una funcion flacha se espera hasta que se haga click de verdad

//el input range es un input controlado porque esta vinculado a un state
//el icono de pause y play se cambia de acuerdo con el state de isPlaying (con una condicional ternaria)
