import navLogo from '../rilLogo.png';
import { useState,useEffect } from 'react';

function NavBar(props){

    function getTime(){
        let currentDatetime = new Date();
        let formattedDate = currentDatetime.getDate() + "-" 
            + (parseInt(currentDatetime.getMonth())+1) + "-" 
            + currentDatetime.getFullYear();
        return formattedDate;
    }    
    const [timmer, settimmer] = useState(getTime());
    useEffect(() => {
        setTimeout(() => {
            settimmer(() => getTime());
        }, 1);
      });
    

    return(
        <div className="nav-bar">
            <div className='nav-logo'>
                <img src={navLogo} key={navLogo} alt='Logo'/>
            </div>
            <p id='dateTimePara'>Date : <strong>{timmer}</strong></p>
        </div>
    )
}

export default NavBar;