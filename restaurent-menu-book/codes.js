var grabForm = document.getElementById('submit-btn');
var listsParent = document.getElementById('items');

var grabFilter = document.getElementById('filter');


grabForm.addEventListener('click', addElement);

listsParent.addEventListener('click', deleteElement);

grabFilter.addEventListener('input', filterElements);



function addElement(e) {
    e.preventDefault();

    //storing input value
    var addItemInput = document.getElementById('item').value;

    //Creating list element and and adding bootstrap class and text content to it
    var liCreate = document.createElement('li');
    liCreate.classList = 'list-group-item';
    liCreate.textContent = addItemInput;
//    liCreate.appendChild(document.createTextNode(addItemInput));
    

    //grabing parent of list element and adding newly created list element to it
    var liElements = document.getElementById('items');
    
    
    //create delete button 
    var btnCreate = document.createElement('button');
    btnCreate.classList = 'btn btn-danger btn-sm float-right delete';
    btnCreate.textContent = 'X';
    
    if(addItemInput != ''){
        liElements.appendChild(liCreate);
        liCreate.appendChild(btnCreate); 
    }
}

function deleteElement(e){
    e.preventDefault();
    
    if(e.target.classList.contains('delete')) {
        var li = e.target.parentElement;
        listsParent.removeChild(li);
    }
    
}

function filterElements(e){
    var searchQuery = e.target.value.toLowerCase();
    
//    var li = listsParent.getElementsByTagName('li');
//    console.log(li);
    var li = listsParent.children;

    Array.from(li).forEach(function(item){
        //GRABBING text content of every list element
        var text = item.firstChild.textContent;
        
        //Check whether list text matches Search Query - match: block, Not mach: none
        if(text.toLowerCase().indexOf(searchQuery) != -1)  {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    })
}