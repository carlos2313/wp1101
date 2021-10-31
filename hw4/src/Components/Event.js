import '../styles.css';
import x from '../img/x.png'; 

function Event(props){
    return(
        <li className="todo-app__item" id={props.todoListSeq}>
            <div className="todo-app__checkbox">
                <input id={"checkbox" + props.todoListSeq} type="checkbox"></input>
                <label htmlFor={"checkbox" + props.todoListSeq} onClick={props.checkfun} style={{background: props.checked===1? "#26ca299b": "rgba(99, 99, 99, 0.698)"}}></label>
            </div>
            <h1 className="todo-app__item-detail" style={{textDecoration: props.checked===1? "line-through": "", opacity: props.checked===1? "0.5": ""}}>{props.detail}</h1>
            <img src={x} className="todo-app__item-x" alt="" onClick={props.delfun}></img>
        </li>
    )
}

export default Event;