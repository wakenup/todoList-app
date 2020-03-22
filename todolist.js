const list = document.getElementById("items");
const inp = document.getElementById("input");
const add = document.getElementById("plus");
const buttonAll = document.getElementById("buttonall");
const buttonActive = document.getElementById("buttonactive");
const buttonCompleted = document.getElementById("buttoncompleted");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//LIST - массив для хранения объектов{title,id,done,trash}
let LIST;
let id;

//newid - новое id которое дается после загрузки с localStorage
let newid;

// data - данные харнящиеся в localStorage
let data = localStorage.getItem("todoapp");

// если данных есть
if(data){
    newid=0;
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
  }
else{
//если данных нет
LIST = [];
id = 0;
}

//функция для загрузки данных в list
function loadList(arr){
  arr.forEach(function(item){
      item.id=newid;
      addToDo(item.title,item.id,item.done,item.trash);
  });

}

//addToDo - функция для добавления нового toDo
function addToDo(toDo,id,done,trash){
  newid++;
  if(trash){return;}
  const COMPLETE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";
  const text = `<li class="item">
    <i class="fa ${COMPLETE} i1" aria-hidden="true" work="complete" id=${id}></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-times-circle i2" aria-hidden="true" work="delete" id=${id}></i>
  </li>`

  const position="beforeend";

  list.insertAdjacentHTML(position,text);
}


document.addEventListener("keyup",function(event){
//вызов функции addToDo при нажатии на enter
    if(event.keyCode==13){
      const toDo = inp.value;
      if(toDo){
        addToDo(toDo,id,false,false);
        LIST.push({
          title:toDo,
          id: id,
          done : false,
          trash : false
        });
      }
      localStorage.setItem("todoapp",JSON.stringify(LIST.filter(obj => obj.trash!=true)));
      inp.value="";
      id++;
    }
})

//doneaddtodo - функция срабатывающая при нажатии на checkbox задания
function doneaddtodo(element){
//toggle - метод удаляющий класс если он есть(добавляющий класс если его нет)
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    if(LIST[element.id].done){
      LIST[element.id].done = false;
    }
    else{
      LIST[element.id].done = true;
    }
}
//функция для удаления задания
function deletetodo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash=true;
}
//определяем на что нажал пользователь чтобы вызвать нужную функцию
list.addEventListener("click",function(event){
  let el = event.target;
  let work = el.attributes.work.value;
  if(work=="complete"){
    doneaddtodo(el);
  }
  else if (work=="delete"){
    deletetodo(el);
  }
  localStorage.setItem("todoapp",JSON.stringify(LIST.filter(obj => obj.trash!=true)));
})

//при нажатии на плюс добавляется новое задание
add.addEventListener("click",function(){
  const toDo = inp.value;
  if(toDo){
    addToDo(toDo,id,false,false);
    LIST.push({
      title:toDo,
      id: id,
      done : false,
      trash : false
    });
  }
  localStorage.setItem("todoapp",JSON.stringify(LIST.filter(obj => obj.trash!=true)));
    inp.value="";
    id++;
})

//нажатие на кнопку All
buttonAll.onclick = function(){
  while(list.firstChild){
    list.removeChild(list.firstChild);
  }
  LIST.forEach(function(item){
      addToDo(item.title,item.id,item.done,item.trash);
  });
}

//нажатие на кнопку Active
buttonActive.onclick = function(){
  while(list.firstChild){
    list.removeChild(list.firstChild);
  }
  LIST.filter(obj => obj.done!=true).forEach((item) => {
      addToDo(item.title,item.id,item.done,item.trash);
  });
}

//нажатие на кнопку Complete
buttonCompleted.onclick = function(){
  while(list.firstChild){
    list.removeChild(list.firstChild);
  }
  LIST.filter(obj => obj.done==true).forEach((item) => {
      addToDo(item.title,item.id,item.done,item.trash);
  });
}
