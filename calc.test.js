import {Calculator} from "./receiver/receiver.js";
import expect from "expect";


const calculator = new Calculator(); // Наш получатель


describe('testing add method',()=>{
    test('add 5 and 5',()=>{
        calculator.setLeftOperand(5);
        calculator.add(5);
        expect(calculator.getLeftOperand()).toBe(10)
    });
    test('add -5 and -5',()=>{
        calculator.setLeftOperand(-5);
        calculator.add(-5);
        expect(calculator.getLeftOperand()).toBe(-10)
    });
    test('add 0 and 0',()=>{
        calculator.setLeftOperand(0);
        calculator.add(0);
        expect(calculator.getLeftOperand()).toBe(0)
    });
    test('add 5 and -5',()=>{
        calculator.setLeftOperand(5);
        calculator.add(-5);
        expect(calculator.getLeftOperand()).toBe(0)
    })
    test('add -5 and 5',()=>{
        calculator.setLeftOperand(-5);
        calculator.add(5);
        expect(calculator.getLeftOperand()).toBe(0)
    })
})


describe('testing subtract method',()=>{
    test('subtract 5 and 5',()=>{
        calculator.setLeftOperand(5);
        calculator.subtract(5);
        expect(calculator.getLeftOperand()).toBe(0)
    });
    test('subtract -5 and -5',()=>{
        calculator.setLeftOperand(-5);
        calculator.subtract(-5);
        expect(calculator.getLeftOperand()).toBe(0)
    });
    test('subtract 0 and 0',()=>{
        calculator.setLeftOperand(0);
        calculator.subtract(0);
        expect(calculator.getLeftOperand()).toBe(0)
    });
    test('subtract 5 and -5',()=>{
        calculator.setLeftOperand(5);
        calculator.subtract(-5);
        expect(calculator.getLeftOperand()).toBe(10)
    })
    test('subtract -5 and 5',()=>{
        calculator.setLeftOperand(-5);
        calculator.subtract(5);
        expect(calculator.getLeftOperand()).toBe(-10)
    })
})


describe('testing multiply method',()=>{
    test('multiply 5 and 5',()=>{
        calculator.setLeftOperand(5);
        calculator.multiply(5);
        expect(calculator.getLeftOperand()).toBe(25)
    });
    test('multiply -5 and -5',()=>{
        calculator.setLeftOperand(-5);
        calculator.multiply(-5);
        expect(calculator.getLeftOperand()).toBe(25)
    });
    test('multiply 0 and 0',()=>{
        calculator.setLeftOperand(0);
        calculator.multiply(0);
        expect(calculator.getLeftOperand()).toBe(0)
    });
    test('multiply 5 and -5',()=>{
        calculator.setLeftOperand(5);
        calculator.multiply(-5);
        expect(calculator.getLeftOperand()).toBe(-25)
    })
    test('multiply -5 and 5',()=>{
        calculator.setLeftOperand(-5);
        calculator.multiply(5);
        expect(calculator.getLeftOperand()).toBe(-25)
    })
})


describe('testing divide method',()=>{
    test('divide 5 and 5',()=>{
        calculator.setLeftOperand(5);
        calculator.divide(5);
        expect(calculator.getLeftOperand()).toBe(1)
    });
    test('divide -5 and -5',()=>{
        calculator.setLeftOperand(-5);
        calculator.divide(-5);
        expect(calculator.getLeftOperand()).toBe(1)
    });
    test('divide 0 and 0',()=>{
        calculator.setLeftOperand(0);
        expect(() => {
            calculator.divide(0); // Передаем 0 как делитель
        }).toThrow("Division by zero");
    });
    test('divide 5 and -5',()=>{
        calculator.setLeftOperand(5);
        calculator.divide(-5);
        expect(calculator.getLeftOperand()).toBe(-1)
    })
    test('divide -5 and 5',()=>{
        calculator.setLeftOperand(-5);
        calculator.divide(5);
        expect(calculator.getLeftOperand()).toBe(-1)
    })
    test('divide 0 and 5',()=>{
        calculator.setLeftOperand(0);
        calculator.divide(5);
        expect(calculator.getLeftOperand()).toBe(0)
    })
    test('divide 5 and 0',()=>{
        calculator.setLeftOperand(5);
        expect(() => {
            calculator.divide(0);
        }).toThrow("Division by zero");
    })
})


describe('testing square root method',()=>{
    test('square root of 25',()=>{
        calculator.setDisplayValue('25');
        calculator.squareRoot();
       expect(calculator.getDisplayValue()).toBe('5')
    });

    test('square root of 0',()=>{
        calculator.setDisplayValue('0');
        calculator.squareRoot();
        expect(calculator.getDisplayValue()).toBe('0')
    });

    test('square root of -1',()=>{
        calculator.setDisplayValue('-1');
        expect(() => {
            calculator.squareRoot(); // Передаем 0 как делитель
        }).toThrow("Square root from negative value");
    });
})

describe('testing cube root method',()=>{
    test('cube root of 125',()=>{
        calculator.setDisplayValue('125');
        calculator.cubeRoot();
        expect(calculator.getDisplayValue()).toBe('5')
    });

    test('cube root of 0',()=>{
        calculator.setDisplayValue('0');
        calculator.cubeRoot();
        expect(calculator.getDisplayValue()).toBe('0')
    });

    test('cube root of -1',()=>{
        calculator.setDisplayValue('-1');
        calculator.cubeRoot();
        expect(calculator.getDisplayValue()).toBe('-1')
    });
})

describe('testing power two method',()=>{
    test('power two of 5',()=>{
        calculator.setDisplayValue('5');
        calculator.powerTwo();
        expect(calculator.getDisplayValue()).toBe('25')
    });

    test('power two of 0',()=>{
        calculator.setDisplayValue('0');
        calculator.powerTwo();
        expect(calculator.getDisplayValue()).toBe('0')
    });

    test('power two of -5',()=>{
        calculator.setDisplayValue('-5');
        calculator.powerTwo();
        expect(calculator.getDisplayValue()).toBe('25')
    });
})


describe('testing power three method',()=>{
    test('power three of 5',()=>{
        calculator.setDisplayValue('5');
        calculator.powerThree();
        expect(calculator.getDisplayValue()).toBe('125')
    });

    test('power three of 0',()=>{
        calculator.setDisplayValue('0');
        calculator.powerThree();
        expect(calculator.getDisplayValue()).toBe('0')
    });

    test('power three of -5',()=>{
        calculator.setDisplayValue('-5');
        calculator.powerThree();
        expect(calculator.getDisplayValue()).toBe('-125')
    });
})


describe('testing ten power x method',()=>{
    test('10 power 3',()=>{
        calculator.setDisplayValue('3');
        calculator.tenPowerX();
        expect(calculator.getDisplayValue()).toBe('1000')
    });

    test('10 power 0',()=>{
        calculator.setDisplayValue('0');
        calculator.tenPowerX();
        expect(calculator.getDisplayValue()).toBe('1')
    });

    test('10 power -3',()=>{
        calculator.setDisplayValue('-3');
        calculator.tenPowerX();
        expect(calculator.getDisplayValue()).toBe('0.001')
    });
})


describe('testing xPowerY method',()=>{
    test('xPowerY 5 and 5',()=>{
        calculator.setLeftOperand(5);
        calculator.xPowerY(5);
        expect(calculator.getLeftOperand()).toBe(3125)
    });
    test('xPowerY -5 and -5',()=>{
        calculator.setLeftOperand(-5);
        calculator.xPowerY(-5);
        expect(calculator.getLeftOperand()).toBe(-0.00032)
    });
    test('xPowerY 0 and 0',()=>{
        calculator.setLeftOperand(0);
        calculator.xPowerY(0);
        expect(calculator.getLeftOperand()).toBe(1)
    });
    test('xPowerY 5 and -5',()=>{
        calculator.setLeftOperand(5);
        calculator.xPowerY(-5);
        expect(calculator.getLeftOperand()).toBe(0.00032)
    })
    test('xPowerY -5 and 5',()=>{
        calculator.setLeftOperand(-5);
        calculator.xPowerY(5);
        expect(calculator.getLeftOperand()).toBe(-3125)
    })
    test('xPowerY 0 and 5',()=>{
        calculator.setLeftOperand(0);
        calculator.xPowerY(5);
        expect(calculator.getLeftOperand()).toBe(0)
    })
    test('xPowerY 5 and 0',()=>{
        calculator.setLeftOperand(5);
        calculator.xPowerY(0);
        expect(calculator.getLeftOperand()).toBe(1)
    })
})


describe('testing xRootY method',()=>{
    test('xRootY 5 and 5',()=>{
        calculator.setLeftOperand(5);
        calculator.xRootY(5);
        expect(calculator.getLeftOperand()).toBeCloseTo(1.37973)
    });
    test('xRootY -5 and -5',()=>{
        calculator.setLeftOperand(-5);
        calculator.xRootY(-5);
        expect(calculator.getLeftOperand()).toBe(-0.7247796637)
    });
    test('xRootY 0 and 0',()=>{
        calculator.setLeftOperand(0);
        expect(() => {
            calculator.xRootY(0); // Передаем 0 как делитель
        }).toThrow("Cannot take root of degree zero");
    });
    test('xRootY 5 and -5',()=>{
        calculator.setLeftOperand(5);
        calculator.xRootY(-5);
        expect(calculator.getLeftOperand()).toBe(0.7247796637)
    })
    test('xRootY -5 and 5',()=>{
        calculator.setLeftOperand(-5);
        calculator.xRootY(5);
        expect(calculator.getLeftOperand()).toBe(-1.3797296615)
    })
    test('xRootY 0 and 5',()=>{
        calculator.setLeftOperand(0);
        calculator.xRootY(5);
        expect(calculator.getLeftOperand()).toBe(0)
    })
    test('xRootY 5 and 0',()=>{
        calculator.setLeftOperand(5);
        expect(() => {
            calculator.xRootY(0); // Передаем 0 как делитель
        }).toThrow("Cannot take root of degree zero");
    })
})



describe('testing inversion method',()=>{
    test('inversion of 5',()=>{
        calculator.setDisplayValue('5');
        calculator.inversion();
        expect(calculator.getDisplayValue()).toBe('0.2')
    });

    test('inversion of -5',()=>{
        calculator.setDisplayValue('-5');
        calculator.inversion();
        expect(calculator.getDisplayValue()).toBe('-0.2')
    });

    test('inversion of 0',()=>{
        calculator.setDisplayValue('0');
        calculator.inversion();
        expect(calculator.getDisplayValue()).toBe('Infinity')
    });
})


describe('testing changeSign method',()=>{
    test('inversion of 5',()=>{
        calculator.setDisplayValue('5');
        calculator.changeSign();
        expect(calculator.getDisplayValue()).toBe('-5')
    });

    test('inversion of -5',()=>{
        calculator.setDisplayValue('-5');
        calculator.changeSign();
        expect(calculator.getDisplayValue()).toBe('5')
    });

    test('inversion of 0',()=>{
        calculator.setDisplayValue('0');
        calculator.changeSign();
        expect(calculator.getDisplayValue()).toBe('0')
    });
})



describe('testing factorial method',()=>{
    test('factorial of 5',()=>{
        calculator.setDisplayValue('5');
        calculator.factorial();
        expect(calculator.getDisplayValue()).toBe('120')
    });

    test('factorial of -5',()=>{
        calculator.setDisplayValue('-5');
        expect(() => {
            calculator.factorial(); // Передаем 0 как делитель
        }).toThrow("Factorial is only possible for positive integers");
    });

    test('factorial of 5.88',()=>{
        calculator.setDisplayValue('5.88');
        expect(() => {
            calculator.factorial(); // Передаем 0 как делитель
        }).toThrow("Factorial is only possible for positive integers");
    });

    test('factorial of 0',()=>{
        calculator.setDisplayValue('0');
        calculator.factorial();
        expect(calculator.getDisplayValue()).toBe('1')
    });

    test('factorial of 1',()=>{
        calculator.setDisplayValue('1');
        calculator.factorial();
        expect(calculator.getDisplayValue()).toBe('1')
    });
})