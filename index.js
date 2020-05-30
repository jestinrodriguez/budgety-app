/***********************
  TO DO LIST
  
  1. Add Event Handler
  2. Get input values
  3. Add new item to new data structure (income/expense)
  4. add new item to UI
  5. Calculate Budget
  6. Update UI

 */


 // Modules 
 // important aspect of any robust application architecture
 // keep the units of code for project both cleanly separated and organized
 // encapsulate some data into privacy and expose other data publicly
 // allows us to break up code into logical parts into moduels and make them interact with one another
 

 /******************
  * How to use module pattern;
  * More about private and public data, encapsulation and separation of concerns
    
    
    Methods
    Private - only accessible inside module so that no other code can over ride our data
    Public - exposed to the public so that other functions or modules can access or use them this is called data encapsulation
    Data Encapsulation - allows us to hide inplemenatation details of a module from the outside scope so that we only expose
    a public interface sometimes called API

    Module Patterns - Need to know closures and IIFE




    // How to write module with the module pattern
// this variable is going to be an IIFE 
// that will return an object

// IIFE - Immediately Invoked Function Expression
//      - Anonymous function wrapped in parenthesis
//      - allows data privacy because it creates a new scope
//        that is not visible from the outside scope


let budgetController = (function(){
    //private code
    
    let x = 23;
    
    // private add function
    let add = function(a){
        return x + a;
    }


    // CLOSURES - inner functions has access to its outer functions even after outer function returned / executed
    // the IIFE here returns immediately and so its gone
    // but 'publicTest' function has access to the add function and x variable because a CLOSURE was created
    // PUBLIC - publicTest
    // PRIVATE - x variable and add function
    return {
        // Method
        // can be accessed
        publicTest: function (b){
            return(add (b));
        }
    }


})();

// Module pattern secret is that it returns an object containing all of the functions
// that we want to be public so the functions that we want to give the outside scope access to

// Separation of concerns - each part of app should only do one thing independently
// These two controllers dont know about each other they are stand-alone




let UIController = (function(){
    // Some Code
})();
                                // for interaction between the two
let appController = (function(budgetCtrl,UICtrl){
    // Some Code

    let z = budgetCtrl.publicTest();

    return {
        anotherPublic: function(){
            console.log(z);
        }
    }

})(budgetController,UIController);
    
    

  */



 /***************
  * Setting up first Event listeners
  - How to set up event listeners for keypress events
  - how to use event object
   
  */

  /*************
   * Reading Input data
    How to read data from different HTML input types
   */



   /************
    * Creating an initialization function
    * how to create an initialization function
    *
    */


   /**************
    * Creating income and expense function constructors
     - How to choose function constructors that meet our application's needs
     - How to set up a proper data structure for our budget controller
    

     storing income and expense data in budget controller
    */

    /************* 
     * Creating a new item for our budget controller
       - How to avoid conflicts in our data structures
       - How and why to pass data from module to another

     */


     /**************
      * Adding a NEW ITEM in the UI
       - A technique for adding big chunks of HTML into the DOM
       - How to replace parts of strings;
       - How to do DOM manipulation using insertAdjacentHTML method
      */


      /*************
       * Clearing our input fields
       *  - How to clear HTML fields
       *  - How to use querySelectorAll
       *  - How to convert a list into an array
       *  - a better way to loop over an array than for loops: for each
       */

       /*************
        * Updating the Budget: Controller
          - How to convert fields inputs to numbers
          - How to prevent false inputs
        */

        /************
         * Updating the budget: Budget controller
          - How and why to create simple reusable functions with only one purpose
          - How to sum all elements of an array using the forEach method
         */

         /***********
          * Updating the Budget: UI controller
          - Practice DOM manipulation by updating budget total and values
          */

        /******************
         * PLANNING STEP 2
          - Adde Event Handler
          - Delete the item from our data structure
          - Delet the item to the UI
          - Recalculate Budget
          - Update UI
         */

         /****************
          * Event Delegation 
            Event Bubbling - means that when an event is fired, on DOM element, EXAMPLE by clicking then the exact same event is  triggered on its parent element one at a time
            all the way up the DOM tree
            - event bubbles up in dom tree
            Target element - the element that caused the action

            Event delegation - Event can be attached to the parent element then we can wait for it to bubble up and do what we can do to the target element
                             - Not setting it up on the original element that we're interested in but attaching it to the parent until it bubbles up until we can catch the target element
            
            Use Cases for event delegation 
            1. When we have element with lots of child elements that we are interested in 
            2. When we want an event handler attached to an element that is not yet in the DOM when our page is loaded

          *
          */


          /*****************
           * Setting up the delete event listener using event delegation
            - How to use event delegation in practice (using concepts of event bubbling and target element)
            - How to use IDs in HTML to connect the UI with the data model
            - How to use the parentNode property for DOM traversing
           
            DOM traversing
            */

            /**************
             * Deleting an item from our budget controller
               - Yet another method to loop over an array: map;
               - How to remove elements from an array using splice method
             */


             /************
              * Deleting an Item from a UI
               - More DOM manipulation and how to remove element from a DOM           
              */

              /***********
               * Project Planning and Architecture step 3
                 - Calculate Percentages
                 - Update percentages in UI
                 - Display current month and year
                 - Number formatting
                 - Improve UX input field
               */

               /**********
                * Updating the percentages: Controller
                 - Reinforcing the concepts and techniques we have learned so far
                */

                /*********
                 * Updating the Percentages: Budget Controller
                  - How to make budget controller interact with the expense prototype
                 */

                 /*********
                  * Updating the percentages in the UI controller
                    - Updating the percentages :  UI controller 
                   
                  */

                  /*********
                   Formatting our budget numbers :  string manipulation 
                    - How to use different strings methods to manipulate strings
                   */

                  /********
                   * Displaying the curent month and year
                     -How to get the current date by using the Date object constructor
                     
                   */


                   /********
                    * Finishing touches: Improving the UX
                     - How and when to use 'change' events
                    */