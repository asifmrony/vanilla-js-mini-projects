var form = document.querySelector('#addForm');
var itemsList = document.getElementById('items');
var filter = document.getElementById('filter');


//form submit event
form.addEventListener('submit', addItem);
// delete event
itemsList.addEventListener('click', removeItem);
//filter event
filter.addEventListener('keyup', filterElement);


//addItem 
function addItem(e) {
    e.preventDefault();

    //get input value
    var newItem = document.getElementById('item').value;

    //create li element
    var newLi = document.createElement('li');
    //add class
    newLi.className = 'list-group-item';
    //add item from input 
    newLi.appendChild(document.createTextNode(newItem));

    //create button element
    var deleteBtn = document.createElement('button');
    //add classes to deleteBtn
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    //create textNode and add to the button
    deleteBtn.appendChild(document.createTextNode('X'));
    //add button to the list element
    newLi.appendChild(deleteBtn);

    //add to the main itemList
    itemsList.appendChild(newLi);
}


//remove item function
function removeItem(e) {
    e.preventDefault();

    //if press delete button 
    if (e.target.classList.contains('delete')) {
        if (confirm('Are You Sure?')) {
            var li = e.target.parentElement;
            itemsList.removeChild(li);
        }
    }
}


//filter element function
function filterElement(e) {
    var inputValue = e.target.value.toLowerCase();
    //grab li element
    var li = itemsList.getElementsByTagName('li');
    //convert to arry
    Array.from(li).forEach(function (item) {
        //store li elements text to itemname
        var itemName = item.firstChild.textContent;
        if (itemName.toLowerCase().indexOf(inputValue) != -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    })
    // console.log(li);
}