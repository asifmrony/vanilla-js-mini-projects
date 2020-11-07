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

    var calculateTotal = function (type) {
        var sum = 0;
        data.Stored[type].forEach(function (current) {
            sum += current.value;
        })
        /*
        [200, 400]
        sum = 0+ 200,
        sum = 200 + 400,
        sum = 600;
        */
        data.totals[type] = sum;
    }

    var data = {
        Stored: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        budget: 0,
        percentage: -1 // -1 means not existed at begining
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
        },

        budgetCalculation: function () {
            // calculate total expense and income
            calculateTotal('exp');
            calculateTotal('inc');

            // Calculate the budget: income - expense
            data.budget = data.totals.inc - data.totals.exp;

            //  calculate percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
                // for example: 100 0f 300; 0.333 * 100; 33.3333; math.round(33.3333); 33%
            } else {
                data.percentage = -1;
            }

        },

        getBudget: function () {
            return {
                totalExp: data.totals.exp,
                totalInc: data.totals.inc,
                budget: data.budget,
                percentage: data.percentage
            }
        },

        testing: function () {
            return data;
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
        expenseContainer: ".expenses__list",
        budgetLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expenseLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage",
    }

    return {
        getDOMInputs: function () {
            return {
                type: document.querySelector(domStrings.type).value,
                description: document.querySelector(domStrings.description).value,
                value: parseFloat(document.querySelector(domStrings.value).value)
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
        },

        clearInputFields: function () {
            var fields, fieldsArr;

            fields = document.querySelectorAll(domStrings.description + ',' + domStrings.value);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function (current, index, arr) {
                current.value = "";
            });

            fieldsArr[0].focus();
        },

        displayBudget: function (obj) {
            document.querySelector(domStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(domStrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(domStrings.expenseLabel).textContent = obj.totalExp;

            if (obj.percentage > 0) {
                document.querySelector(domStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(domStrings.percentageLabel).textContent = '---';
            }
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

    var updateBudget = function () {
        // Calculate the Budget
        budgetCtrl.budgetCalculation();

        // Return the budget
        var budget = budgetCtrl.getBudget();

        // Display the budget on the UI
        UIctrl.displayBudget(budget);
    }

    var controlFunction = function () {
        var input, newItem;

        //1. get Input value from UI
        input = UIctrl.getDOMInputs();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //2. add the item to the budget controller
            newItem = budgetCtrl.addItems(input.type, input.description, input.value);

            //3. add item to the UI
            UIctrl.addListItem(newItem, input.type);

            //4. Clear Input Fields
            UIctrl.clearInputFields();

            //5. Calculate and update budget
            updateBudget();
        }
    }

    return {
        init: function () {
            console.log("App has Inittialized");
            UIctrl.displayBudget({
                totalExp: 0,
                totalInc: 0,
                budget: 0,
                percentage: -1
            });
            setupFunction();
        }
    }

})(budgetController, UIController);


Controller.init(); // App is Initialiased here by calling public Init Method in Controller.