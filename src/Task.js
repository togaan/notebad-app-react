import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft, faSquareCheck, faTrashCan, faCirclePlus, faRotate, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function Task(props) {
    
    // state to handle the value of textarea for each task 
    const [formTaskeData, setformTaskeData] = React.useState({ taskValue: '' });
    
    // State to track which note is being edited
    const [editTaskIndex, setEditTaskIndex] = React.useState(null);
    
    // handle textarea on change
    const handleTaskChange = (event) => {
        setformTaskeData({...formTaskeData, taskValue: event.target.value})
    }
    
    // function to load existing data from localstorge.
    const loadTask = () => {
        const task = localStorage.getItem('task')
        return task ? JSON.parse(task) : [];
    }
    
    // array to store data the was poaded from local storge
    const [taskArray, setTaskArray] = React.useState(loadTask()) 

    // allCompletedTasks
    const [allCompletedTasks, setAllCompletedTasks] = React.useState()
    React.useEffect(() => {
        const completedTasksArray = taskArray.filter(item => item.isCompleted === true)
        setAllCompletedTasks(completedTasksArray.length)
    }, [taskArray])
    
    // handle task submision
    const handleTaskSubmit = (event) => {
        event.preventDefault();

        // Create a new object to add to the array
        const newTask = { ...formTaskeData, taskTime: Date.now(), isCompleted: false};

        // check if the edit index has a value. this value represents the index of the task we want to update
        if (editTaskIndex !== null) {
            // we create a new array to store all tasks from taskArray except the task that its index equal to editTaskindex 
            // because if there is a task its index equal to editTaskindex it means this is the task we want to update
            // so we will not take this task from taskArray. we take the newTask Instead and store it in the new array
            // since the newTask represents the updatedTask 
            const updatedTasks = taskArray.map((task, index) =>
                index === editTaskIndex ? newTask : task
            );

            // Update localStorage
            localStorage.setItem('task', JSON.stringify(updatedTasks));

            // Update the state
            setTaskArray(updatedTasks);

            // Clear the form and reset editIndex
            setTimeout(() => {
                setEditTaskIndex(null);
            }, 2000)

            //Clear the form
            setformTaskeData({ taskValue: '' });
            window.location.reload()
        } else {
            // Add the new object to the existing array
            const updatedTaskArray = [...taskArray, newTask]
            
            // Update localStorage
            localStorage.setItem('task', JSON.stringify(updatedTaskArray));

            // Update the state
            setTaskArray(updatedTaskArray);  
            window.location.reload()
        }
    }

    // handle delete task
     // alert to confirm delete
    const [alertConfirmDeleteTask, setAlertConfirmDeleteTask] = React.useState(false);
    const [confirmDeleteAllTasks, setConfirmDeleteAllTasks] = React.useState(false);
    const handleDeleteTask = () => {
        setAlertConfirmDeleteTask(true)  
    }


    const goBag = () => {
        setformTaskeData({ taskValue: '' });
        setEditTaskIndex(null);
    }

    const [rotated, setRotated] = React.useState(false)
    const rotate = () => {
        setRotated(prev => !prev)
        setTimeout(() => {
            setRotated(prev => !prev) 
          }, 5000); 
    }
    

    // state to set all tasks completed state
    const [allObjectsState, setAllObjectsState] = React.useState(() => {
        const restoredState = localStorage.getItem('allCompleted')
        return restoredState === 'true'
    })
    
    React.useEffect(() => {
        localStorage.setItem('allCompleted', allObjectsState)
    }, [allObjectsState])
    

    // display task to update when clicked from sidebar
    React.useEffect(() => {
        if (props.editTaskIndexFromSidebar !== null) {
            setEditTaskIndex(props.editTaskIndexFromSidebar)
            setformTaskeData({ ...formTaskeData, taskValue: taskArray[props.editTaskIndexFromSidebar].taskValue })
        }
    }, [props.editTaskIndexFromSidebar])
    
     // set opacity for alert
  const [opacity, setOpacity] = React.useState(0);
  React.useEffect(() => {
    if (alertConfirmDeleteTask) {
      setTimeout(() => {
        setOpacity(1) 
      }, 1000); 
    }
  }, [alertConfirmDeleteTask])
   

    // handle task date
    const taskDateStart = (timestamp) => {
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

        return ` ${years}-${months}-${days} ${hoursOn12}:${minutes}:${seconds} ${ampm}`
    }

    
    
    
    
    const taskDateFinsh = (timestamp) => {
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

        return `${years}-${months}-${days} ${hoursOn12}:${minutes}:${seconds} ${ampm}`
    }

   //updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;

    
    return (
        <div className={`task ${!props.mode && "dark-mode"} col-12 col-sm-11  col-md-12  col-lg-4 position-relative
        ${!props.sidebar && "col-lg-5 "} ${props.sidebar && "col-lg-5 "}  mt-5 mt-sm-5 mt-md-5 mt-lg-0 mb-5 rounded-3 p-3  pt-0`}>

            <form onSubmit={handleTaskSubmit} className=" form p-4 pt-2 pb-3 rounded-3">
                <div className="mb-1">
                    <div className="note-icons float-start ">
                        <FontAwesomeIcon icon={faCircleLeft} className={`go-bag  ms-3 fs-3 btn `} onClick={goBag} />
                        <button type="submit" className={`btn add-note  fw-bold ${formTaskeData.taskValue === '' && "pe-none"}`}>
                            <FontAwesomeIcon icon={editTaskIndex !== null ? faRotate : faCirclePlus}
                                className={`fs-3 ${rotated && "rotated"}`} onClick={rotate}/>
                        </button> 
                        {editTaskIndex !== null && <FontAwesomeIcon icon={faTrashCan}
                            className="delete-note btn fs-3"
                            onClick={handleDeleteTask}
                        />}
                    </div>
                    <label htmlFor="exampleInputEmail1" className="form-label note-label fs-3 fw-bold float-end pe-3">Tasks</label>
                    <textarea
                        id="exampleInputEmail1"
                        type="text"
                        value={formTaskeData.taskValue || ''}
                        className="form-control   bg-gradien shadow-sm fs-6" 
                        placeholder="Write your task"
                        onChange={handleTaskChange}
                    ></textarea>
                </div> 
            </form>

            {/* start display all tasks */}
            <div className="all-tasks  rounded-3 pt-3   d-flex align-items-center flex-column gap-5 justify-content-start">
                {taskArray.map((item, index) => (
                    <div className={`task-item p-2 position-relative rounded-3 `} key={index} style={{  backgroundColor: `` }}>
                        <pre className={`task-text  text-start opacity-100 ps-3 ${item.isCompleted && "completed"}`} > 
                            <code>{item.taskValue}</code></pre>
                        <div className="task-icons  d-flex align-items-center flex-column gap-0 justify-content-center 
                                        position-absolute end-0 top-0  me-1 ">
                            <FontAwesomeIcon icon={faSquareCheck} className={`check-icon fs-5 btn ${item.isCompleted && "green"}`}
                                onClick={() => {
                                    const updatedTasks = [...taskArray];
                                    updatedTasks[index] = {
                                        ...updatedTasks[index],
                                        isCompleted: !updatedTasks[index].isCompleted,
                                        finshed: taskDateFinsh(Date.now())
                                    };     
                                    setTaskArray(updatedTasks);
                                    localStorage.setItem('task', JSON.stringify(updatedTasks))                                           
                                 }}
                            />

                            <FontAwesomeIcon icon={faPenToSquare} className={` ediet-task fs-5 btn ${editTaskIndex === index && "edit"}`}
                                onClick={() => {
                                    setEditTaskIndex(index)
                                    setformTaskeData({ ...formTaskeData, taskValue: taskArray[index].taskValue })
                                }} />
                            
                            <FontAwesomeIcon icon={faTrashCan} className="fs-5 btn delet-task"
                                onClick={() => {
                                    setAlertConfirmDeleteTask(true)
                                    setEditTaskIndex(index)
                                }} />
                            
                        </div>
                        <div className="task-date position-absolute  top-100 start-0 ms-4 d-flex justify-content-between flex-wrap">
                            <p className="m-0"> Started in: {taskDateStart(item.taskTime)}</p>
                            {item.isCompleted && <p className="finshedTaskDate m-0">Finshed in: {taskArray[index].finshed}</p>}
                        </div>
                    </div>
                ))}
            </div>
            <div className="task-info d-float">
                <p className=" d-flex align-items-center float-start mt-2 ms-5"><span className="  me-1 fs-6 text-success">{allCompletedTasks}</span>
                    {allCompletedTasks <= 1 ? 'Task' : 'Tasks'} completed from
                    <span className=" ms-1 fs-6 ">{taskArray.length}</span>
                </p>

                <div className="info-icons float-end me-5">
                    <FontAwesomeIcon icon={faSquareCheck}
                        className={`check-icon fs-4 btn ${allCompletedTasks === taskArray.length && "green"}`}
                        onClick={() => {
                            const completeAllTasks = [...taskArray];
                            completeAllTasks.map(item => item.isCompleted  = allObjectsState ? true : false  )
                            setTaskArray(completeAllTasks);
                            localStorage.setItem('task', JSON.stringify(completeAllTasks));
                            setAllObjectsState(prev => !prev)
                        }}
                    />

                    <FontAwesomeIcon icon={faTrashCan} className="fs-4 btn delet-task"
                        onClick={() => {
                            setAlertConfirmDeleteTask(true)
                            setConfirmDeleteAllTasks(true)
                            
                        }}
                    />
                </div>
            </div>
            {alertConfirmDeleteTask && <div
                style={{opacity}}
                className=" game container text-center d-flex justify-content-center position-absolute top-0 mt-5">
                { <div className={`alert w-50 alert-warning `} role="alert">
                    <p className="alert-heading fw-bold fs-6 fs-sm-2">Are youe sure you want to delete {confirmDeleteAllTasks ? 'all tasks' : "this task"}?</p>
                    <hr></hr>
                    <div className="d-flex justify-content-between">
                        <button type="button" className="btn btn-info fs-6" onClick={() => {
                            // we create a new array to store all tasks excpt the task we want to delete which its index is equal to editIndex
                            // to acomplish that we use the filter function 
                            const taskArrayWthoutTheDeletedTask = taskArray.filter((item, index) => index !== editTaskIndex)
                            // Update localStorage
                            localStorage.setItem('task', JSON.stringify(taskArrayWthoutTheDeletedTask));
                            // Update the state
                            setTaskArray(taskArrayWthoutTheDeletedTask);  
                            //Clear the form
                            setformTaskeData({ taskValue: '' });
                            setEditTaskIndex(null); 
                            window.location.reload()

                            // delete all tasks
                            if (confirmDeleteAllTasks) {
                                const deleteAllTasks = [...taskArray];
                                deleteAllTasks.length = 0
                                setTaskArray(deleteAllTasks)
                                localStorage.setItem('task', JSON.stringify(deleteAllTasks));
                                window.location.reload()
                            }
                        }}>Delet</button>
                        <button type="button" className="btn btn-info fs-6" onClick={() => {setAlertConfirmDeleteTask(false)}}>Cancel</button>
                    </div>
                </div>}
            </div>}
        </div>
    )
}

export default Task