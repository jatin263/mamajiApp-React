import './App.css';
import NavBar from './Component/NavBar';
import LoginForm from './Component/LoginForm';
import { useEffect, useState} from 'react';
import Order from './Component/Order';
import Alerts from './Component/Alerts';
import Report from './Component/Report';
import ReportPreview from './Component/ReportPreview';
import {
  Routes,
  Route,useNavigate,
} from 'react-router-dom';
import Home from './Component/Home';


function App() {
  const [alerts,setAlert] =  useState(null);
  const [userData,setUserData] = useState(null);
  const navigate = new useNavigate();
 
  const userName=localStorage.getItem("User-name");
    useEffect(()=>{
      if(userName!==null){
        navigate('/Home');
      }
      else{
        navigate('/');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userName]);
  const user = (apiRes,msg,objData)=>{
    if(apiRes===1){
      if(msg==="Success"){
        setUserData({
          uid:objData.id,
          uname:objData.name,
          utown:objData.town
        });
        showAlert("Success","Welcome "+objData.name);
        localStorage.setItem("User-name",objData.name);
        localStorage.setItem("town",objData.town);
        localStorage.setItem("userId",objData.id);
        localStorage.setItem("DbName",objData.dbName)
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
        <Route exact path='/' element={<LoginForm f={showAlert} g={user} udata={userData} navigator={navigate}/>}/>
        <Route exact path='/Home' element={<Home udata={userData} navigator={navigate}/>}/>
        <Route exact path='/Order' element={<Order udata={userData}/>}/>
        <Route exact path='/Report' element={<Report f={showAlert} udata={userData} navigator={navigate}/>}/>
        <Route exact path='/ReportPreview' element={<ReportPreview f={showAlert} udata={userData} navigator={navigate}/>}/>
      </Routes>
    
    </>
    
  );
}

export default App;
