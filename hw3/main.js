var todoListLength = 0;
let input = document.getElementById("todo_input");
let todolist = document.getElementById("todo-list");

function creaate_footer(){
    let footer = document.createElement("footer");
    footer.className = "todo-app__footer";
    footer.id = "todo-footer";
    let total = document.createElement("div");
    total.className = "todo-app__total";
    total.id = "todo_num";
    total.textContent = "1 left";
    let buttons = document.createElement("ul");
    buttons.className = "todo-app__view-buttons";
    let All = document.createElement("button");
    All.textContent = "All";
    let Active = document.createElement("button");
    Active.textContent = "Active";
    let Completed = document.createElement("button");
    Completed.textContent = "Completed";
    let clean = document.createElement("div");
    clean.className = "todo-app__clean";
    let Clear_completed = document.createElement("button");
    Clear_completed.textContent = "Clear completed";
    buttons.appendChild(All);
    buttons.appendChild(Active);
    buttons.appendChild(Completed);
    clean.appendChild(Clear_completed);
    footer.appendChild(total);
    footer.appendChild(buttons);
    footer.appendChild(clean);
    root = document.getElementById("root");
    root.appendChild(footer);
}

class Event{
    constructor(event){
        this.node = document.createElement("li");
        this.node.className = "todo-app__item";
        this.node.id = todoListLength-1;
        let checkbox = document.createElement("div");
        checkbox.className = "todo-app__checkbox";
        let hiddeninput = document.createElement("input");
        hiddeninput.id = todoListLength.toString();
        hiddeninput.type = "checkbox";
        let label = document.createElement("label");
        label.for = todoListLength.toString();
        label.checked = 0;
        label.addEventListener('click', function(e){
            console.log(this.checked);
            if(this.checked == 0){
                let detail = document.getElementById(this.for).parentElement.nextElementSibling;
                detail.style="text-decoration: line-through; opacity: 0.5;";
                this.style = "background: #26ca299b";
                this.checked = 1;
            }else{
                let detail = document.getElementById(this.for).parentElement.nextElementSibling;
                detail.style="text-decoration:";
                this.style = "background: rgba(99, 99, 99, 0.698);";
                this.checked = 0;
            }
        });
        let detail = document.createElement("h1");
        detail.className = "todo-app__item-detail";
        detail.textContent = event;
        let img = document.createElement("img");
        img.src = "./img/x.png";
        img.className = "todo-app__item-x";
        checkbox.appendChild(hiddeninput);
        checkbox.appendChild(label);
        this.node.appendChild(checkbox);
        this.node.appendChild(detail);
        this.node.appendChild(img);
    }
    get Node(){
        return this.node;
    };
}

input.addEventListener('keydown', function(e){
    if( e.code === "Enter" ){
        if(input.value!=''){
            todoListLength++;
            console.log(todoListLength);
            if(todoListLength == 1){//from 0 to 1
                creaate_footer();
            }
            let rNode = new Event(input.value).Node;
            todolist.appendChild(rNode);

            input.value = "";
            let todoNum = document.getElementById("todo_num");
            todoNum.textContent = `${todoListLength} left`;
        }else{
            console.log("input is empty!!")
        }
    }
});