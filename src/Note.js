import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft,faCircleRight , faTrashCan, faCirclePlus, faRotate, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function Note(props) {
    
    let notetime;
    
    if (props.editIndex != null) {
        // Get the current timestamp in milliseconds
        const timestamp = props.noteArray[props.editIndex].noteTime

        // Create a new Date object from the timestamp
        const date = new Date(timestamp);

        // Extracting date components
        const years = date.getFullYear(); // Get the year
        const months = date.getMonth() + 1; // Get the month (0-11, thus add 1)
        const days = date.getDate(); // Get the day of the month (1-31)
        const hours = date.getHours(); // Get the hours (0-23)
        const hoursOn12 = date.getHours() % 12; // Get the hours (0-23)
        const minutes = date.getMinutes(); // Get the minutes (0-59)
        const seconds = date.getSeconds(); // Get the seconds (0-59)

            // Display the results
        const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM

        const updatedNoteTime = `Updated in:  ${years}-${months}-${days} ${hoursOn12}:${minutes}:${seconds} ${ampm}`
        notetime = updatedNoteTime
   
    }else {notetime = ''}
    
    // handle slide
    const [currentSlide, setCurrentSlide] = React.useState(0);

     const colors = React.useMemo(() => ['#101824', '#16423C', '#343131', '#3C3D37', '#405D72', '#1A2130'], []);
    const [bgColor, setBgColor] = React.useState(colors[0]);

    React.useEffect(() => {
        if (props.noteArray.length !== 0) {
       
            const interval = setInterval(() => {
                setCurrentSlide(prevCount => (prevCount + 1) % (props.noteArray.length)); // Increment the count and reset to 0 after reaching 5
                setBgColor(prevColor => {
                    const currentIndex = colors.indexOf(prevColor);
                    return colors[(currentIndex + 1) % colors.length];
                });
           
            }, 3000); // Adjust the time for the interval in milliseconds (1000ms = 1s)
        
            // Cleanup function to clear the interval on component unmount
            return () => clearInterval(interval);
        }
      }, [colors, props.noteArray.length]);
    
     
    const [rotated, setRotated] = React.useState(false)
    const rotate = () => {
        setRotated(prev => !prev)
        setTimeout(() => {
            setRotated(prev => !prev) 
          }, 5000); 
    }
    
    // set opacity for alert
  const [opacity, setOpacity] = React.useState(0);
  React.useEffect(() => {
    if (props.alertConfirmDeleteNote) {
      setTimeout(() => {
        setOpacity(1) 
      }, 1000); 
    }
  }, [props.alertConfirmDeleteNote])
    
  const t = props.t
    
    
    return (
        <div className={`note col-12  col-md-12 ${!props.sidebar ? "col-lg-6" : "col-lg-5"}  
        p-3 pt-0  mt-0 rounded-3 position-relative ${!props.mode && "dark-mode"}  `}>
            
            <form onSubmit={props.handleSubmit} className=" form p-4 pt-2 pb-3 rounded-3">
                <div className="mb-3">
                    <div className="note-icons float-start ">
                        <FontAwesomeIcon icon={faCircleLeft} className={`go-bag  ms-3 fs-3 btn `} onClick={props.goBag} />
                        <button type="submit" className={`btn add-note  fw-bold ${props.title === '' && "pe-none"}`}>
                            <FontAwesomeIcon icon={props.editIndex !== null ? faRotate : faCirclePlus}
                                className={`fs-3 ${rotated && "rotated"}`} onClick={rotate}/>
                        </button> 
                        {props.editIndex !== null && <FontAwesomeIcon icon={faTrashCan}
                            className="delete-note btn fs-3"
                            onClick={props.handleDeleteNote}
                        />}
                    </div>
                    <label htmlFor="exampleInputEmail1" className="form-label note-label fs-3 fw-bold float-end pe-3">{t('Notes')}</label>
                    <input
                        className="form-control me-2 mb-3 title text-black outline-info"
                        type="text"
                        placeholder={t("Title")}
                        value={props.title || ''}
                        onChange={props.handleNoteTitleChange}
                    ></input>
                    <textarea
                        id="exampleInputEmail1"
                        type="text"
                        value={props.text || ''}
                        className="form-control note-input " 
                        placeholder={t("Write your note")}
                        onChange={props.handleNoteTextChange}
                    ></textarea>
                    
                </div>
                <p className={` time text-start  ${!props.mode ? " text-white" : "text-black"}`}>{notetime}</p>
            </form>

            {props.noteArray.length !== 0 &&<div className="slide p-3 pt-0 position-relative mt-0 rounded-3">
                <FontAwesomeIcon icon={faCircleLeft}
                    className={`btn left-slide fs-3 position-absolute start-0 ms-0  ms-md-1 ms-lg-4 ${currentSlide === 0 && "pe-none"}`}
                    onClick={() => {setCurrentSlide(prev => prev - 1)}}
                />
                <div
                    className=" d-flex flex-column text-black justify-content-start align-items-center 
                               p-3 pt-2 rounded-4 user-select-none slide-note w-75 h-75 m-auto mt-0 mb-3"
                    style={{
                        backgroundColor: `${bgColor}99`,
                        transition: 'background-color 0.5s ease'
                    }}
                >    
                    <div className="d-float w-75  m-0 m-md-auto mt-0 mb-1">
                        <FontAwesomeIcon icon={faPenToSquare}
                            className="btn float-start edit-slide fs-4 p-0"
                            onClick={() => props.displayNoteFromSlide(currentSlide)}
                        />
                        <h3 className={`text-black user-select-none fs-6  float-end ${props.direction === 'rtl' ? 'rtl text-end' : 'ltr'}`}>
                            {t('Title :')} {props.noteArray[currentSlide].noteTitle}
                        </h3>
                    </div>
                    <pre className={`w-100 h-75 text-start p-2 ${props.direction === 'rtl' ? 'rtl text-end' : 'ltr'}`}
                        style={{ opacity: 1 }}
                    ><code>{props.noteArray[currentSlide].noteText}</code></pre>
                </div>
                 
                
                
                <FontAwesomeIcon icon={faCircleRight}
                    className={`btn right-slide fs-3 position-absolute end-0 me-0 me-md-1 me-lg-4 ${currentSlide === props.noteArray.length - 1 && "pe-none"}`}
                    onClick={() => {setCurrentSlide(prev => prev + 1)}}
                />
                <div className="slide-control d-flex gap-2 justify-content-center">
                    {props.noteArray.slice(0, 5).map((item, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`btn slide-num ${!props.mode ? "btn-light" : "btn-dark"} ${currentSlide === index && "slid-bg"}`}
                            onClick={() => {setCurrentSlide(index)}}
                        >{index + 1}</button> 
                    ))}
                    {currentSlide >= 5 && (
                        <button
                        type="button"
                        className={`btn slide-num slid-bg ${ currentSlide === (props.noteArray.length - 1) && "d-none"}`}
                        onClick={() => {setCurrentSlide(currentSlide)}}
                    >{currentSlide + 1}</button> 
                    )   }
                    {currentSlide >= 5 && (
                        <button
                        type="button"
                        className={`btn slide-num  ${!props.mode ? "btn-light" : "btn-dark"}  ${currentSlide === (props.noteArray.length - 1) && "slid-bg"} `}
                        onClick={() => {setCurrentSlide(currentSlide)}}
                    >{props.noteArray.length}</button> 
                    )}
                </div>
            </div>}

            {props.alertConfirmDeleteNote && <div
                style={{opacity}}
                className=" game container text-center d-flex justify-content-center position-absolute top-0 mt-5">
                { <div className={`alert  alert-warning `} role="alert">
                    <p className="alert-heading fw-bold fs-6 fs-sm-2">Are youe sure you want to delete this note?</p>
                    <hr></hr>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-info fs-6" onClick={props.confirmDelete}>Delet</button>
                        <button type="button" className="btn btn-info fs-6" onClick={props.noDelete}>Cancel</button>
                    </div>
                </div>}
            </div>}
        </div>
    )
}

export default Note