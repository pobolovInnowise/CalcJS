// --- 4. Вызывающий (Invoker): Менеджер Команд ---
import {ClearCommand} from "../commands/commands.js";

export class CalculatorInvoker {
    constructor(calculator) {
        this.calculator = calculator;
        this.pendingCommand = null;     // Ожидающая команда (Add, Subtract, Multiply, Divide)
    }

    processMemoryButtons(command) {
        command.execute();
    }

    processInput(type, value) {
        let currentDisplay = this.calculator.getDisplayValue();


        if (this.calculator.clearOnNextInput) {
            if (type === 'dot') {
                this.calculator.setDisplayValue('0.');
            } else {
                this.calculator.setDisplayValue(String(value));
            }
            this.calculator.clearOnNextInput = false;
        } else {
            if (type === 'dot') {
                if (!this.calculator.hasDot) {
                    this.calculator.setDisplayValue(currentDisplay + '.');
                }
            } else {
                if (currentDisplay === '0' || currentDisplay === 'ERROR') {
                    this.calculator.setDisplayValue(String(value));
                } else {
                    this.calculator.setDisplayValue(currentDisplay + String(value));
                }
            }
        }


        if(this.calculator.leftOperand !== null){
            this.calculator.readyToExecuteBinaryOperation = true;
        }

    }

    // Принимает объект команды, а не только тип
    processBinaryOperation(command) {
        const currentInputValue = parseFloat(this.calculator.getDisplayValue());

        if (this.pendingCommand && this.calculator.readyToExecuteBinaryOperation === true) {
            try {
                // Если уже есть ожидающая команда, выполняем её с текущим введенным числом
                this.pendingCommand.value = currentInputValue; // Устанавливаем правый операнд
                this.pendingCommand.execute();
                this.calculator.setDisplayValue(String(this.calculator.getLeftOperand()));
                this.calculator.clearOnNextInput = true;
                this.calculator.readyToExecuteBinaryOperation = false;
                this.pendingCommand = command;

            } catch(e) {
                console.error(e);
                this.calculator.setDisplayValue('ERROR');
                this.calculator.leftOperand = 0;
                this.pendingCommand = null;
                this.calculator.clearOnNextInput = true;
                this.calculator.readyToExecuteBinaryOperation = false;
                this.pendingCommand = null;
            }
        } else {
            // Если это первая операция в цепочке, текущее значение дисплея становится левым операндом
            this.calculator.leftOperand = currentInputValue;
            // Сохраняем новую команду как ожидающую
            this.pendingCommand = command;
            this.calculator.readyToExecuteBinaryOperation = false;
            this.calculator.clearOnNextInput = true;
        }

    }

    // Принимает объект команды
    processUnaryOperation(command) {
        try {
            command.execute();
        } catch(e) {
            console.log(e)
            this.calculator.setDisplayValue('ERROR');
            this.calculator.leftOperand = 0;
            this.pendingCommand = null;
            this.calculator.clearOnNextInput = true;
            this.calculator.readyToExecuteBinaryOperation = false;
            this.pendingCommand = command;
        }
    }

    processEquals() {
        const currentInputValue = parseFloat(this.calculator.getDisplayValue());

        if (this.pendingCommand) {
            try {
                this.pendingCommand.value = currentInputValue; // Устанавливаем правый операнд для ожидающей команды
                this.pendingCommand.execute();
                this.calculator.setDisplayValue(String(this.calculator.getLeftOperand()));
            } catch (e) {
                console.log(e)
                this.calculator.setDisplayValue('ERROR');
                this.calculator.leftOperand = 0;
                this.pendingCommand = null;
                this.calculator.clearOnNextInput = true;
                this.calculator.readyToExecuteBinaryOperation = false;
            } finally {
                this.pendingCommand = null; // Очищаем ожидающую команду
                this.calculator.clearOnNextInput = true;
            }
        }
    }

    processClear() {
        const clearCommand = new ClearCommand(this.calculator); // Создаем команду очистки
        clearCommand.execute(); // Выполняем ее
        this.pendingCommand = null;
        this.calculator.clearOnNextInput = false;
        this.calculator.setDisplayValue('0');
    }
}