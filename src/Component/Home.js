import reportlogo from '../reportLogo.png';
import { Link } from "react-router-dom";
import orderLogo from '../orderLogo.png';

export default function Home(props) {
    document.title="Home - RIL CSO's Reoprting Portal";
        return(
        <div className="HomeBody">
            <h3>Hello {props.udata.uname}</h3>
            <div className="HomeContainer">
                <div> <Link to="/Report"><img src={reportlogo} key={reportlogo} width={100} alt='Report'/></Link></div>
                <div> <Link to="/Order"><img src={orderLogo} key={orderLogo} width={100} alt='Report'/></Link> </div>
            </div>            
        </div>
    )
}