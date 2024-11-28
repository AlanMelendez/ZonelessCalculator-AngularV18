import { Injectable, signal } from '@angular/core';
import { last } from 'rxjs';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/'];
const specialOperators = ['C', '+/-', '%', '=', '.', 'Backspace'];

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public constructNumber(value: string): void {
    //Validar input
    if (![...numbers, ...operators, ...specialOperators].includes(value)) {
      console.log('Invalid input: ', value);
      return;
    }

    //Validar caracter "="
    if (value === '=') {
      this.calculateResult();
      return;
    }

    //Validar caracter "C"
    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    //Validar backspace
    if (value === 'Backspace') {

      if (this.resultText() === '0') return;

      if(this.resultText().includes('-') && this.resultText().length === 2) {
        this.resultText.set('0');
        return;
      }

      if(this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }

      this.resultText.update((currenValue) => currenValue.slice(0, -1)); //Elimina el último caracter
      return;
    }
    //Aplicar operador
    if (operators.includes(value)) {
      // this.calculateResult();

      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    //Limitar cantidad de caracteres
    if (this.resultText().length >= 10) {
      // console.log('Ops! Max length reached');
      return;
    }

    //Validar punto
    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.');
        return;
      }

      this.resultText.update((lastValue) => lastValue + '.');

      return;
    }

    //Manejo de cero inicial
    if (
      value === '0' &&
      (this.resultText() === '0' || this.resultText() === '-0')
    ) {
      return;
    }

    //Validar cambio de signo
    if (value === '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update((lastValue) => lastValue.slice(1));
        return;
      }

      this.resultText.update((lastValue) => `-${lastValue}`);
      return;
    }

    if (numbers.includes(value)) {
      //Validar numeros
      if (this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }
      if (this.resultText() === '-0') {
        this.resultText.set(`-${value}`);
        return;
      }

      this.resultText.update((lastValue) => lastValue + value);
    }

  }

  public calculateResult(): void {
    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());
    const operator = this.lastOperator();

    let result = 0;

    switch (operator) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case '*':
        result = number1 * number2;
        break;
      case '/':
        result =  number2 / number1;
        break;
    }

    this.resultText.set(result.toString());
    this.subResultText.set('0');
    this.lastOperator.set('+');
  }
}
