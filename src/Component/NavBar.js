import navLogo from '../rilLogo.png';

function NavBar(){
    var currentdate = new Date();
    var datetime = "Date : " + parseInt(currentdate.getDate()) + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear();
                document.getElementById("dateTimePara").innerHTML =datetime;

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