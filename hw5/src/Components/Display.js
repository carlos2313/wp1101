import '../styles.css';
import Text from '../Containers/Text';

function Display(props){
    let parsedValue = parseFloat(props.value).toLocaleString(undefined, {maximumFractionDigits: 6});
    let isFloat = props.value.match(/\.\d*?(0*)$/);
    if(isFloat)
        parsedValue += (/[1-9]/).test(isFloat[0]) ? isFloat[1] : isFloat[0];
    return(
        <div className="calculator-display">
            <Text>{parsedValue}</Text>
        </div>
    )
}

export default Display;