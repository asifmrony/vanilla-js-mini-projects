//Budget Module: for doing all internal data structures
var budgetController = (function () {
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        Stored: {
            inc: [],
            exp: []
        },
        totals: {
            income: 0,
            expense: 0
        }
    }

    return {
        addItems: function (type, desc, val) {
            var newItem, ID;

            //create new ID
            if (data.Stored[type].length > 0) {
                ID = data.Stored[type][data.Stored[type].length - 1].id + 1;
            } else {
                ID = 0;
            }


            //create new item based on 'inc' or 'exp'
            if (type === 'inc') {
                newItem = new Income(ID, desc, val);
            } else if (type === 'exp') {
                newItem = new Expense(ID, desc, val);
            }

            //push new item to the data structure
            data.Stored[type].push(newItem);

            //return the newly created item
            return newItem;
        }
    }

})();

//UI Module: for interacting and updating the UI
var UIController = (function () {

    var domStrings = {
        type: '.add__type',
        description: '.add__description',
        value: '.add__value',
        addBtn: ".add__btn",
        incomeContainer: ".income__list",
        expenseContainer: ".expenses__list"
    }

    return {
        getDOMInputs: function () {
            return {
                type: document.querySelector(domStrings.type).value,
                description: document.querySelector(domStrings.description).value,
                value: document.querySelector(domStrings.value).value
            }
        },

        getDOMStrings: function () {
            return domStrings;
        },

        addListItem: function (obj, type) {
            var html, newHtml, element;
            // Add HTML String with Placeholder text
            if (type === 'inc') {
                element = domStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = domStrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace Placeholder with actual text
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert HTML to dom
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        }
    }
})();

//App Controller Module: Middleman of Budget and UI Module
var Controller = (function (budgetCtrl, UIctrl) {

    var setupFunction = function () {
        var DOM = UIctrl.getDOMStrings();

        document.querySelector(DOM.addBtn).addEventListener('click', controlFunction);
        document.addEventListener("keypress", function (e) {
            if (e.which === 13 || e.keyCode === 13) {
                controlFunction();
            }
        });
    }

    function controlFunction() {
        var input, newItem;

        //1. get Input value from UI
        input = UIctrl.getDOMInputs();

        //2. add the item to the budget controller
        newItem = budgetCtrl.addItems(input.type, input.description, input.value);

        //3. add item to the UI
        UIctrl.addListItem(newItem, input.type);
    }

    return {
        init: function () {
            console.log("App has Inittialized");
            setupFunction();
        }
    }

})(budgetController, UIController);


Controller.init(); // App is Initialiased here by calling public Init Method in Controller.