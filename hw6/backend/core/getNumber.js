let number = 0;
function getNumber(){
    return number;
}

function genNumber(){
    number = Math.ceil(Math.random() * 100);
}

export {getNumber, genNumber};