import navLogo from '../rilLogo.png';

function NavBar(){
    let f= 0;
    const timeVar = setInterval(TimeDisplay,1000);
    if(f!==0){
        myStopFunction();
    }
   function TimeDisplay(){
        var currentdate = new Date(); 
        f=1;
        var datetime = "Date Time: <br>" + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        document.getElementById("dateTimePara").innerHTML =datetime;
    }
    function myStopFunction() {
        clearInterval(timeVar);
        f=0;
      }

    return(
        <div className="nav-bar">
            <div className='nav-logo'>
                <img src={navLogo} key={navLogo} alt='Logo'/>
            </div>
            <p id='dateTimePara'></p>
        </div>
    )
}

export default NavBar;