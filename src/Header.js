import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
function Header(props) {

   
    return (
        <nav className={`nav navbar navbar-expand-lg  text-center text-dark shadow-sm position-relative  ${!props.mode && "dark-mode"}`}>
            <div className="container-fluid">
                <FontAwesomeIcon icon={faBars} className="show-sidebar btn fs-2 " onClick={props.toggleSidepar} />
                <h1 className="logo mt-2 fs-3 me-5 start-0 position-absolute position-relative">Notebad</h1>
                <form className="form d-flex w-25 ms-5 position-absolute end-0  rounded-3" role="search" onSubmit={props.handleSearchSubmit}>
                    <button className="btn" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon fs-5 position-absolute" /></button>
                    <input 
                        className="form-control me-2  search text-white ps-5"
                        type="search" placeholder="Search by title"
                        
                        value={props.search}
                        onChange={props.handleSerachChange}
                    ></input>
                    

                    
                   
                </form>
                <div className="mode d-flex align-items-center gap-2" onClick={props.switchMode} >
                    <p className=" fs-5 d-none d-sm-block" >Light</p>
                    <div
                        className="modeIcon rounded-5 position-relative  "
                    >
                        <div className="circle rounded-circle d-block position-absolute"></div>
                    </div>
                    <p className=" fs-5 d-none d-sm-block">Dark</p>
                </div>
            </div>
       </nav> 
    )
}

export default Header                                                                                               