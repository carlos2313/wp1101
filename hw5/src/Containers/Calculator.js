import React from 'react';
import { useState } from 'react';
import '../styles.css';
import Key from '../Components/Key';
import Display from '../Components/Display';

const CalculatorOperations = {
    '/': (a, b) => a / b,
    '*': (a, b) => a * b,
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '=': (a, b) => b
}

function Calculator(){
    const [value, setValue] = useState(null);
    const [displayValue, setDisplayValue] = useState('0');
    const [operator, setOperator] = useState(null);
    const [needOperand, setNeedOperand] = useState(false);
  
    const clear = () => {
        setValue(null);
        setDisplayValue('0');
        setOperator(null);
        setNeedOperand(false);
    };
  
    const backspace = () => {
        setDisplayValue(displayValue.substring(0, displayValue.length - 1) || '0');
    };
  
    const switchsign = () => {
        setDisplayValue(String(parseFloat(displayValue) * -1));
    };

    const dot = () => {
        if(!(/\./).test(displayValue)){
            setDisplayValue(displayValue + '.');
            setNeedOperand(false);
        }
    };
  
    const inputDigit = (digit) => {
        if(needOperand){
            setDisplayValue(String(digit));
            setNeedOperand(false);
        }else{
            setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
        }
    };

    const doOperation = (nextOperator) => {
        let input = parseFloat(displayValue);
        if(value === null){
            setValue(input);
        }else if(operator){
            const current = value || 0;
            const newValue = CalculatorOperations[operator](current, input);
            setValue(newValue);
            setDisplayValue(String(newValue));
        }
        setNeedOperand(true);
        setOperator(nextOperator);
    }
  
    const handleKeyDown = (event) => {
        let { key } = event;
    
        if(key === 'Enter')
            key = '=';
    
        if((/\d/).test(key)){
            inputDigit(parseInt(key, 10));
        }else if(key in CalculatorOperations){
            doOperation(key);
        }else if(key === '.'){
            dot();
        }else if(key === 'Backspace'){
            backspace();
        }else if(key === 'Clear'){
            clear();
        }
    };
  
    document.addEventListener('keydown', handleKeyDown);  
    
    return(
        <div className="calculator">
            <Display value={displayValue}/>
            <div className="calculator-keypad">
                <div className="input-keys">
                    <div className="function-keys">
                        <Key className="key-clear" onClick={clear}>C</Key>
                        <Key className="key-sign" onClick={switchsign}>±</Key>
                        <Key className="key-del" onClick={backspace}>Del</Key>
                    </div>
                    <div className="digit-keys">
                        <Key className="key-0" onClick={() => inputDigit(0)}>0</Key>
                        <Key className="key-dot" onClick={dot}>●</Key>
                        <Key className="key-1" onClick={() => inputDigit(1)}>1</Key>
                        <Key className="key-2" onClick={() => inputDigit(2)}>2</Key>
                        <Key className="key-3" onClick={() => inputDigit(3)}>3</Key>
                        <Key className="key-4" onClick={() => inputDigit(4)}>4</Key>
                        <Key className="key-5" onClick={() => inputDigit(5)}>5</Key>
                        <Key className="key-6" onClick={() => inputDigit(6)}>6</Key>
                        <Key className="key-7" onClick={() => inputDigit(7)}>7</Key>
                        <Key className="key-8" onClick={() => inputDigit(8)}>8</Key>
                        <Key className="key-9" onClick={() => inputDigit(9)}>9</Key>
                    </div>
                </div>
                <div className="operator-keys">
                    <Key className="key-divide" onClick={() => doOperation('/')}>÷</Key>
                    <Key className="key-multiply" onClick={() => doOperation('*')}>×</Key>
                    <Key className="key-subtract" onClick={() => doOperation('-')}>−</Key>
                    <Key className="key-add" onClick={() => doOperation('+')}>+</Key>
                    <Key className="key-equals" onClick={() => doOperation('=')}>=</Key>
                </div>
            </div>
        </div>
    )
    
}

export default Calculator;