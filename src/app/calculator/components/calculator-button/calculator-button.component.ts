import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, output, signal, viewChild, ViewEncapsulation, type OnInit } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [
  ],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()',
  },
  // encapsulation: ViewEncapsulation.None,
})
export class CalculatorButtonComponent implements OnInit {

  public isPressed = signal(false);

  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');


  public isCommand = input(
    false,
    {
      transform: (value: boolean | string) =>
        typeof value === 'string' ? value === '' : value,
    }
  );
  public isDoubleSize = input(
    false,
    {
      transform: (value: boolean | string) =>
        typeof value === 'string' ? value === '' : value,
    }
  );

  // @HostBinding('class.w-2/4') get commandStyle() {
  //   return this.isDoubleSize();
  // }
  ngOnInit(): void {
  }

  handleClick() {
    if(!this.contentValue()?.nativeElement) {
       return;
    }
    const value = this.contentValue()!.nativeElement.innerText;

    this.onClick.emit(value.trim());
  }

  public keyPressStyle(key: string) {
    if(!this.contentValue()?.nativeElement) {
      return;
    }
    const value = this.contentValue()!.nativeElement.innerText;

    if(value !== key) {
      return;
    }

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 150);
  }

}
