import React, { useState, useRef, useEffect } from 'react';
import { handleMusic } from './Controles';
import { Fetch } from './Fetch';

export const Contenedor = () => {
    const [actual, setActual] = useState(0);
    const [playing, setPlaying] = useState(false);
    const canciones = Fetch();
    const musica = useRef();
    const { selectPlay, siguenteCancion, anteriorCancion, togglePlayPause } = handleMusic(
          {canciones, actual, setActual, playing, setPlaying, musica}
          );
    useEffect(() => {
        if (canciones) {
            musica.current.src = `https://assets.breatheco.de/apis/sound/${canciones[0].url}`;
        }
    }, [canciones])

    return (
        <div className="container">
            <div className="lista_canciones scroll">
                {canciones && canciones.map((cancion, index) => {
                    return <div key={index} className={"canciones" + (playing && actual === index ? " activo" : "") + (musica.current?.currentTime !== 0 && actual === index && !playing ? " pausa" : "")} onClick={() => selectPlay(index)}>
                        <span className="index_cancion">{index + 1}</span>{cancion.name}
                    </div>
                })
                }</div>
            <footer>                
                <i className="fas fa-step-backward botonera" onClick={() => anteriorCancion()}></i>
                <i className={playing?"fas fa-pause-circle boton_play":"fas fa-play-circle boton_play"} onClick={() => togglePlayPause()}></i>
                <i className="fas fa-step-forward botonera" onClick={siguenteCancion}></i>
                <audio ref={musica} onEnded={() => siguenteCancion()}></audio>
            </footer>
        </div>
    )
}
