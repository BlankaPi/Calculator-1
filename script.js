window.onload = function () {
    console.log("Hello calculator!");
    // calculator.init();
};

const form = document.getElementById("calc-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
});

class Calculator {

    //konstruuję kalkulator
    constructor(previousOperantText, currentOperantText) {
        this.previousOperantText = previousOperantText;
        this.currentOperantText = currentOperantText;
        this.clear();
    }

    //przypisuję kalkulatorowi odpowiednie funkcje

    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operator = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);        
    }

    
    percent() {
        this.currentOperand = parseFloat(this.currentOperand) / 100;
    }

    // pobiera numer z guzika
    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        if (this.currentOperand.length >= 9) return;

        this.currentOperand = this.currentOperand.toString() + number.toString()
        
    }

    //wybranie operatora 
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

        this.currentOperand = computation;
        this.operator = undefined;
        this.previousOperand = "";

    }

    //pokazuje numer w okienku
    updateDisplay() {
        this.currentOperantText.innerText = this.currentOperand;
        this.previousOperantText.innerText = this.previousOperand;
        if (this.operator != null) {
            this.previousOperantText.innerText = 
                this.previousOperand + this.operator;
        }

        
    }
}

// buttons
const operandButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("button[data-type=operator]");
const clearButton = document.querySelector("button[data-type=clear]");
const equalsButton = document.querySelector("button[data-type=equals]");
const deleteButton = document.querySelector("button[data-type=delete]");
const percentButton = document.querySelector("[data-percent]");

//output
const previousOperantText = document.querySelector("[data-previous-operand]");
const currentOperantText = document.querySelector("[data-current-operand]");

//tworzę nowy kalkulator

const calculator = new Calculator(previousOperantText, currentOperantText);


// dlaczego current target??
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


























/* operandButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.currentTarget.classList.toggle("active");

        let isOperator = false;
        //console.log(e.target.value);

        //dlaczego "currentTarget"?

        if (input.value == "0") {
            input.value = e.target.value;
        } else if (input.value.includes(".")) {
            input.value = input.value + e.target.value.replace(".", "");
        } else if (isOperator) {
            input.value = e.target.value;
        } else {
            input.value = input.value + e.target.value;
        }

        //console.log(input.value);
    })
})

let result = [];

operatorButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.currentTarget.classList.add("active");

        let lastItem = result[result.length - 1];

        if (e.target.value == "%") {
            input.value = parseFloat(input.value) / 100;
        } else if (e.target.value == "invert") {
            input.value = parseFloat(input.value) * -1;
        } else if (e.target.value == "=") {
            result.push(input.value);
            console.log(result);
            input.value = eval(result.join(""));
            result = [];
        } else if (["/", "*", "-", "+"].includes(lastItem)) {
            result.pop();
            result.push(e.target.value);
        } else {
            result.push(input.value);
            result.push(e.target.value);
        }
        
    })
}) */

