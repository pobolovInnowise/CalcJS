// Команды
class Command {
    constructor(calculator) { // Убрали 'value' из конструктора Command
        this.calculator = calculator;
        this.value = null; // Value будет устанавливаться при необходимости

    }
    execute() {
        throw new Error('method execute should be implemented');
    }
}

// Конкретные Команды (Concrete Commands)

// Бинарные операции (требуют два операнда)
export class AddCommand extends Command {
    constructor(calculator, value) {
        super(calculator);
        this.value = value; // При создании команды
    }
    execute() {
        this.calculator.add(this.value);
    }
}

export class XPowerYCommand extends Command {
    constructor(calculator, value) {
        super(calculator);
        this.value = value; // При создании команды
    }
    execute() {
        this.calculator.xPowerY(this.value);
    }
}

export class XRootYCommand extends Command {
    constructor(calculator, value) {
        super(calculator);
        this.value = value; // При создании команды
    }
    execute() {
        this.calculator.xRootY(this.value);
    }
}

export class SubtractCommand extends Command {
    constructor(calculator, value) {
        super(calculator);
        this.value = value;
    }
    execute() {
        this.calculator.subtract(this.value);
    }
}

export class MultiplyCommand extends Command {
    constructor(calculator, value) {
        super(calculator);
        this.value = value;
    }
    execute() {
        this.calculator.multiply(this.value);
    }
}

export class DivideCommand extends Command {
    constructor(calculator, value) {
        super(calculator);
        this.value = value;
    }
    execute() {
        this.calculator.divide(this.value);
    }
}

// Унарные операции
export class SquareRootCommand extends Command {
    constructor(calculator) {
        super(calculator); // Унарные команды не принимают 'value' в конструкторе
    }
    execute(){
        this.calculator.squareRoot();
    }
}

export class CubeRootCommand extends Command {
    constructor(calculator) {
        super(calculator); // Унарные команды не принимают 'value' в конструкторе
    }
    execute(){
        this.calculator.cubeRoot();
    }
}

export class PowerTwoCommand extends Command {
    constructor(calculator) {
        super(calculator);
    }
    execute() {
        this.calculator.powerTwo();
    }
}

export class InversionCommand extends Command {
    constructor(calculator) {
        super(calculator);
    }
    execute() {
        this.calculator.inversion();
    }
}

export class TenPowerXCommand extends Command {
    constructor(calculator) {
        super(calculator);
    }
    execute() {
        this.calculator.tenPowerX();
    }
}

export class PowerThreeCommand extends Command {
    constructor(calculator) {
        super(calculator);
    }
    execute() {
        this.calculator.powerThree();
    }
}

export class FactorialCommand extends Command {
    constructor(calculator) {
        super(calculator);
    }
    execute() {

        this.calculator.factorial();
    }
}

export class PercentCommand extends Command {
    constructor(calculator, invoker) {
        super(calculator);
        this.invoker = invoker;
    }
    execute() {
        this.calculator.percent(this.invoker);
    }
}

export class ClearCommand extends Command {
    constructor(calculator) {
        super(calculator);
    }
    execute() {
        this.calculator.clear();
    }
}

export class MemoryRecallCommand extends Command {
    constructor(calculator) {
        super(calculator);
    }
    execute() {
        this.calculator.memoryRecall();
    }
}

export class MemoryClearCommand extends Command {
    constructor(calculator) {
        super(calculator);
    }
    execute() {
        this.calculator.memoryClear();
    }
}

export class MemoryAddCommand extends Command {
    constructor(calculator) {
        super(calculator);
    }
    execute() {
        this.calculator.memoryAdd();
    }
}

export class MemorySubtractCommand extends Command {
    constructor(calculator) {
        super(calculator);
    }
    execute() {
        this.calculator.memorySubtract();
    }
}

export class ChangeSignCommand extends Command {
    constructor(calculator) {
        super(calculator);
    }
    execute() {
        this.calculator.changeSign();
    }
}