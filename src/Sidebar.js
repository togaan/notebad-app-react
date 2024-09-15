import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { faCaretRight, faCaretDown, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import {faFolder } from '@fortawesome/free-regular-svg-icons';

function Sidebar(props) {
  const [desplayAllTasksInSidebar, setDisplayAllTasksInSidebar] = React.useState(() => {
    const restoredAllTasks = localStorage.getItem('restoredAllTasks')
    return restoredAllTasks === 'true'
  })

  React.useEffect(() => {
    localStorage.setItem('restoredAllTasks', desplayAllTasksInSidebar)
  }, [desplayAllTasksInSidebar])


  const showTasks = () => {
    setDisplayAllTasksInSidebar (prev => !prev)
  }
   
  const t = props.t
    return (
      <div className={`sidebar position-relative col-2  shadow-sm text-start pt-3   ${props.direction === 'rtl' ? 'rtl text-end' : 'ltr'} 
        ${props.sidebar ? "d-block" : "d-none"} ${!props.mode && "dark-mode"}`}>
            <FontAwesomeIcon icon={faCircleXmark}
              className='exit-sidebar btn position-absolute end-0 me-1 top-0  fs-4'
              onClick={props.reSetsidebar}
            />
          <div className="container p-2 ps-3 d-flex justify-content-between flex-wrap">
            <div>
              <h4 className={`fs-6 btn text-start ps-2 pe-1 pt-1 pb-1 mb-1 mt-3 ${props.desplayAllNoteInSidebar && "active"}  ${props.direction === 'rtl' ? 'arabic ps-5 pe-0' : ''}`}
                onClick={props.showNotes}>
                <FontAwesomeIcon icon={props.desplayAllNoteInSidebar ? faCaretDown : faCaretRight} className='me-2' />
                <FontAwesomeIcon icon={faFolder} className='me-2 ms-2'/>
                {t("All Notes")}
              </h4>
                <ul className="note-list">
                    {props.noteArray.map((item, index) => (
                       <li
                        className={`btn text-start ps-2 pe-1 pt-0 pb-0 ${props.editIndex === index && "active"}  
                       ${props.desplayAllNoteInSidebar ? "d-block" : "d-none"} ${props.direction === 'rtl' ? 'arabic ps-5 pe-0' : ''}`}
                       key={index}
                       onClick={() => { props.displayNoteToUpdate(index) }}
                    ><FontAwesomeIcon icon={faClipboard} className=" li-icon fs-6 me-2 ms-2"/>
                       {item.noteTitle}
                   </li>
                  ))}
              </ul>
            </div>
        
            <div>
            <h4 className={`fs-6 btn text-start ps-2 pe-1 pt-1 pb-1 mb-1 mt-3 ${desplayAllTasksInSidebar && "active"} 
              ${props.direction === 'rtl' ? 'arabic ps-5 pe-0' : ''}`}
                onClick={showTasks}>
                <FontAwesomeIcon icon={desplayAllTasksInSidebar ? faCaretDown : faCaretRight} className='me-2 ms-1' />
                <FontAwesomeIcon icon={faFolder} className='me-2 ms-2'/>
                {t("All Tasks")}
              </h4>
                <ul className="note-list">
                    {props.taskArray.map((item, index) => (
                       <li
                        className={`btn text-start ps-2 pe-1 pt-0 pb-0 
                                  ${props.editIndex === index && "active"}  
                                  ${desplayAllTasksInSidebar ? "d-block" : "d-none"} 
                                  ${props.direction === 'rtl' ? 'rtl arabic ps-5 pe-0' : 'ltr'}`}
                       key={index}
                       onClick={() => { props.displayTaskToUpdate(index) }}
                   >   <FontAwesomeIcon icon={faClipboard} className=" li-icon fs-6 me-2 ms-2"/>
                       {item.taskValue.split(' ').slice(0, 4).join(' ')} ...
                   </li>
                  ))}
                </ul>
                </div>
            </div>     
        </div>
         
    )
}

export default Sidebar

