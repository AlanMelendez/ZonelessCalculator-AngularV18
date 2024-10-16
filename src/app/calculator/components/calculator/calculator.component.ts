import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, type OnInit } from '@angular/core';
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
})
export class CalculatorComponent implements OnInit {

  ngOnInit(): void { }

  getClickEvent(event: string) {
    console.log(event);
  }


  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.getClickEvent(event.key);
  }

}
