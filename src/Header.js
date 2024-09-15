import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars, faGear, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
function Header(props) {
    const [settings, setSetting] = React.useState(false)
    const handleSettings = () => {
        setSetting(prev => !prev) 
    }
    const t = props.t

    return (
        <nav className={`nav navbar navbar-expand-lg  text-center text-dark shadow-sm position-relative  ${!props.mode && "dark-mode"}`}>
            <div className="container-fluid">
                <FontAwesomeIcon icon={faBars} className="show-sidebar btn fs-2 " onClick={props.toggleSidepar} />
                
                <h1 className="logo mt-2 fs-3 me-5 start-0 position-absolute position-relative">{t('Notebad')}</h1>
                <form className="form d-flex w-25 ms-5 position-absolute end-0  rounded-3" role="search" onSubmit={props.handleSearchSubmit}>
                    <button className="btn" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon fs-5 position-absolute" /></button>
                    <input 
                        className={`form-control me-2  search text-white ps-5 ${props.direction === 'rtl' ?'rtl text-end pe-3 ps-1' : 'ltr'}`}
                        type="search"
                        placeholder={t("Search by title")}
                        value={props.search}
                        onChange={props.handleSerachChange}
                    ></input>
                    {props.noResult && <p className="text-danger position-absolute top-25 mt-2 start-50 ">{t('No results')}</p>}

                    
                   
                </form>
                <div className="settings position-absolute end-0 me-2 mt-1 top-0  z-3  ">
                    <FontAwesomeIcon icon={faGear} className={`fs-4 settings-icon btn mt-1 ${settings && 'go-right'}`} onClick={handleSettings} />
                    {settings && <div className="settings-items shadow-sm p-4 rounded-3 position-relative">
                        <FontAwesomeIcon icon={faCircleXmark}
                            className='exit-sidebar btn position-absolute start-0 ms-1  top-0  fs-4'
                            onClick={handleSettings}
                        />
                        <p className={`the-mode   text-start mt-2 ${props.direction === 'rtl' && 'ms-5'}`}>{props.mode ? t('Switch to dark mode') : t('Switch to light mode')}</p>
                        <div className={`mode d-flex align-items-center gap-2   `} onClick={props.switchMode} >
                            <p className={` mode-type   mt-3 ms-3`} >{props.mode ? t('Light') : t('Dark')}</p>
                            <div
                                className={`modeIcon rounded-5 position-relative ${props.direction === 'rtl' && 'arabic'}`}
                            >
                                <div className="circle rounded-circle d-block position-absolute"></div>
                            </div>
                        </div>
                        <p className={`the-mode  mt-3 fs-5 text-start ${props.direction === 'rtl' ? 'rtl text-end' : 'ltr'}`}>{t('Language')}</p>
                        <div className={`language d-flex flex-column pb-0 `}>
                            <button className={`btn  text-start ms-2 ${props.direction === 'rtl' ? 'rtl text-end' : 'ltr active'}`} onClick={() => props.changeLanguage('en')}>{t('English')}</button>
                            <button className={`btn  text-start ms-2 ${props.direction === 'rtl' ? 'rtl text-end active' : 'ltr'}`} onClick={() => props.changeLanguage('ar')}>{t('Arabic')}</button>
                        </div>
                    </div>} 
                </div>
                
            </div>
       </nav> 
    )
}

export default Header                                                                                               