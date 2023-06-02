import { useState } from "react";
import history from '../history';

export default function LoginForm(props){
    const [loginAs,setLogin] = useState("");
    const setUsername = ()=>{
        let n = document.getElementById('username').value;
        setLogin(n);
    }
    const checkField=()=>{
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        if(username==="" && password===""){
            props.f("Error","Username and Password is Requried");
        }
        else if(username===""){
            props.f("Error","Username is Requried");
        }
        else if(password===""){
            props.f("Error","Password is Requried");
        }
        else if(username==="jatin" && password==="123"){
            props.f("Success","Login Success");
            history.push('/home');
        }
        else{
            props.f("Error","Wrong Username or Password");
        }
    }
    return(
        <>
            <div className="loginBody">
                <h2>Login {loginAs}</h2>
                <div className="loginForm">
                    <div>
                        <div><input type="text" placeholder="Username" name="username" id="username" onInput={setUsername} className="inputStyle" /></div>
                        <div><input type="password" placeholder="Password" id="password" className="inputStyle" /></div>
                        <div className="btn-center"><button type="button" onClick={checkField} className="buttonStyle">Login</button> </div>
                    </div>
                </div>
            </div>
        </>
    );
}