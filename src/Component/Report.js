import { useEffect } from "react";
export default function Report(props) {
    document.title="Report - RIL CSO's Reoprting Portal";
    let dataArr=['DB Name:-','Town:-','Beat Name:-','Total TC:-','Total PC:-','Total PC%:-','PC Noodles:-',
'PC Confy:-','PC Deo:-','PC Coconut Oil:-','PC Namkeen:-','PC Cleaners:-','PC Fresheners:-','PC Others:-',
'PC LUP:','PC Dozo:','PC Glimmer:','PC Independence Bite:','Sales Noodles:-','Sales Confy:-','Sales Deo:-',
'Sales Coconut Oil:-','Sales Namkeen:-','Sales Cleaners:-','Sales Fresheners:-','Sales Others:-','Sales LUP:-',
'Sales Dozo:-','Sales Glimmer:-','Sales Independence Bite:-','Sales Total:-'];
    let nameUser=localStorage.getItem("User-name");
    let dbNameUser=localStorage.getItem("DbName");
    let userIds=localStorage.getItem("userId");
    let townUser=localStorage.getItem('town');
    let UserDB=[dbNameUser,townUser];
    const items = [];
    let userRepJs=document.getElementsByName("userRep[]");


    function apiResponse1(d){
        if(d.code===2){
            props.navigator('/ReportPreview');
        }
    }

    useEffect(()=>{
        if(userIds!==null){
            checkUser();
        }
        else{
          props.navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[userIds]);

    function checkUser(){
        var reports1={};
        reports1.id=userIds;
        let params={
            method:"POST",
            headers:{
                "Content-Type":"application/json; charset=utf-8",
            },
            body:JSON.stringify(reports1),
        };
        fetch("http://localhost/api1/checkReport.php",params).then(function(response){
            return response.json();
        }).then(function(data){
            apiResponse1(data);
        })
    }


    function apiResponse(d){
        if(d.code===2){
            props.navigator('/ReportPreview');
        }
        else{
            if(d.code===1){
                alert("Report Saved");
                props.navigator('/ReportPreview');
            }
            else{
                alert("Try Again");
            }
        }
    }

    function reportInAPI(reports){
        let params={
            method:"POST",
            headers:{
                "Content-Type":"application/json; charset=utf-8",
            },
            body:JSON.stringify(reports),
        };
        fetch("http://localhost/api1/reportEntry.php",params).then(function(response){
            return response.json();
        }).then(function(data){
            apiResponse(data);
        })
    }

    function preCheck(){
        var reportObj={id:userIds};
        var reportData=[];
        var flag=0;
        for(var j=0;j<userRepJs.length;j++){
            if(userRepJs[j].value===""){
                userRepJs[j].style.border="2px solid red";
                flag=1;
            }
            else{
                userRepJs[j].style.border="";
                if(j===0){
                    reportData.push(userRepJs[j].value); 
                }
                else{
                    reportData.push(parseInt(userRepJs[j].value)); 
                }
            }
        }
        if(flag===1){
            props.f("Error","Please fill all Field");
        }
        else{
            reportObj.data=reportData;
            reportInAPI(reportObj);
        }
    }

    function homeNavigate(){
        props.navigator("/Home");
    }

    function evaluteRep(){
        userRepJs[3].value=(parseInt(userRepJs[2].value)*100)/parseInt(userRepJs[1].value);
        var salesSum=0;
        for(var j=16;j<28;j++){
            salesSum=salesSum+parseInt(userRepJs[j].value);
        }
        userRepJs[j].value=salesSum;
    }
    let g=0;
        for (const i of dataArr) {
            if(g<2){
            items.push(<tr key = {i}>
                <td> <strong>{i}</strong> </td>
                    <td> <label>{UserDB[g]}</label> </td>
                
            </tr>);
            g=g+1;
        }
        else{
            if(g===2){
                items.push(<tr key = {i}>
                    <td> <strong>{i}</strong> </td>
                        <td> <input className="inputStyle" type="text" name="userRep[]" placeholder={"Enter Beat Name"}/>  </td>
                    
                </tr>);
                g=g+1;
            }
            else{
                if(g===5 || g===30){
                    items.push(<tr key = {i}>
                        <td> <strong>{i}</strong> </td>
                            <td> <input className="inputStyle" type="number" onInput={evaluteRep} name="userRep[]" defaultValue={0} readOnly/>  </td>
                        
                    </tr>);
                    g=g+1;
                }
                else{
                    items.push(<tr key = {i}>
                        <td> <strong>{i}</strong> </td>
                            <td> <input className="inputStyle" type="number" onInput={evaluteRep} name="userRep[]" defaultValue={0}/>  </td>
                        
                    </tr>);
                    g=g+1;
                }
            }
            
        }
    }
    return(
        <div className="HomeBody">
            <h3>Hello {nameUser}</h3>
            <table>
                <tbody>{ items }</tbody>
            </table>
            <div className="btn-center"><button type="button" onClick={preCheck} className="buttonStyle">Submit</button> </div>
            <div className="btn-center"><button type="button" onClick={homeNavigate} className="buttonStyle">Home</button> </div>
            {/* <div className="HomeContainer">


                {/* <div> <Link to="/Report"><img src={reportlogo} key={reportlogo} width={100} alt='Report'/></Link></div>
                <div> <Link to="/Order"><img src={orderLogo} key={orderLogo} width={100} alt='Report'/></Link> </div> }
            </div>             */}
        </div>
    )
}