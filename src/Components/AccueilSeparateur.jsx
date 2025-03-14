import React from 'react'
import '../css/styleSeparateur.css'
import { useNavigate } from 'react-router-dom'


const AccueilDivider = () => {
    const navigate = useNavigate()
    const navigateTo = (route)=>{
        navigate(route);
    }
    return <>
        <div id='divider'> 
            <div className="divider_content">
                <p>
                Découvrez nos irrésistibles variétés de cookies parmi nos best-sellers, nos nouveautés et nos cookies disponibles tout le long de l'année.
                </p>
                <button onClick={() => {navigateTo('/NosCookies')}}>Découvrir nos cookies</button>
            </div>
            <div className="divider-container">
                <div className="divider1"></div>
                <div className="divider2"></div>
            </div>
        </div>

    </>
}

export default AccueilDivider