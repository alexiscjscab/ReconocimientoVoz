import {Fragment, useState, useEffect} from 'react';
import micIconOn from './img/micIcon.png';
import micIconOff from './img/micIconOff.png';
import './App.css';
import {IconButton, Typography} from '@material-ui/core';
import {NeonButton} from './components/StyledComponents.js';
import DisplayNotes from './components/DisplayNotes';
import { makeStyles } from '@material-ui/core/styles';

// Inicializacion del reconocimiento de voz
const SpeechRecognition = 
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

// Configuracion
mic.continuous = true;
mic.interimResults = true;
mic.lang = 'es-AR';



function App() {

  const [isListening, setIslistening] = useState(false);
  const [notes, setNotes] = useState(null);
  
  const [savedNotestodo, setSavedNotestodo] = useState([]);
  const [savedNotesinprocess, setSavedNotesinprocess] = useState([]);
  const [savedNotesdone, setSavedNotesdone] = useState([]);


  const savedNotes = [
    {
      group: 'todo',
      name: savedNotestodo
    },
    {
      group: 'inprocess',
      name: savedNotesinprocess
    },
    {
      group: 'done',
      name: savedNotesdone
    }
  ]
  
  // primer parametro (), segundo array si esta vacio se ejecuta una vez que cargue el componente , si tiene algo se ejectura cada vez que haya un cambio en esa variable :)
  useEffect(() => {
    const handleListen = () => {
      if(isListening){
        mic.start();
  
        // si no esta conectado bien volvemos a comenzar 
        mic.onend = () => {
          console.log('continue...')
          mic.start()
        }
      }else{
        mic.stop();
        mic.onend = () => {
          console.log('Stopped the microphone on Click')
        }
      }
  
      mic.onstart = () =>{
        console.log('Mic is on')
      }
  
      mic.onresult = event => {
        const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
        console.log(transcript)
        
        setNotes(transcript)
        
        mic.onerror = event => {
        console.log(event.error)
        }
      }
    }
    
    handleListen()
  },[isListening])

  //console.log('holaa')
  const classes = useStyles();
  return (
    <Fragment>
      <div className='notes'>
        <h1>Voice Notes</h1>
        <div className='microphone'>
          <IconButton  className={classes.icon} edge='start' label onClick={() => setIslistening((prevState => !prevState))}>
            <img src={isListening ? micIconOn : micIconOff} className='mic-icon' alt='micOff' title='micOff'/>
          </IconButton>
        </div>
        <div className='btn'>
        <NeonButton 
          status='todo' onClick={() =>{
            setSavedNotestodo([...savedNotestodo, notes])
            setNotes(null)  
          }}
          disabled={!notes}
          >To do</NeonButton>

        <NeonButton 
          status='inprocess'
          onClick={() => {
            setSavedNotesinprocess([...savedNotesinprocess, notes])
            setNotes(null)
          }}
          disabled={!notes}
          >In process</NeonButton>
        <NeonButton 
          status='done'
          onClick={() => {
            setSavedNotesdone([...savedNotesdone, notes])
            setNotes(null)
          }}
          disabled={!notes}
        >Done</NeonButton>
        </div>

        <Typography variant='h4' component='h2' gutterBottom>
          {console.log(savedNotes)}
          {notes}
        </Typography>

        <DisplayNotes data={savedNotes}/>
      
      </div>  
    </Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  icon:{
    marginRight: '10px'
  }
  
  
}));

export default App;
