import React from 'react';
import '../styles.css';

function Key(props){
    const {onClick, className, ...remains} = props;
    return(
        <button onClick={onClick} className={`calculator-key ${className}`} {...remains}/>
    )
}

export default Key;