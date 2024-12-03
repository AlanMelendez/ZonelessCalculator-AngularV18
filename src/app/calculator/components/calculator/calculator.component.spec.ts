import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { By } from '@angular/platform-browser';

class calculatorMockService {
  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResultText = jasmine
    .createSpy('subResultText')
    .and.returnValue('0');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

  public constructNumber = jasmine.createSpy('constructNumber');
}

describe('CalculatorComponent', () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;

  let calculationService: calculatorMockService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        { provide: CalculatorService, useClass: calculatorMockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    calculationService = TestBed.inject(CalculatorService) as unknown as calculatorMockService;

    // fixture.detectChanges();
  });

  it('should create the app', () => {
    console.log('component', compiled);
    expect(component).toBeTruthy();
  });

  it('should have the current getters', () => {
    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('0');
    expect(component.lastOperator()).toBe('+');
  });

  it('should display proper calculation values', () => {

    calculationService.resultText.and.returnValue('500');
    calculationService.subResultText.and.returnValue('100');
    calculationService.lastOperator.and.returnValue('-');

    fixture.detectChanges();
    
    //Evaluate values for the service (mocked)
    expect(component.resultText()).toBe('500');
    expect(component.subResultText()).toBe('100');
    expect(component.lastOperator()).toBe('-');

    //Evaluate values for the component
    // console.log('component', expect(compiled.querySelector('span')));
    expect(compiled.querySelector('span')?.textContent).toBe('100 -');


  });


  it('should have 19 calculator-button components', () => {
        // Way to get the content projection using viewChildren to get component #1

    expect(component.calculatorButtons()).toBeTruthy();
    expect(component.calculatorButtons().length).toBe(19);
  });

  it('should have 19 calculator-button with content projection', () => {
    // Way to get the content projection  #2
    const button = compiled.querySelectorAll('calculator-button');
    expect(button.length).toBe(19);

    // Way to get the content projection #3

    // const buttonsByDirective = fixture.debugElement.queryAll(
    //   By.directive(CalculatorButtonComponent)
    // );

  });

  it('should be the first button with the text "C"', () => {
    const button = compiled.querySelector('calculator-button');
    expect(button?.textContent?.trim()).toBe('C');
  });

  it('should handle keyboard events', () => {
    const enterEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    // component.handleKeyboardEvent(event);
    document.dispatchEvent(enterEvent);
    expect(calculationService.constructNumber).toHaveBeenCalledWith('=');


    const escapeEvent = new KeyboardEvent('keyup', { key: 'Escape' });
    component.handleKeyboardEvent(escapeEvent);
    expect(calculationService.constructNumber).toHaveBeenCalledWith('C');
  });


  it('should display the proper key press style', () => {
    calculationService.resultText.and.returnValue('500');
    calculationService.subResultText.and.returnValue('100');
    calculationService.lastOperator.and.returnValue('-');
    fixture.detectChanges();

    // expect(compiled.querySelector('span')?.textContent).toBe('500');
    expect(component.resultText()).toBe('500');

    // console.log('component span value', compiled.querySelector('span')?.textContent);
    expect(compiled.querySelector('span')?.textContent).toContain('100 -');

  });
});
