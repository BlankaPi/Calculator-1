window.onload = function () {
    console.log("Hello calculator!");
    window.alert(`Please note:
- the calculator is not for scientific purposes
- you can enter up to 9 numbers`)
};

const form = document.getElementById("calc-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
});

class Calculator {

    //constructing a calculator
    constructor(previousOperantNode, currentOperantNode) {
        this.previousOperantNode = previousOperantNode;
        this.currentOperantNode = currentOperantNode;
        this.clear();
    }

    //calculator functions

    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operator = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);      
    }

    
    percent() {
        if (this.currentOperand !== "") {
            this.currentOperand = parseFloat(this.currentOperand) / 100;
        } else {
            return
        }
    }

    // taking number from the button
    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        if (this.currentOperand.length >= 9) return;

        this.currentOperand = this.currentOperand.toString() + number.toString()
        
    }

    // choosing the operator
    chooseOperator(operator) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if(isNaN(prev) || isNaN(current)) return;
        
        switch(this.operator) {
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
            default:
                return;   
        }

        console.log(computation);
        let compString = computation.toString();
        if (compString.length > 9) {
            this.previousOperand = "result is rounded";
            console.log(this.previousOperand);
            if (compString.includes(".")) {
                switch(compString.indexOf(".")) {
                    case 1:
                        computation = computation.toFixed(7);
                        break;
                    case 2:
                        computation = computation.toFixed(6);
                        break;
                    case 3:
                        computation = computation.toFixed(5);
                        break;
                    case 4:
                        computation = computation.toFixed(4);
                        break;
                    case 5:
                        computation = computation.toFixed(3);
                        break;
                    case 6:
                        computation = computation.toFixed(2);
                        break;
                    case 7:
                        computation = computation.toFixed(1);
                        break;
                    case 8:
                        computation = computation.toFixed(0);
                        break;
                    default:
                        return;                
                    }
            }
        }

        this.currentOperand = computation;
        console.log(computation);        

        this.operator = undefined;
        if (compString.length <= 9) {
            this.previousOperand = "";
        }
    } 

    // showing the number in viewer
    updateDisplay() {
        this.currentOperantNode.innerText = this.currentOperand;
        this.previousOperantNode.innerText = this.previousOperand;
        if (this.operator != null) {
            this.previousOperantNode.innerText = 
                this.previousOperand + this.operator;
        }        
    }
}

// buttons
const operandButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".delete");
const percentButton = document.querySelector(".percent");

//output
const previousOperantNode = document.querySelector("[data-previous-operand]");
const currentOperantNode = document.querySelector("[data-current-operand]");

//creating "new Calculator"

const calculator = new Calculator(previousOperantNode, currentOperantNode);


// why "current target"??
operandButtons.forEach((button) => {
    button.addEventListener("click", (e) => {       
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calculator.chooseOperator(button.innerText)
        calculator.updateDisplay()
    })
})


equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
})


clearButton.addEventListener("click", button => {
    // button.classList.add("active");
    calculator.clear();
    calculator.updateDisplay();
})


deleteButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
})


percentButton.addEventListener("click", button => {
    calculator.percent();
    calculator.updateDisplay();
})

// adding active class to buttons

operandButtons.forEach((button) => {
    button.addEventListener("mousedown", (e) => {
        e.currentTarget.classList.add("active");              
    })
})


operandButtons.forEach((button) => {
    button.addEventListener("mouseup", (e) => {
        e.currentTarget.classList.remove("active");              
    })
})

operatorButtons.forEach((button) => {
    button.addEventListener("mousedown", (e) => {
        e.currentTarget.classList.add("active");              
    })
})


operatorButtons.forEach((button) => {
    button.addEventListener("mouseup", (e) => {
        e.currentTarget.classList.remove("active");              
    })
})



clearButton.addEventListener("mousedown", button => {
    button.currentTarget.classList.add("active");
})

clearButton.addEventListener("mouseup", button => {
    button.currentTarget.classList.remove("active");
})


equalsButton.addEventListener("mousedown", button => {
    button.currentTarget.classList.add("active");
})

equalsButton.addEventListener("mouseup", button => {
    button.currentTarget.classList.remove("active");
})


percentButton.addEventListener("mousedown", button => {
    button.currentTarget.classList.add("active");
})

percentButton.addEventListener("mouseup", button => {
    button.currentTarget.classList.remove("active");
})


deleteButton.addEventListener("mousedown", button => {
    button.currentTarget.classList.add("active");
})

deleteButton.addEventListener("mouseup", button => {
    button.currentTarget.classList.remove("active");
})



document.addEventListener("keydown", function(event) {
    let key_code = event.key;

    switch (key_code) {
        case "0":
            console.log("0");
            break;
        case "1":
            console.log("1");
            break;
        case "2":
            console.log("2");
            break;    
        case "3":
            console.log("3");
            break;
        case "4":
            console.log("4");
            break;
        case "5":
            console.log("5");
            break;
        case "6":
            console.log("6");
            break;
        case "7":
            console.log("7");
            break;
        case "8":
            console.log("8");
            break;
        case "9":
            console.log("9");
            break;
    } 
}); 