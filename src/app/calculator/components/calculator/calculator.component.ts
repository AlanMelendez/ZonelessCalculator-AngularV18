import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, viewChildren, type OnInit } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

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
  private _calculatorService = inject(CalculatorService);
  public calculatorButtons = viewChildren(CalculatorButtonComponent);


  public resultText = computed(() => this._calculatorService.resultText());
  public subResultText = computed(() => this._calculatorService.subResultText());
  public lastOperator = computed(() => this._calculatorService.lastOperator());

  ngOnInit(): void { }

  getClickEvent(event: string) {
    this._calculatorService.constructNumber(event);
  }


  handleKeyboardEvent(event: KeyboardEvent) {

    const keyEquivalent: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      'x': '*',
      '/': '÷',
      Enter: '=',
      '=': '=',
    };

    const key = event.key;
    const keyToUse = keyEquivalent[key] ?? key;

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
