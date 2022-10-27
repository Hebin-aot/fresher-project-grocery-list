//selecting Items
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

//edit Options
let editElement;
let editFlag = false;
let editId = "";

//----------Event Listners---------//

//submit Form
form.addEventListener("submit",addItem);

//clear items
clearBtn.addEventListener("click",clearItems);

//load items
window.addEventListener('DOMContentLoaded',setupItems);
//delete


//funtions
function addItem(e){
    e.preventDefault();
    const value = grocery.value;

    const id = new Date().getTime().toString();
    console.log(id)

    if(value !=='' && editFlag==false){ // to add items to the list
        // createListItems(id,value)
        const items = document.createElement('article');

        //adding class
        items.classList.add('grocery-item');

        //adding id
        const attr = document.createAttribute('data-id');
        attr.value=id
        items.setAttributeNode(attr);
        items.innerHTML=`
        <p class="title">${value}</p>
        <div class="btn-container">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
        `;

        const deleteBtn = items.querySelector(".delete-btn");
        const editBtn = items.querySelector(".edit-btn");

        deleteBtn.addEventListener("click",deleteItem);
        editBtn.addEventListener("click",editItem);


        //append child
        list.appendChild(items);

        //add to local storage
        addToLocalStorage(id,value);

        //set to default
        setToDefault();

        console.log("Success")
    }
    else if(value !=='' && editFlag==true){
        editElement.innerHTML=value
        editLocalStorage(editId,value);
        setToDefault()
    }
    else{
        alert.textContent=("empty")
    }
}

//clear items
function clearItems(){
    const addedItems = document.querySelectorAll('.grocery-item');

    if (addedItems.length > 0){
        addedItems.forEach(function(ITEM){
            list.removeChild(ITEM);
        });
    }

    setToDefault();
    localStorage.removeItem('list');
}

//edit funtion
function editItem(e){
    const element =e.currentTarget.parentElement.parentElement;

    editElement=e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editId=element.dataset.id;
    submitBtn.textContent="Edit";
    console.log("edited")
}

//delete funtion
function deleteItem(e){
    const element =e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element) 
    setToDefault();
    removeFromLocalStorage(id);
    console.log("deleted")
}

//set to default
function setToDefault(){
    grocery.value=""
    editFlag = false;
    editId = "";
    submitBtn.textContent="Submit";
    console.log('set to default')
}

//Add to local storage
function addToLocalStorage(id,value){
    const grocery ={id,value};
    let item = getLocalStorage();
    item.push(grocery);
    localStorage.setItem('list',JSON.stringify(item));

}

function removeFromLocalStorage(id){
    let item = getLocalStorage();

    item = item.filter(function(items){
        if(items.id !== id){
            return items;
        }
    });
    localStorage.setItem('list',JSON.stringify(item));
}

function editLocalStorage(id,value){
    let item = getLocalStorage();
    item = item.map(function(items){
        if(items.id === id){
            items.value = value;
        }
        return items;
    })
    localStorage.setItem('list',JSON.stringify(item));
}

function getLocalStorage(){
    return localStorage.getItem("list")?JSON.parse(localStorage.getItem('list')):[];
}


function setupItems(){
    let item = getLocalStorage();
    if(item.length>0){
        item.forEach(function(items){
            createListItems(items.id,items.value)
        });
    }
}

function createListItems(id,value){
    const items = document.createElement('article');

        //adding class
        items.classList.add('grocery-item');

        //adding id
        const attr = document.createAttribute('data-id');
        attr.value=id
        items.setAttributeNode(attr);
        items.innerHTML=`
        <p class="title">${value}</p>
        <div class="btn-container">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
        `;

        const deleteBtn = items.querySelector(".delete-btn");
        const editBtn = items.querySelector(".edit-btn");

        deleteBtn.addEventListener("click",deleteItem);
        editBtn.addEventListener("click",editItem);


        //append child
        list.appendChild(items);
}