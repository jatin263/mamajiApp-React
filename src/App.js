import './App.css';
import NavBar from './Component/NavBar';
import LoginForm from './Component/LoginForm';
import { useState } from 'react';
import Order from './Component/Order';
import Alerts from './Component/Alerts';
import {
  Routes,
  Route,useNavigate,
} from 'react-router-dom';
import Home from './Component/Home';


function App() {
  const [alerts,setAlert] =  useState(null);
  const [userData,setUserData] = useState(null);
  const navigate = new useNavigate();
  const user = (apiRes,msg,objData)=>{
    if(apiRes===1){
      if(msg==="Success"){
        setUserData({
          uid:objData.id,
          uname:objData.name,
          utown:objData.town
        });
        showAlert("Success","Welcome "+objData.name);
        navigate("/Home");
      }
      else{
        setUserData(null);
        showAlert("Warn","Wrong Username or Password");
      }
    }
    else{
      setUserData(null);
      showAlert("Error","No Internet Connection");
    }
  }
  const showAlert = (typee,msgg)=>{
    setAlert({
      msg:msgg,
      type:typee
    })
    setTimeout(()=>{
      setAlert(null);
    },3000)
  }
  return (
    <>

    <NavBar/>
    <Alerts a={alerts}/>
      <Routes>
        <Route exact path='/' element={<LoginForm f={showAlert} g={user}/>}/>
        <Route exact path='/Home' element={<Home udata={userData}/>}/>
        <Route exact path='/Order' element={<Order udata={userData}/>}/>
      </Routes>
    
    </>
    
  );
}

export default App;
