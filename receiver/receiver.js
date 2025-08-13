// --- 2. Получатель (Receiver): Наш Калькулятор ---
export class Calculator {

    constructor() {
        this.leftOperand = null; // Текущий результат / левый операнд
        this.displayValue = '0'; // Что показывается на дисплее (строка)
        this.clearOnNextInput = false; // Флаг для очистки дисплея после операции/равно
        this.hasDot = false; // Флаг, указывающий, есть ли уже десятичная точка в текущем числе
        this.memoryValue = 0;
        this.readyToExecuteBinaryOperation = false;
    }

    roundResult(value, precision = 10) {

        function round(value) {                   //  вместо math.Random()
            const sign = value >= 0 ? 1 : -1;
            const absValue = sign * value; // Это то же самое, что Math.abs(value)
            const valuePlusHalf = absValue + 0.5;
            const integerPart = parseInt(valuePlusHalf, 10);
            return integerPart * sign;
        }
        return (round(value * (10 ** precision))) / (10 ** precision);
    }

    add(value) {
        this.leftOperand = this.leftOperand + value;
    }

    subtract(value) {
        this.leftOperand = this.leftOperand - value;
    }

    multiply(value) {
        this.leftOperand = this.leftOperand * value;
    }

    divide(value) {

        if (value === 0) {
            throw new Error("Division by zero");// Бросаем ошибку, чтобы остановить выполнение
        }
        else {
            this.leftOperand = this.leftOperand / value;
        }

    }

    squareRoot() {
        let currentDisplay = parseFloat(this.getDisplayValue());
        if (currentDisplay < 0) {
            throw new Error("Square root from negative value");
        } else {
            currentDisplay = currentDisplay ** (1 / 2);
            this.setDisplayValue(currentDisplay.toString());
        }
    }

    cubeRoot() {
        let currentDisplay = parseFloat(this.getDisplayValue());

        let isNegative = false;
        if(currentDisplay<0){
            isNegative=true;
            currentDisplay*=(-1);
        }

        currentDisplay = currentDisplay ** (1 / 3); // ** работает только положит числами!
        if(isNegative)currentDisplay*=(-1);
        this.setDisplayValue(this.roundResult(currentDisplay).toString());
    }

    powerTwo() {
        let currentDisplay = parseFloat(this.getDisplayValue());
        currentDisplay = currentDisplay * currentDisplay;
        this.setDisplayValue(currentDisplay.toString());
    }

    tenPowerX() {
        let currentDisplay = parseFloat(this.getDisplayValue());
        currentDisplay = 10 ** currentDisplay;
        this.setDisplayValue(currentDisplay.toString());
    }


    powerThree() {
        let currentDisplay = parseFloat(this.getDisplayValue());
        currentDisplay = currentDisplay * currentDisplay * currentDisplay;
        this.setDisplayValue(currentDisplay.toString());
    }

    xPowerY(n) {
        this.leftOperand = this.roundResult(this.leftOperand ** n);
    }

    xRootY(n) {

        function customNthRoot(x, n) {
            if (n === 0) {
                throw new Error("Cannot take root of degree zero");
            }
            if (x === 0) {
                return 0;
            }

            let sign = 1;
            if (x < 0) {
                // Здесь проверка: если n (степень корня) четная и x отрицательное, то бросаем ошибку
                if (n % 2 === 0) {
                    throw new Error("Cannot take even root of negative number");
                }
                sign = -1;
                x = -x; // Работаем с абсолютным значением для метода Ньютона
            }

            let guess = x / n;
            if (guess === 0) guess = 1;

            const iterations = 50;
            const tolerance = 1e-12;

            for (let i = 0; i < iterations; i++) {
                let prevGuess = guess;
                let guessPowerNMinus1 = 1;
                for (let j = 0; j < n - 1; j++) {
                    guessPowerNMinus1 *= guess;
                }
                guess = ((n - 1) * guess + x / guessPowerNMinus1) / n;
                if (Math.abs(guess - prevGuess) < tolerance) {
                    break;
                }
            }

            return sign * guess;
        }


        let X = parseFloat(this.getLeftOperand());

        let result;
        if (n < 0) {
            // Обработка случая X^(1/-|n|) = 1 / X^(1/|n|)
            if (X === 0) {
                // 0 в отрицательной степени - это ошибка
                throw new Error("Cannot take root of degree zero");
            }
            const absN = -n; // Положительное значение показателя корня
            const rootOfX = customNthRoot(X, absN); // Вычисляем корень из X с положительным показателем
            result = 1 / rootOfX;
        } else {
            // Обычный случай X^(1/n)
            result = customNthRoot(X, n);
        }

        const roundedResult = this.roundResult(result);
        this.leftOperand = roundedResult;
        this.setDisplayValue(roundedResult.toString());

    }

    inversion() {
        let currentDisplay = parseFloat(this.getDisplayValue());
        currentDisplay = 1 / currentDisplay;
        this.setDisplayValue(currentDisplay.toString());
    }

    changeSign() {
        let currentDisplay = parseFloat(this.getDisplayValue());
        currentDisplay = currentDisplay * (-1);
        this.setDisplayValue(currentDisplay.toString());
    }

    percent(invoker) {
        if(invoker.pendingCommand) {
            let percent = parseFloat(this.getDisplayValue());
            let number = parseFloat(this.getLeftOperand());
            let res = null;

            let pendingOperation = invoker.pendingCommand.constructor.name;

            if (pendingOperation === 'AddCommand') res = number + (number / 100 * percent);
            else if (pendingOperation === 'SubtractCommand') res = number - (number / 100 * percent);
            else if (pendingOperation === 'MultiplyCommand') res = number / 100 * percent;
            else if (pendingOperation === 'DivideCommand') res = number / (percent / 100);

            this.setDisplayValue(res.toString());
            // this.setLeftOperand(res.toString());
            this.clearOnNextInput = true;
            invoker.pendingCommand = null;
        }
    }

    factorial() {

        let n = parseFloat(this.getDisplayValue());

        if (n < 0 || n % 1 !== 0) {
            throw new Error("Factorial is only possible for positive integers");
        }
        if (n === 0 || n === 1) {
            this.setDisplayValue('1');
        } else {
            let res = 1;
            for (let i = 2; i <= n; i++) {
                res *= i;
            }
            this.setDisplayValue(res.toString());
        }
    }

    memoryRecall() {
        this.displayValue = (this.memoryValue).toString();
    }

    memoryClear() {
        this.memoryValue = 0;
    }

    memoryAdd() {
        this.memoryValue += +this.displayValue;
        this.clearOnNextInput = true;
    }

    memorySubtract() {
        this.memoryValue -= +this.displayValue;
        this.clearOnNextInput = true;
    }

    clear() {
        this.leftOperand = 0;
        this.displayValue = '0';
        this.clearOnNextInput = false;
        this.hasDot = false;
    }

    getLeftOperand() {
        return this.leftOperand;
    }

    setLeftOperand(value) {
        this.leftOperand = value;
    }

    getDisplayValue() {
        return this.displayValue;
    }

    setDisplayValue(value) {
        this.displayValue = value;
        this.hasDot = value.includes('.'); // Обновляем флаг точки
    }
}


