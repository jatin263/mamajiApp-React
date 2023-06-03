import { useState } from "react";

export default function LoginForm(props){

    function LoginWithApi(inputData){
        let params={
            method:"POST",
            headers:{
                "Content-Type":"application/json; charset=utf-8",
            },
            body:JSON.stringify(inputData),
        };
        fetch("http://localhost/api1/login.php",params).then(function(response){
            return response.json();
        }).then(function(data){
            if(data.objData!==""){
                props.g(data.apiRes,data.msg,data.objData);
            }
            else{
                props.f("Error","Wrong Username or Password");
            }
        }).catch(()=>{
            props.f("Error","Server is Down");
        })
    }

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
        else{
            LoginWithApi({"userName":username,"passWord":password});
            // props.f("Success","Login Success");
            // navigate("/Home");
        }
        // else{
        //     props.f("Error","Wrong Username or Password");
        // }
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