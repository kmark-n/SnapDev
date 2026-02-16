// script.js
// Calculator logic implementation and UI integration

/**
 * Calculator class handling basic arithmetic operations and state management.
 */
class Calculator {
    constructor() {
        /** @type {string} */
        this.currentInput = ""; // digits being entered
        /** @type {number|null} */
        this.previousValue = null; // stored operand
        /** @type {string|null} */
        this.operator = null; // '+', '-', '*', '/'
        /** @type {boolean} */
        this.errorState = false; // true when an error (e.g., division by zero) occurs
    }

    /**
     * Append a digit or decimal point to the current input.
     * Prevents multiple decimal points.
     * @param {string} digit
     */
    appendDigit(digit) {
        if (this.errorState) return; // ignore input in error state until cleared
        if (digit === '.') {
            // Prevent multiple decimals
            if (this.currentInput.includes('.')) return;
            // If input is empty, prepend a leading zero ("0.")
            if (this.currentInput === "") {
                this.currentInput = "0.";
            } else {
                this.currentInput += '.';
            }
        } else {
            // Append numeric digit
            // Avoid leading zeros like "00" unless after decimal point
            if (this.currentInput === "0" && digit === "0") {
                return; // keep single zero
            }
            this.currentInput += digit;
        }
    }

    /**
     * Store the selected operator and prepare for the next operand.
     * If there is already a pending operation, it will be evaluated first.
     * @param {string} op
     */
    setOperator(op) {
        if (this.errorState) return;
        // If we already have a previous value and an operator, compute intermediate result
        if (this.operator && this.currentInput !== "") {
            this.calculate();
        }
        // Set previousValue based on currentInput if it exists, otherwise keep existing
        if (this.currentInput !== "") {
            this.previousValue = parseFloat(this.currentInput);
        } else if (this.previousValue === null) {
            // No number entered yet; treat as 0
            this.previousValue = 0;
        }
        this.operator = op;
        this.currentInput = "";
    }

    /**
     * Perform the calculation based on the stored operator and operands.
     * Handles division by zero by entering error state.
     * @returns {string|number} Result of the calculation or "Error".
     */
    calculate() {
        if (this.errorState) return "Error";
        if (!this.operator || this.previousValue === null) {
            // Nothing to compute – just return current input or previous value
            return this.getDisplay();
        }
        const current = this.currentInput === "" ? this.previousValue : parseFloat(this.currentInput);
        let result;
        switch (this.operator) {
            case '+':
                result = this.previousValue + current;
                break;
            case '-':
                result = this.previousValue - current;
                break;
            case '*':
                result = this.previousValue * current;
                break;
            case '/':
                if (current === 0) {
                    this.errorState = true;
                    this.currentInput = "";
                    this.previousValue = null;
                    this.operator = null;
                    return "Error";
                }
                result = this.previousValue / current;
                break;
            default:
                // Unknown operator – treat as no-op
                result = current;
        }
        // Round result to avoid floating‑point noise (optional)
        if (typeof result === 'number' && !Number.isInteger(result)) {
            result = parseFloat(result.toFixed(12)); // trim to reasonable precision
        }
        // Update state
        this.previousValue = result;
        this.currentInput = "";
        this.operator = null;
        return result;
    }

    /**
     * Reset calculator to its initial state.
     */
    clear() {
        this.currentInput = "";
        this.previousValue = null;
        this.operator = null;
        this.errorState = false;
    }

    /**
     * Remove the last character from the current input.
     */
    backspace() {
        if (this.errorState) return;
        if (this.currentInput.length > 0) {
            this.currentInput = this.currentInput.slice(0, -1);
        }
    }

    /**
     * Get the string that should be shown on the calculator display.
     * @returns {string}
     */
    getDisplay() {
        if (this.errorState) return "Error";
        if (this.currentInput !== "") {
            return this.currentInput;
        }
        if (this.previousValue !== null) {
            return String(this.previousValue);
        }
        return "0";
    }
}

// Instantiate a single calculator for the UI
const calc = new Calculator();

// Export / expose for testing purposes
if (typeof window !== 'undefined') {
    window.Calculator = Calculator;
    window.calc = calc;
}

// UI integration – wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    const displayEl = document.getElementById('display');
    const buttons = document.querySelectorAll('[data-action]');

    const updateDisplay = () => {
        displayEl.textContent = calc.getDisplay();
    };

    // Click handling based on data-action attribute
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            switch (action) {
                case 'digit':
                    calc.appendDigit(button.dataset.digit);
                    break;
                case 'decimal':
                    calc.appendDigit('.');
                    break;
                case 'operator':
                    calc.setOperator(button.dataset.operator);
                    break;
                case 'equals':
                    calc.calculate();
                    break;
                case 'clear':
                    calc.clear();
                    break;
                case 'backspace':
                    calc.backspace();
                    break;
                default:
                    // No action needed
                    break;
            }
            updateDisplay();
        });
    });

    // Optional keyboard support
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        if (key >= '0' && key <= '9') {
            calc.appendDigit(key);
        } else if (key === '.' || key === ',') {
            // Some keyboards use comma for decimal – treat the same as '.'
            calc.appendDigit('.');
        } else if (key === '+' || key === '-' || key === '*' || key === '/' ) {
            calc.setOperator(key);
        } else if (key === 'Enter' || key === '=') {
            calc.calculate();
        } else if (key === 'Backspace') {
            calc.backspace();
        } else if (key === 'Escape') {
            calc.clear();
        } else {
            return; // ignore other keys
        }
        updateDisplay();
        // Prevent default browser actions for handled keys
        e.preventDefault();
    });

    // Initial display
    updateDisplay();
});
