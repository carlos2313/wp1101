import axios from 'axios'
const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess' });
const startGame = async () => {
    try{
        const { data: { msg } }
        = await instance.post('/start');
        return msg;
    }catch(error){
        return error.message;
    }

}
const setAnswer = async (number) => {
    try{
        console.log(number);
        const { data: { msg, answer} } 
        = await instance.post('/setAnswer', null, { params: { number } });
        return [msg, answer];
    }catch(error){
        if(error.message === 'Network Error'){
            return [error.message, -1];
        }else{
            console.log(error.response.data.msg);
            return [error.response.data.msg, error.response.data.answer];
        }
    }
}
const guess = async (number) => {
    try{
        const { data: { msg, AIguessed, AIstatus} } 
        = await instance.get('/guess', { params: { number } });
        return [msg, AIguessed, AIstatus];
    }catch(error){
        if(error.message === 'Network Error'){
            return [error.message, -1, -1];
        }else{
            return [error.response.data.msg, error.response.data.AIguessed, error.response.data.AIstatus];
        }
    }
}
const restart = async () => {
    try{
        const { data: { msg } }
        = await instance.post('/restart');
        return msg;
    }catch(error){
        return error.message;
    }
    
}

export { startGame, setAnswer, guess, restart }
