// --- Использование и связывание с HTML ---
import {Calculator} from "../receiver/receiver.js";
import {CalculatorInvoker} from "../invoker/invoker.js";
import {
    AddCommand, ChangeSignCommand,
    ClearCommand,
    CubeRootCommand,
    DivideCommand,
    FactorialCommand,
    InversionCommand,
    MemoryAddCommand,
    MemoryClearCommand,
    MemoryRecallCommand,
    MemorySubtractCommand,
    MultiplyCommand, PercentCommand,
    PowerThreeCommand,
    PowerTwoCommand,
    SquareRootCommand,
    SubtractCommand,
    TenPowerXCommand,
    XPowerYCommand,
    XRootYCommand
} from "../commands/commands.js";

// Клиент: Создание и использование команд

const calculator = new Calculator(); // Наш получатель
const invoker = new CalculatorInvoker(calculator); // Наш менеджер команд

// Функция для создания команды по её типу
function createCommand(commandType, calcInstance, value = null) {
    switch (commandType) {
        case 'add': return new AddCommand(calcInstance, value);
        case 'subtract': return new SubtractCommand(calcInstance, value);
        case 'multiply': return new MultiplyCommand(calcInstance, value);
        case 'divide': return new DivideCommand(calcInstance, value);
        case 'square-root': return new SquareRootCommand(calcInstance);
        case 'cube-root': return new CubeRootCommand(calcInstance);
        case 'power-two': return new PowerTwoCommand(calcInstance);
        case 'power-three': return new PowerThreeCommand(calcInstance);
        case 'x-power-y': return new XPowerYCommand(calcInstance, value);
        case 'x-root-y': return new XRootYCommand(calcInstance, value);
        case 'factorial': return new FactorialCommand(calcInstance);
        case 'inversion': return new InversionCommand(calcInstance);
        case 'ten-power-x': return new TenPowerXCommand(calcInstance);
        case 'percent': return new PercentCommand(calcInstance, invoker);
        case 'change-sign': return new ChangeSignCommand(calcInstance);
        case 'clear': return new ClearCommand(calcInstance);
        case 'memory-recall': return new MemoryRecallCommand(calcInstance);
        case 'memory-clear': return new MemoryClearCommand(calcInstance);
        case 'memory-add': return new MemoryAddCommand(calcInstance);
        case 'memory-subtract': return new MemorySubtractCommand(calcInstance);
        default: return null;
    }
}

const leftOperand = document.getElementById('leftOperand');
const displayValue = document.getElementById('displayValue');
const clearOnNextInput = document.getElementById('clearOnNextInput');
const hasDot = document.getElementById('hasDot');
const readyToExecuteBinaryOperation = document.getElementById('readyToExecuteBinaryOperation');

const themeChangeButton = document.getElementById('theme-toggle');
const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number-btn');
const binaryOperationButtons = document.querySelectorAll('.binary-operation'); // Бинарные операции
const unaryOperationButtons = document.querySelectorAll('.unary-operation'); // Унарные операции
const equalsButton = document.getElementById('equals-btn');
const clearButton = document.getElementById('clear-btn');
const memoryButtons = document.querySelectorAll('.memory');

themeChangeButton.addEventListener('click', ()=>{
    const currentTheme = document.body.className;
    if (currentTheme === 'light') {
        document.body.className = 'dark';
        themeChangeButton.innerText = 'change to light';
    } else {
        document.body.className = 'light';
        themeChangeButton.innerText = 'change to dark';
    }
})

function updateDisplay() {

    display.textContent = calculator.getDisplayValue().toString();

    leftOperand.innerText = calculator.leftOperand;
    displayValue.innerText = calculator.displayValue;
    clearOnNextInput.innerText = calculator.clearOnNextInput;
    hasDot.innerText = calculator.hasDot;
    readyToExecuteBinaryOperation.innerText = calculator.readyToExecuteBinaryOperation;
    console.log(invoker.pendingCommand)
}

updateDisplay();

memoryButtons.forEach((button)=>{
    button.addEventListener('click',()=>{
        const commandType = button.dataset.command;
        const command = createCommand(commandType, calculator, 0); // Значение будет установлено позже
        invoker.processMemoryButtons(command);
        updateDisplay();
    })
})

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const inputType = button.dataset.type || 'number';
        const inputValue = button.textContent;
        invoker.processInput(inputType, inputValue);
        updateDisplay();
    });
});

binaryOperationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const commandType = button.dataset.command;
        const command = createCommand(commandType, calculator, 0); // value будет установлено позже
        invoker.processBinaryOperation(command);
        updateDisplay();
    });
});

unaryOperationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const commandType = button.dataset.command;
        const command = createCommand(commandType, calculator); // Унарные команды не требуют value в конструкторе
        invoker.processUnaryOperation(command);
        updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    invoker.processEquals();
    updateDisplay();
});

clearButton.addEventListener('click', () => {
    invoker.processClear(); // Теперь ClearCommand создается внутри processClear()
    updateDisplay();
});