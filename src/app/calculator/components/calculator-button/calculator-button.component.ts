import { ChangeDetectionStrategy, Component, HostBinding, input, type OnInit } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [
  ],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400'
  }
})
export class CalculatorButtonComponent implements OnInit {
  public isCommand = input(
    false,
    {
      transform: (value: boolean | string) =>
        typeof value === 'string' ? value === '' : value,
    }
  );

  @HostBinding('class.isCommand') get commandStyle() {
    return this.isCommand();
  }
  ngOnInit(): void {
  }

}
