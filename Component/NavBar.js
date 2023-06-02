import navLogo from '../rilLogo.png';

function NavBar(){
    return(
        <div className="nav-bar">
            <div className='nav-logo'>
                <img src={navLogo} alt='Logo'/>
            </div>
        </div>
    )
}

export default NavBar;