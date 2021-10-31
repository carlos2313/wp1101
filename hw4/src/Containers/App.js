import '../styles.css';
import { Component } from 'react';
import Event from '../Components/Event';

class App extends Component{
    constructor(){
        super();
        this.state = {
            todoListLength: 0,
            todoListSeq: 0,
            done: 0,
            todolist: [],
            footerfilter: "All", 
        }
    }
    lengthInc = () => this.setState(state => ({todoListLength: state.todoListLength + 1 }));
    seqInc = () => this.setState(state => ({todoListSeq: state.todoListSeq + 1 }));
    addevent = (event) => this.setState(state => ({todolist: state.todolist.concat(event)}));
    deleteevent = (seq) => {
        let element = this.state.todolist.filter(e =>　e.todoListSeq===seq)[0];
        let checked = element.checked;
        if(checked){
            this.setState(state => ({todolist: state.todolist.filter(e =>　e.todoListSeq!==seq), done: state.done - 1}));
        }else{
            this.setState(state => ({todolist: state.todolist.filter(e =>　e.todoListSeq!==seq), todoListLength: state.todoListLength - 1}));
        }
    };
    checkevent = (seq) =>{ 
        let templist = [...this.state.todolist];
        let temp_element = this.state.todolist.filter(e =>　e.todoListSeq===seq)[0];//Note that the result is a array!!!
        let index = this.state.todolist.indexOf(temp_element);
        temp_element.checked = (temp_element.checked + 1) % 2;//check
        templist[index] = temp_element;
        if(temp_element.checked===1){
            this.setState(state => ({todolist: templist, done: state.done + 1, todoListLength: state.todoListLength - 1}));    
        }else{
            this.setState(state => ({todolist: templist, done: state.done - 1, todoListLength: state.todoListLength + 1}));
        }
    }
    allfilter = () => this.setState({footerfilter: "All"});
    activefilter = () => this.setState({footerfilter: "Active"});
    completedfilter = () => this.setState({footerfilter: "Completed"});
    clearcompleted = () => this.setState(state => ({todolist: state.todolist.filter(e =>　e.checked!==1), done: 0}));

    handleKeyDown(e){
        if( e.code === "Enter" ){
            let input = document.getElementById("todo_input");
            if(input.value!==''){
                this.lengthInc();
                this.seqInc();
                var seq = this.state.todoListSeq;
                var event = {todoListSeq: seq, checked: 0, detail: input.value};
                this.addevent(event);
                input.value = "";
            }
        }
    }

    render(){
        return (
            <>
            <header className="todo-app__header">
                <h1 className="todo-app__title">todos</h1>
            </header>
            <section className="todo-app__main">
                <input className="todo-app__input" id="todo_input" placeholder="what need to be done?" onKeyDown={this.handleKeyDown.bind(this)}></input>
                <ul className="todo-app__list" id="todo-list">
                    {this.state.footerfilter==="All"?
                    this.state.todolist.map(e => <Event todoListSeq = {e.todoListSeq} checked = {e.checked} detail = {e.detail} delfun = {() => this.deleteevent(e.todoListSeq)} checkfun = {() => this.checkevent(e.todoListSeq)}/>):
                    this.state.footerfilter==="Active"?
                    this.state.todolist.filter(e => e.checked===0).map(e => <Event todoListSeq = {e.todoListSeq} checked = {e.checked} detail = {e.detail} delfun = {() => this.deleteevent(e.todoListSeq)} checkfun = {() => this.checkevent(e.todoListSeq)}/>):
                    this.state.footerfilter==="Completed"?
                    this.state.todolist.filter(e => e.checked===1).map(e => <Event todoListSeq = {e.todoListSeq} checked = {e.checked} detail = {e.detail} delfun = {() => this.deleteevent(e.todoListSeq)} checkfun = {() => this.checkevent(e.todoListSeq)}/>):
                    <>
                    </>
                    }
                </ul>
            </section>
            <footer className="todo-app__footer" id="todo-footer" style={{visibility: this.state.todoListLength + this.state.done>0? "visible": "hidden"}}>
                <div className="todo-app__total">{this.state.todoListLength} left</div>
                <ul className="todo-app__view-buttons">
                    <button onClick={this.allfilter} style={{outline: this.state.footerfilter==="All"? "solid": "none"}}>All</button>
                    <button onClick={this.activefilter} style={{outline: this.state.footerfilter==="Active"? "solid": "none"}}>Active</button>
                    <button onClick={this.completedfilter} style={{outline: this.state.footerfilter==="Completed"? "solid": "none"}}>Completed</button>
                </ul>
                <div className="todo-app__clean">
                    <button onClick={this.clearcompleted} style={{visibility: this.state.done>0? "visible": "hidden"}}>Clear completed</button>
                </div>
            </footer>
            </>
        );
    }
}
export default App;
