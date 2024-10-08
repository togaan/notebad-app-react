import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Note from './Note';
import Task from './Task';

function App() {

  useEffect(() => {
    // Function to store scroll position before unload
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY);
    };

    // Function to restore scroll position after reload
    const restoreScrollPosition = () => {
      const scrollPosition = sessionStorage.getItem('scrollPosition');
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
      }
      // Clear the stored scroll position after restoring it
      sessionStorage.removeItem('scrollPosition');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    restoreScrollPosition();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // switch language
  const { t, i18n } = useTranslation();
  const [direction, setDirection] = React.useState('')

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng); // Save the selected language to local storage
    window.location.reload()
  };
  
   // Check for language in local storage on component mount
   useEffect(() => {
    const userLanguage = localStorage.getItem('language'); // Retrieve the language from local storage
    if (userLanguage) {
      i18n.changeLanguage(userLanguage);
      setDirection(userLanguage === 'ar' ? 'rtl' : 'ltr')  // Set body direction based on stored language
    }
  }, [i18n]);
  
    
  
  
  const [mode, setMode] = React.useState(() => {
    // get mode from localStorge
    const restoredMode = localStorage.getItem('mode')
    return restoredMode === 'true' // converts string to boolean
  })

  // Effect to update local storage whenever isDarkMode changes
  React.useEffect(() => {
    localStorage.setItem('mode', mode);
  }, [mode]);

 
  function switchMode() {
    setMode(prev => !prev)
    localStorage.setItem('mode', mode)
  }

  const [sidebar, setSidebar] = React.useState(() => {
    const restoredActveSidebar = localStorage.getItem('sidebar')
    return restoredActveSidebar === 'true'
  })

  React.useEffect(() => {
    localStorage.setItem('sidebar', sidebar)
  }, [sidebar])

  
  function toggleSidepar() {
    setSidebar(prev => !prev)
  }
  
  // Create a state variable to hold the value of the textarea
  const [formNoteData, setformNoteData] = React.useState({
    noteTitle: '',
    noteText: ''
  });
  
  // State to track which note is being edited
  const [editIndex, setEditIndex] = React.useState(null);

  // function to load existing data from localstorge.
  const loadNote = () => {
    const note = localStorage.getItem('note');
    return note ? JSON.parse(note) : [];
  }
  
  
  // function to handle tha data that comes from the textaraea
  function handleNoteTextChange(event) {
    setformNoteData({...formNoteData, noteText : event.target.value})
  }

  // function to handle tha data that comes from the title input
  function handleNoteTitleChange(event) {
    setformNoteData({...formNoteData, noteTitle : event.target.value})
  }

  // create state array to store data that comes from localStorge
  const [noteArray, setNoteArray] = React.useState(loadNote())
  
  
  
  //  handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Create a new object to add to the array
    const newNote = { ...formNoteData, noteTime: Date.now() };

    // check if the edit index has a value. this value represents the index of the note we want to update  ?
    if (editIndex !== null) {
      // we create a new array to store all notes from noteArray except the not that its index equal to editindex 
      // because if there is a note its index equal to editIndex it means this is the note we want to update
      // so we will not take this note from noteArray. we take the newNote Instead and store it in the new array
      // since the newNote represents the updatedNote 
      const updatedNotes = noteArray.map((note, index) =>
        index === editIndex ? newNote : note
      );
      
      // Update localStorage
      localStorage.setItem('note', JSON.stringify(updatedNotes));

      // Update the state
      setNoteArray(updatedNotes);

      // Clear the form and reset editIndex
      setTimeout(() => {
        setEditIndex(null);
      }, 2000)
      
      //Clear the form
      setformNoteData({ noteTitle: '', noteText: '' });
      window.location.reload()
    } else {
      // Add the new object to the existing array
      const updatedNoteArray = [...noteArray, newNote]
      
      // Update localStorage
      localStorage.setItem('note', JSON.stringify(updatedNoteArray));

      // Update the state
      setNoteArray(updatedNoteArray);
      window.location.reload()
    } 
  };
  

  // alert to confirm delete
  const [alertConfirmDeleteNote, setAlertConfirmDeleteNote] = React.useState(false);
  // function to delete note
  function handleDeleteNote() {
    setAlertConfirmDeleteNote(true)
  }
  
  // create a state for search value
  const [search, setSearch] = React.useState('')
  const [noResult, setNoResult] = React.useState(false)
  
  // function to handle search change
  function handleSerachChange(event) {
    setSearch(event.target.value)
    setNoResult(false)
    
  }
  
  // function to handle search submission
  function handleSearchSubmit(event) {
    event.preventDefault();
    const existsNote = noteArray.some(item => item.noteTitle.toLowerCase().trim().replace(/\s+/g, '') === search.toLowerCase().trim().replace(/\s+/g, ''))
    if (existsNote) {
      const searchedNoteIndex = noteArray.findIndex(item => item.noteTitle.toLowerCase().trim().replace(/\s+/g, '') === search.toLowerCase().trim().replace(/\s+/g, ''))
      setEditIndex(searchedNoteIndex);
      setformNoteData({
        ...formNoteData,
        noteText: noteArray[searchedNoteIndex].noteText,
        noteTitle : noteArray[searchedNoteIndex].noteTitle
      })  
    } else if (!existsNote || search === '') {
      setNoResult(true)
    } 
  }
   
  const [desplayAllNoteInSidebar, setDesplayAllNoteInSidebar] =React.useState(true)

  function showNotes() {
    setDesplayAllNoteInSidebar(prev => !prev)
  }
  
  function goBag() {
    // Clear the form
    setformNoteData({ noteTitle: '', noteText: '' });
     // Clear the form and reset editIndex
    setEditIndex(null);
  }

  // function to load existing data from localstorge.
  const loadTask = () => {
    const task = localStorage.getItem('task')
    return task ? JSON.parse(task) : [];
}

  // array to store data the was poaded from local storge
  const [taskArray, setTaskArray] = React.useState(loadTask) 
 
 
   
  // State to track which task is being edited
  const [editTaskIndexFromSidebar, setEditTaskIndex] = React.useState(null);





  return (
    <div className={`App ${!mode && "dark-mode"}`}>
      <Header
        switchMode={switchMode}
        toggleSidepar={toggleSidepar}
        mode={mode}
        handleSerachChange={handleSerachChange}
        handleSearchSubmit={handleSearchSubmit}
        searchValue={search}
        noResult={noResult}
        changeLanguage={changeLanguage}
        t={t}
        direction={direction}
      />
        

      <div className='body '>
        <div className='container-fluid'>
          <div className='row'>
            
            <Sidebar
              t={t}
              direction={direction}
              displayNoteToUpdate={(index) => {
                if (noteArray.length > 0) {
                  setEditIndex(index);
                  setformNoteData({
                    ...formNoteData,
                    noteText: noteArray[index].noteText,
                    noteTitle: noteArray[index].noteTitle
                  })
                }
              }}
              desplayAllNoteInSidebar={desplayAllNoteInSidebar}
              editIndex={editIndex}
              sidebar={sidebar}
              reSetsidebar={() => { setSidebar(prev => !prev) }}
              showNotes={showNotes}
              noteArray={noteArray}
              mode={mode}
              taskArray={taskArray}
              displayTaskToUpdate={(index) => {
                setEditTaskIndex(index)
              } }
                  
            />  
            <Note
              t={t}
              direction={direction}
              handleNoteTextChange={handleNoteTextChange}
              handleNoteTitleChange={handleNoteTitleChange}
              text={formNoteData.noteText}
              title={formNoteData.noteTitle}
              handleSubmit={handleSubmit}
              mode={mode}
              sidebar={sidebar}
              editIndex={editIndex}
              handleDeleteNote={handleDeleteNote}
              noteArray={noteArray}
              goBag={goBag}
              displayNoteFromSlide={(currentSlide) => {
                setEditIndex(currentSlide)
                setformNoteData({
                  ...formNoteData,
                  noteText: noteArray[currentSlide].noteText,
                  noteTitle : noteArray[currentSlide].noteTitle
                })      
              }}
              
              alertConfirmDeleteNote={alertConfirmDeleteNote}
              noDelete={() => {setAlertConfirmDeleteNote(false)}}
              confirmDelete={() => {
                // we create a new array to store all notes excpt the note we want to delete which its index is equal to editIndex
                // to acomplish that we use the filter function 
                const noteArrayWthoutTheDeletedNote = noteArray.filter((item, index) => index !== editIndex)
                // Update localStorage
                localStorage.setItem('note', JSON.stringify(noteArrayWthoutTheDeletedNote));
                // Update the state
                setNoteArray(noteArrayWthoutTheDeletedNote);
                
                // Clear the form
                setformNoteData({ noteTitle: '', noteText: '' });
                // Clear the form and reset editIndex
                setEditIndex(null);
                setAlertConfirmDeleteNote(false)
                window.location.reload()
              }}
            />
            <Task sidebar={sidebar} mode={mode} editTaskIndexFromSidebar={editTaskIndexFromSidebar} t={t} direction={direction} /> 
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
