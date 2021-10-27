var todoListLength = 0;
var todoListSeq = 0;
var done = 0;
let input = document.getElementById("todo_input");
let todolist = document.getElementById("todo-list");
let footer = document.getElementById("todo-footer");
let allevents = [];
let allbutton = footer.children[1].children[0];
let activebutton = footer.children[1].children[1];
let completedbutton = footer.children[1].children[2];
let clearbutton = footer.lastElementChild.firstElementChild;

function clearbuttonvisibility(){
    if(done>0){
        clearbutton.style = "visibility: visible;";
    }else{
        clearbutton.style = "visibility: hidden;";
    }
}
function footervisible(){
    footer.style = "visibility: visible;";
    countAdjust();
    clearbuttonvisibility();
}
function footerhidden(){
    footer.style = "visibility: hidden;";
}

function countAdjust(){
    footer.firstElementChild.textContent = `${todoListLength} left`;
}

function check(){
    if(this.checked === 0){
        let detail = document.getElementById(this.for).parentElement.nextElementSibling;
        detail.style="text-decoration: line-through; opacity: 0.5;";
        this.style = "background: #26ca299b";
        this.checked = 1;
        todoListLength--;
        done++;
    }else{
        let detail = document.getElementById(this.for).parentElement.nextElementSibling;
        detail.style="text-decoration:";
        this.style = "background: rgba(99, 99, 99, 0.698);";
        this.checked = 0;
        todoListLength++;
        done--;
    }
    countAdjust();
    clearbuttonvisibility();
}

function event_remove(){
    let event = document.getElementById(this.id).parentElement;
    if(event.firstElementChild.lastElementChild.checked===1){
        done--;
    }else{
        todoListLength--;
    }
    let index = allevents.indexOf(event);
    if(index > -1){
        allevents.splice(index, 1);
    }
    event.remove();
    countAdjust();
    clearbuttonvisibility();
    if(todoListLength===0 && done===0){
        footerhidden();
    }
    console.log("done = " + done + "len = " + todoListLength);
}

class Event{
    constructor(event){
        this.node = document.createElement("li");
        this.node.className = "todo-app__item";
        this.node.id = todoListSeq;
        this.checkbox = document.createElement("div");
        this.checkbox.className = "todo-app__checkbox";
        this.hiddeninput = document.createElement("input");
        this.hiddeninput.id = "checkbox" + todoListSeq;
        this.hiddeninput.type = "checkbox";
        this.label = document.createElement("label");
        this.label.for = "checkbox" + todoListSeq;
        this.label.checked = 0;
        this.label.addEventListener('click', check);
        this.detail = document.createElement("h1");
        this.detail.className = "todo-app__item-detail";
        this.detail.textContent = event;
        this.img = document.createElement("img");
        this.img.src = "./img/x.png";
        this.img.className = "todo-app__item-x";
        this.img.id = "img" + todoListSeq.toString();
        this.img.addEventListener('click', event_remove);
        this.checkbox.appendChild(this.hiddeninput);
        this.checkbox.appendChild(this.label);
        this.node.appendChild(this.checkbox);
        this.node.appendChild(this.detail);
        this.node.appendChild(this.img);
    }
    get Node(){
        return this.node;
    };
}

allbutton.addEventListener('click', function(){
    while(todolist.firstChild) {
        todolist.removeChild(todolist.firstChild);
    }
    for(let i=0;i<allevents.length;i++){
        todolist.appendChild(allevents[i]);
    }
});
activebutton.addEventListener('click', function(){
    activeevents = allevents.filter(event => event.firstElementChild.lastElementChild.checked===0);
    while(todolist.firstChild) {
        todolist.removeChild(todolist.firstChild);
    }
    for(let i=0;i<activeevents.length;i++){
        todolist.appendChild(activeevents[i]);
    }
});
completedbutton.addEventListener('click', function(){
    completedevents = allevents.filter(event => event.firstElementChild.lastElementChild.checked===1);
    while(todolist.firstChild) {
        todolist.removeChild(todolist.firstChild);
    }
    for(let i=0;i<completedevents.length;i++){
        todolist.appendChild(completedevents[i]);
    }
});

clearbutton.addEventListener('click', function(){
    let n = todolist.children.length;
    let removecnt = 0;
    for(let i=0;i<n;i++){
        if(todolist.children[i-removecnt].firstElementChild.lastElementChild.checked===1){
            let index = allevents.indexOf(todolist.children[i-removecnt]);
            if(index > -1){
                allevents.splice(index, 1);
            }
            todolist.children[i-removecnt].remove();
            removecnt++;
            done--;
        }
    }
    clearbuttonvisibility();
    if(done===0 && todoListLength===0){
        footerhidden();
    }
});

input.addEventListener('keydown', function(e){
    if( e.code === "Enter" ){
        if(input.value!=''){
            todoListLength++;
            todoListSeq++;
            console.log(todoListLength);
            if(todoListLength === 1){
                footervisible();
            }else{
                countAdjust();
            }
            let rNode = new Event(input.value).Node;
            todolist.appendChild(rNode);
            allevents.push(rNode);
            input.value = "";
        }else{
            console.log("input is empty!!")
        }
    }
});