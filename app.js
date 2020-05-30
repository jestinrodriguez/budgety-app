
// BUDGET CONTROLLER
let budgetController = (function(){
   

    // function constructor
    // if there is a method, these properties can be inherited (prototype) 
    let Expense = function (id,description,value){
        this.id = id;
        this.description  = description;
        this.value = value;
        this.percentage = -1;
    };

    //prototype property
    Expense.prototype.calcPercentage = function (totalIncome){

        if (totalIncome > 0){
        this.percentage = Math.round((this.value / totalIncome) * 100)
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    };

    let Income = function (id,description,value){
        this.id = id;
        this.description  = description;
        this.value = value;
    };

    // calculate income or expenses
    let calculateTotal = function(type){ 

        let sum = 0;
        data.allItems[type].forEach(function(cur){
            sum += cur.value;

        });
        // storing data totals
        data.totals[type] = sum;
    };

    // DATA STRUCTURE
    // place to store all of the data
    let data = {
        //object
        allItems: {
            exp: [],
            inc: []
        },
        //object
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage : -1
    };

    //public method to allow other modules to add new item to data structure
    // return object containing all of public methods
    return {
        addItem: function(type, des, val){
            let newItem, ID;

            
            // ID = last ID + 1
            //[1,2,6,9,12]
            //create new ID

            //create new ID
            if (data.allItems[type].length > 0){
                                                 //last element
                ID = data.allItems[type][data.allItems[type].length-1].id + 1;
                ID = data.allItems[type][data.allItems[type].length-1].id + 1;
            } else {
                ID = 0;
            }

          
            // create new item based on 'inc' or 'exp' type
            if (type === 'exp'){
                newItem = new Expense(ID,des,val);
            } else if (type === 'inc'){
                newItem = new Income(ID,des,val);
            }
            
            // pushing it in our data structure
            data.allItems[type].push(newItem);

            // returning new elemnt
            return newItem;
        },

        deleteItem: function (type, id){
            let ids, index;
            // id  = 6;
            // data.allItems[type][id];
            //ids = [1 2 4 6 8]
            // index = 3
            
            // map - returns new array
            ids = data.allItems[type].map(function(current){
                return current,id;
            });

            index = ids.indexOf(id);

            if (index !== -1){
                // delete using splice
                data.allItems[type].splice(index,1);

            }

            
        },

        calculateBudget: function(){

            // calculate total income and expenses  
            calculateTotal('exp');
            calculateTotal('inc');

            // retrieve our data
            // then calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate the percentage of income that was spent
            if (data.totals.inc > 0){
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }

        },

        calculatePercentages: function(){

            /*
            a = 20  
            b = 10
            c = 40
            income =  100
            a = 20%
            b = 10%
            c = 40%            

             */

             data.allItems.exp.forEach(function(cur){
                cur.calcPercentage(data.totals.inc);

             });
            
        },

        getPercentages: function (){
            let allPercentage

            // returns the percentages in an array
            allPercentage = data.allItems.exp.map(function(cur){
                return cur.getPercentage();

            });
            return allPercentage;
            
        },

        getBudget : function(){

            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage

            }
        },

        // testing private data structure 'data' 
        testing: function(){
            console.log(data);
        }
    };


})();



// UI CONTROLLER
let UIController = (function(){
    let formatNumber , DOMstrings;
    // private variable 
    // place to store all of the string data to make it easier to change or retrieve

    DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer:'.income__list',
        expensesContainer:'.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };


    formatNumber = function(num,type){
        let numSplit, int, dec;
        // + or - before the number
        // 2 decimal places
        // comma separating thousands
        // 1020.22 -> + 1,020.22

        num  = Math.abs(num);
            // method of 'number' prototype
        num  = num.toFixed(2); // returns a string

        // splits number into 2 then stores it in array
        // 1020.22 -> [1020, 22]
        numSplit = num.split('.');

        int = numSplit[0];

        if (int.length > 3){
            //substring allows us to take part of the string
            int = int.substr(0, int.length -3 ) + ',' + int.substr(int.length -3, 3); // input 2310 , output = 2,310

        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.'+ dec;

        };

         // for each function for any node list
         let nodeListForEach = function (list,callback){
            for (let i = 0; i  < list.length; i++){
                callback(list[i], i);
            }
        }; 


    return {
        getInput: function(){
            //return object containing all of these properties so that all of it will be sent and called by the other module
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value) // parseFloat converts string into floating number
            };           
        },

        // new public method
        // new item is going to be passed here
        addListItem: function(obj, type){
            let html, newHtml, element;
            // 1. Create HTML string with place holder
            
            if (type === 'inc'){
                element =  DOMstrings.incomeContainer;
            html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp'){
                element = DOMstrings.expensesContainer;
            html ='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }



            // 2. Replace the placeholder text with some actual data
            
            // replace method
            newHtml =  html.replace('%id%', obj.id)
            // overwriting new variable 'newHtml' 
            newHtml =  newHtml.replace('%description%', obj.description);
            newHtml =  newHtml.replace('%value%', formatNumber(obj.value , type));
           
            // 3. Insert HTML into DOM
            // insertAdjacentHTML - using beforeend to insert new items at the last as a child of the element
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
            

        },


        deleteListItem: function(selectorID){
            let el;
        // elements cannot be deleted in JS (child must be removed)
        // remove child method
        
        el = document.getElementById(selectorID);
        el.parentNode.removeChild(el);

        },

        clearFields: function (){
            let fields, fieldsArr;

            // returns a list
            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);

            // array prototype
            // convert list into array
            fieldsArr = Array.prototype.slice.call(fields);

            //  for each method
            // pass a callback function into this method
            // then call back function is applied to each elements in the array
            // current value of the array, index number, and entire array
            
            fieldsArr.forEach(function(current,index,array){
                // clearing fields
                current.value = "";
            });

            // sets focus on first element of array
            fieldsArr[0].focus();
        },

        displayBudget: function(obj){
            let type;
            obj.budget > 0 ?  type = 'inc' : type = 'exp';

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);

            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');

            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');

           

            if(obj.percentage > 0 ){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%'; 
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }

        },

        displayPercentages : function (percentages){
            let fields;
            // returns a node list
            // each element stored in the DOM tree is called a node
            // we used parent node before
            fields = document.querySelectorAll(DOMstrings.expensesPercLabel);


           



            // applying the foreach function
            nodeListForEach(fields, function(current, index){

                if(percentages[index] > 0){
                
                    current.textContent = percentages[index] + '%';
                
                } else {
                    current.textContent = percentages[index] + '---';
                
                }

               
            });



        },

        
        displayMonth: function(){
            let now, year, month, months;
            
            // object constructors
            
            now = new Date();

            //let christmas = new Date(2016, 11,25);
            months = ['January', 'February','March', 'April','May' ,'June','July', 'August','September','October' ,'November' ,'December'];
            month = now.getMonth();
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },

        changedType: function(){
          let fields;
            // styles manipulation
            // returns node list
            fields =  document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue);

            nodeListForEach(fields,function(cur){
                cur.classList.toggle('red-focus')
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },




        // passing the object from one module to another module
        // exposing DOMstrings object into public
        getDOMstrings: function(){
            return DOMstrings;
        }

    };

    
})();




// GLOBAL APP CONTROLLER
let appController = (function(budgetCtrl,UICtrl){

     
    let setupEventListeners = function(){
        
    // to access the DOMstrings
    let DOM = UICtrl.getDOMstrings(); // where inputBtn is stored and no longer DOMstrings
    
                       //input btn is called DOM because it the variable where it is stored      
                       //DOMstrings is not also defined here 
                       document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem); //ctrlAddItem will be called when it is clicked (callback)


                       // global key press 'enter'
                       document.addEventListener('keypress', function (event){
                           // When enter is pressed    // older browsers with no keyCode property
                           if (event.keyCode === 13 || event.which === 13){
                              ctrlAddItem();
                           }
                       
                       });

                       // for event delagation
                       document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);

                       document.querySelector(DOM.inputType).addEventListener('change',UICtrl.changedType);


    };



    //this is called each time a new item is entered in the UI
    let updateBudget = function(){
        let budget;
    // 1. Calculate budget
        budgetCtrl.calculateBudget();

    // 2. Return the budget
        budget = budgetCtrl.getBudget();

    // 3. display the budget on UI
        UICtrl.displayBudget(budget);
    };

    
    let updatePercentages = function(){
        let percentages;
    // 1. Calculate percentages
    budgetCtrl.calculatePercentages();

    // 2. Read percentages from the budget controller
    percentages = budgetCtrl.getPercentages();
    
    // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);

    };

    // control center tells other module what to do
    // item will be added when enter key or input button is pressed
    // called each time a new element is inputted
    let ctrlAddItem = function (){
        // variable declaration
        let input, newItem
        
    // 1. get input filled input data
       input = UICtrl.getInput();
       
       // checking if there is significant data 
       if (input.description !== "" && !isNaN(input.value) &&input.value > 0 ) {
    // 2. add item to budget controller
        // addItem returns an object
       newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    // 3. add new item to UI
        UICtrl.addListItem(newItem,input.type);

    // 4. Clear the fields fields
        UICtrl.clearFields();
    // 5. Calculate and update budget
        updateBudget();
       }
    //6. Calculate and update percentages 
        updatePercentages();
   
    };

    let ctrlDeleteItem = function(event){
        let itemID, splitID, type, ID;

        //DOM traversing
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID){
            
            //split 

            //inc - 1
            splitID = itemID.split('-'); 
            type = splitID[0];

            // returned a string that's why it was converted into integer
            ID = parseInt(splitID[1]);
            
            // 1. delete item in Data structure
            budgetCtrl.deleteItem(type, ID);

            // 2. delete item from UI
            UICtrl.deleteListItem(itemID);

            // 3. update and show the new budget
            updateBudget();
            // 4. Calculate and update percentages 
            updatePercentages();

            




        }

    };


    //public initialization to call private functions

    return {
        init: function(){
            console.log('App has started');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };




})(budgetController,UIController);


// to initialize the whole application
// runs or calls the event listeners
appController.init();









