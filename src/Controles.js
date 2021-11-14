export function handleMusic({ canciones, actual, setActual, playing, setPlaying, musica}) {

    function anteriorCancion() {
        if (actual === 0) {
            musica.current.src = `https://assets.breatheco.de/apis/sound/${canciones[canciones.length - 1].url}`;
            musica.current.play();
            setPlaying(true);
            setActual(canciones.length - 1);
        } else {
            musica.current.src = `https://assets.breatheco.de/apis/sound/${canciones[actual - 1].url}`;
            musica.current.play();
            setPlaying(true);
            setActual(actual - 1);
        }
    }
    
    function selectPlay(index) {
        if (actual === index && playing) {
            return;
        }
        musica.current.src = `https://assets.breatheco.de/apis/sound/${canciones[index].url}`;
        musica.current.play();        
        setActual(index);
        setPlaying(true);
    }

    function siguenteCancion(e = null) {
        if (actual === canciones.length - 1) {
            musica.current.src = `https://assets.breatheco.de/apis/sound/${canciones[0].url}`;
            musica.current.play(); 
            setPlaying(true);
            setActual(0);
        } else {
            musica.current.src = `https://assets.breatheco.de/apis/sound/${canciones[actual + 1].url}`;
            musica.current.play();
            setPlaying(true);
            setActual(actual + 1);
        }
    }
    
    function togglePlayPause() {
        if (canciones === null) return;
        setPlaying(!playing);
        if (playing) {
            musica.current.pause(); 
        } else {
            musica.current.play();
        }
    }
    return { selectPlay, siguenteCancion, anteriorCancion, togglePlayPause }
}