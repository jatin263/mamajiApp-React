import { useState,useEffect } from 'react';


export default function ReportPreview(props) {
    document.title="Report Preview - RIL CSO's Reoprting Portal";
    const [reportFromApi,setApiReport] = useState("");
    let nameUser=localStorage.getItem("User-name");
    let uid=localStorage.getItem("userId");
    let datas={};
    datas.id=uid;
    useEffect(()=>{
        if(uid!==""){
            fetchReport();
        }
        else{
            props.navigator('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[uid]);
    function apiResponse(data){
        setApiReport(data.msg)
    }

    function homeNavigate(){
        props.navigator("/Home");
    }

    function copyReport(){
        var copyText = document.getElementById("data");
        copyText.select();
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy");
        alert("Copied the text: " + copyText.value);
    }

    function fetchReport(){
        let params={
            method:"POST",
            headers:{
                "Content-Type":"application/json; charset=utf-8",
            },
            body:JSON.stringify(datas),
        };
        fetch("http://localhost/api1/reportGet.php",params).then(function(response){
            return response.json();
        }).then(function(data){
            apiResponse(data);
        })
    }
    return(
        <>
            <h3>Hello {nameUser}</h3>
            <div className='reportPreview'>
                <textarea rows={39} cols={40} id='data' value={reportFromApi} readOnly></textarea>
            </div>
            <div className="btn-center"><button type="button" onClick={copyReport} className="buttonStyle">Submit</button> </div>
            <div className="btn-center"><button type="button" onClick={homeNavigate} className="buttonStyle">Home</button> </div>
        </>
    )
}