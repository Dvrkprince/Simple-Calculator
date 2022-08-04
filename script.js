
class Calculator{

    //Constructor
    constructor(previousOperandTextElement,currentOperandTextElement){
        //sets the variables to the passed agruments
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear(); 
    }
    

    clear(){
        //The clear() method removes all elements from the output
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;

    }

    delete(){
        //takes the characters of the current operand from the beginning to the the 2nd to last character
        //and stores it in the currentOperand. Thus, deleting the last character of the operand
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        //checks to see if number already contains a .
        if(number === "." && this.currentOperand.includes(".")) return
        //convert to strings because javascript may try to add the numbers rather than appending
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === ""){
            return;
        }
        if(this.previousOperand != ""){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand =  this.currentOperand;
        this.currentOperand = "";
        
    }

    compute(){
        //this.previousOperand this.operation this.currentOperand
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)){
            return;
        }
        switch(this.operation){
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;    
            case "/":
                computation = prev / current;
                break;
            case "*":
                computation = prev * current;
                break;
            default :
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
        
    }

    //helper function
    getDisplayNumber(number){
        const stringNumber = number.toString()
        //first number in the array is before the period
        //second number in the array is after the period
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        const floatNumber = parseFloat(number);
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay = "";    
        }else {
            integerDisplay = integerDigits.toLocaleString("en",{
                maximumFractionDigits: 0});
        }
        if(decimalDigits != null)
        {
            return `${integerDisplay}.${decimalDigits}`;
        }else{
            return integerDisplay;
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand);
        if (this.operation != null){
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else{
            this.previousOperandTextElement.innerText = "";
        }
    }
}

//Global Variables
//-------------------------------------------BUTTONS DECLARATION-------------------------------------------\\
//document.querySelectorAll Returns a Node List (similar to an array) of elements with that attribute.
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
//document.querySelector returns the first Element within the document that matches the specified selector(attribute in this case).
//this is okay to use for the below since there is only one of each of these attirubtes being used throughout the document.
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');



//Create a new calculator object
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);


//Loop over each number button in the numberButtons array
//button represents the current element being processed in the array.
numberButtons.forEach(button => {
    //Add and eventListener of click to each button
    //When the button is clicked it's inner text is taken an added to the output screen
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})


//Loop over each number button in the operationButtons array
//button represents the current element being processed in the array.
operationButtons.forEach(button => {
    //Add and eventListener of click to each button
    //When the button is clicked it's inner text is taken an added to the output screen
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

//Equals Button
equalsButton.addEventListener('click', button =>{
    calculator.compute();
    calculator.updateDisplay();
})

//Clear Button
allClearButton.addEventListener('click', button =>{
    calculator.clear();
    calculator.updateDisplay();
})

//delete Button
deleteButton.addEventListener('click', button =>{
    calculator.delete();
    calculator.updateDisplay();
})





