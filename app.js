// Constants
const newListBtn=document.querySelector(".newListBtn");
const trelloListsDiv=document.querySelector(".trelloListsDiv");
const initialList=trelloListsDiv.children[0];
let source;
let destination;
let sourceElement;
//console.log(initialList);
initialList.ondragover=function(event){
    event.preventDefault();
}

initialList.ondrop=function(event){
    if(sourceElement.parentElement.classList[1]!=initialList.classList[1]){
        let newTodo=document.getElementsByClassName('todosDiv '+initialList.classList[1])[0];
        //console.log(newTodo);
        newTodo.appendChild(sourceElement);
        
       
    }
}

initialList.ondrop=function(event){
    if(sourceElement.parentElement.classList[1]!=initialList.classList[1]){
        let newTodo=document.getElementsByClassName('todosDiv '+initialList.classList[1])[0];
        //console.log(newTodo);
        let source=sourceElement.parentElement;
        newTodo.appendChild(sourceElement);
       // console.log(sourceElement);
        //console.log(newTodo.children.length);
        sourceElement.id=newTodo.children.length;
        let i=1;
        for(let ele of source.children){
            ele.id=i++;
        }
            
    
       
    }
}


let lists=0;
const btnList=[];
const btn1=document.querySelector('.textListSubmit');
btnList.push(btn1);
listContent=[{}];
numTodos=[0];
//console.log(btn1);

//EventListeners
newListBtn.addEventListener('click',makeNewList);
btn1.addEventListener('click',addTodo);





//Functions
function makeNewList(){
    lists++;
    //console.log(trelloListsDiv);
    //make list box
    const newListDiv=document.createElement('div');
    newListDiv.classList.add('list');
    newListDiv.classList.add(lists);
    
    newListDiv.ondragover=function(event){
        event.preventDefault();
       // console.log(event);
    }

    
    
    trelloListsDiv.appendChild(newListDiv);
    //make list title
    const listTitle=document.createElement('h3');
    listTitle.append('New List!');
    listTitle.classList.add('listTitle');
    newListDiv.appendChild(listTitle);
    

    //make input box inside list
    const textList=document.createElement('input');
    textList.classList.add(lists);
    textList.type="textbox";
    textList.classList.add('textList');
    newListDiv.appendChild(textList);

    //make Submit button
    let btn=document.createElement('button');
    btn.classList.add('textListSubmit');
    btn.classList.add(lists);
    btn.textContent="Submit";
   btnList.push(btn);
  // btn.addEventListener('click',addTodo);
   btnList[btnList.length-1].addEventListener('click',addTodo);
    newListDiv.appendChild(btn);
    
    //console.log(newListDiv);

    //make list div
    let todosDiv=document.createElement('div');
    todosDiv.classList.add('todosDiv');
    todosDiv.classList.add(lists);
    newListDiv.appendChild(todosDiv);

    newListDiv.ondrop=function(event){
        if(sourceElement.parentElement.classList[1]!=newListDiv.classList[1]){
            let newTodo=document.getElementsByClassName('todosDiv '+newListDiv.classList[1])[0];
            //console.log(newTodo);
            newTodo.appendChild(sourceElement);
           // console.log(sourceElement);
           let source=sourceElement.parentElement;
            console.log(newTodo.children.length);
            sourceElement.id=newTodo.children.length;
            
            let i=1;
            for(let ele of source.children){
                ele.id=i++;
            }
           
        }
    }

    listContent.push({});
    numTodos.push(0);
   // console.log(listContent);

   
}


function addTodo(event){
    
   // console.log(event.target);
    let l=event.target.classList[1];
    numTodos[l]++;
    let input=document.getElementsByClassName('textList '+l);
    input=input[0];
    let todosDiv=document.getElementsByClassName('todosDiv '+l);
    todosDiv=todosDiv[0];
    let cardDiv=document.createElement('div');
    cardDiv.draggable="true";
    cardDiv.classList.add("cardDiv");
    cardDiv.ondragover=function(event){
        event.preventDefault();
       // console.log('now');

    }
    cardDiv.ondragstart=function(event){
        
        source=event.target.id;
        sourceElement=event.target;
    }



    cardDiv.ondrop=function(event){
        let todos;
        let list;
        let listIndex;
        event.preventDefault();
        let todo;
        if(event.target.classList[0]==='card'){
            destination=event.target.parentElement.id;
            todos=event.target.parentElement.parentElement;
            todo=event.target.parentElement;
            list=todos.parentElement;
            listIndex=list.classList[1];
           
        }
        else{
            todos=event.target.parentElement;
            list=todos.parentElement;
            todo=event.target;
            listIndex=list.classList[1];
            destination=event.target.id;
        }
        
        
        
        source=parseInt(source);
        destination=parseInt(destination);
       // console.log(destination);
        

        

       if(source===destination){
           return;
       }
       else if(source<destination){
           //let card=document.querySelector();
           
           let i=1;
           
           
        for(let k of todos.children){
            // console.log(k);
            if(parseInt(k.id)===source){
                //k.id=destination;
                continue;
            }
            else if(parseInt(k.id)===destination){
                 
                 k.id=i;
                 sourceElement.id=destination;
                
                 i=destination+1;
            }
            else{
               
                k.id=i;
                //m.appendChild(k)
                 i++;
            }
            
         }
         [...todos.children]
        .sort((a,b)=>a.id>b.id?1:-1)
        .map(node=>todos.appendChild(node));

        
           
       }
       else{
           let i=1;
           
           for(let k of todos.children){
            // console.log(k);
            if(parseInt(k.id)<destination){
                //k.id=destination;
                i++;
                continue;
            }
            else if(parseInt(k.id)===destination){
                 
                 
                 
                
                 i=destination+1;
                 k.id=i;
                 i++;
            }
            else if(parseInt(k.id)===source){
                sourceElement.id=destination;
                continue;
            }
            else{
               
                k.id=i;
                //m.appendChild(k)
                 i++;
            }
            
         }
         [...todos.children]
        .sort((a,b)=>a.id>b.id?1:-1)
        .map(node=>todos.appendChild(node));

       }

    }
    cardDiv.id=numTodos[l];
    let p=document.createElement('p');
    p.classList.add('card');
    p.textContent=input.value;
    //console.log(todosDiv);
    cardDiv.appendChild(p);
    todosDiv.appendChild(cardDiv);
    
    listContent[l][numTodos[l]]=input.value;

    let cardDoneButton=document.createElement('button');
    cardDoneButton.textContent="Done";
    cardDoneButton.classList.add("cardDoneButton");
    cardDiv.appendChild(cardDoneButton);
   
    cardDiv.addEventListener('mouseover',mouseFocus);
    cardDiv.addEventListener('mouseout',mouseLeft);

    cardDoneButton.addEventListener('click',finishedTask);

    
    
    input.value="";
   // console.log(listContent[l]);
    
}

function mouseFocus(event){
    //console.log(event.target);
    if(event.target.classList[0]==="card"){
        event.target.parentElement.style.backgroundColor="red";
    }
    if(event.target.classList[0]==='cardDoneButton'){
        event.target.parentElement.style.backgroundColor="yellow"
    }
   

}

function mouseLeft(event){
   // console.log(event.target);
    if(event.target.classList[0]==='card'){
        event.target.parentElement.style.backgroundColor="white";
    }
    if(event.target.classList[0]==='cardDoneButton'){
        event.target.parentElement.style.backgroundColor="white";
    }
}

function finishedTask(event){
    //console.log(event.target.parentElement);
    let card=event.target.parentElement;
    let todo=card.parentElement;
    console.log(todo);
    let todoIndex=todo.classList[1];
    let listIndex=todo.parentElement.classList[1];

     
    // console.log(todo);
    delete listContent[listIndex][card.id];
    let i=1;
    let ls={};
    //console.log(listContent[index]);
    for (var key in listContent[listIndex]) {
           ls[i]=listContent[listIndex][key];
           i++; 
    }
    i=1;
   // console.log(ls);
    //console.log(todo.children);
    //console.log(index);
    card.remove();
    listContent[listIndex]=ls;
    
   // console.log(todo.children);
   
    for(let k of todo.children){
       // console.log(k);
        k.id=i;
        i++;
    }
   // console.log(todo);
    numTodos[listIndex]--;
    
    //console.log(listContent[index]);
}

