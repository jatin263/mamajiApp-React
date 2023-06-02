export default function Alerts(props) {
    return(
       props.a && <div className="popAlerts">
            <p id={props.a.type}>{props.a.type} : {props.a.msg}</p>
        </div>
    )
}