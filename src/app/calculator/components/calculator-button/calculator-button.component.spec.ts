
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';

describe('CalculatorButtonComponent', () => {

  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;
  let component: CalculatorButtonComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges(); //Step to apply styles detect to first test. Line 28.

  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 doubleSizer is false', ()=>{

    /* 
        * Like this need apply this class after render component, it's necessary apply "detectChanges() at component in line 20"
        * It's because use signals to capture styles and need detect changes.

    */

    const hostCssClasses: string[] = compiled.classList.value.split(' ')

    expect(hostCssClasses).toContain('w-1/4')
    expect(component.isDoubleSize()).toBe(false); //or also toBeFalse()
    
  })

  it('should apply w-2/4 doubleSizer is true', ()=>{
    
    //Simulate button "isDoubleSize"
    fixture.componentRef.setInput('isDoubleSize',true);
    fixture.detectChanges();

    const hostCssClasses: string[] = compiled.classList.value.split(' ');

    expect(hostCssClasses).toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTrue();
    
  })


});
