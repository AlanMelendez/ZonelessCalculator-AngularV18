import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, viewChildren, type OnInit } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    CalculatorButtonComponent
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host:{
    '(document:keyup)': 'handleKeyboardEvent($event)'
  },
})
export class CalculatorComponent implements OnInit {

  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  ngOnInit(): void { }

  getClickEvent(event: string) {
    console.log(event);
  }


  handleKeyboardEvent(event: KeyboardEvent) {

    const keyEquivalent: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      '*': 'x',
      '/': '÷',
      Enter: '=',
      '=': '=',
    };

    const key = event.key;
    const keyToUse = keyEquivalent[key] || key;

    this.getClickEvent(keyToUse);

    this.calculatorButtons().forEach((button) => {
      button.keyPressStyle(keyToUse);
    });
  }

  // @HostListener('document:keyup', ['$event'])
  // handleKeyboardEvent(event: KeyboardEvent) {
  //   this.getClickEvent(event.key);
  // }

}
