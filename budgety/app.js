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

})();

//UI Module: for interacting and updating the UI
var UIController = (function () {

    var domStrings = {
        type: '.add__type',
        description: '.add__description',
        value: '.add__value',
        addBtn: ".add__btn"
    }

    return {
        DOMInputs: function () {
            return {
                type: document.querySelector(domStrings.type).value,
                description: document.querySelector(domStrings.description).value,
                value: document.querySelector(domStrings.value).value
            }
        },
        DOMStrings: function () {
            return domStrings;
        }
    }
})();

//App Controller Module: Middleman of Budget and UI Module
var Controller = (function (budgetCtrl, UIctrl) {

    var setupFunction = function () {
        var DOM = UIctrl.DOMStrings();

        document.querySelector(DOM.addBtn).addEventListener('click', controlFunction);
        document.addEventListener("keypress", function (e) {
            if (e.which === 13 || e.keyCode === 13) {
                controlFunction();
            }
        });
    }

    function controlFunction() {
        //1. get Input value from UI

        //2. Update UI add Income or Expense 
    }

    return {
        init: function () {
            console.log("App has Inittialized");
            setupFunction();
        }
    }

})(budgetController, UIController);


Controller.init(); // App is Initialiased here by calling public Init Method in Controller.