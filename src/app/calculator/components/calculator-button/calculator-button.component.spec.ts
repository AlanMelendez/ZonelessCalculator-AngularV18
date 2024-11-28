
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';
import { Component } from '@angular/core';


@Component({
  standalone:true,
  imports: [CalculatorButtonComponent],
  template: `
    <calculator-button>
      <span class="class-text-projected">Test content WOOOOAH</span>
    </calculator-button>
  `

})
class TestHostComponente{}



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
    
  });

  it('should apply w-2/4 doubleSizer is true', ()=>{
    
    //Simulate button "isDoubleSize"
    fixture.componentRef.setInput('isDoubleSize',true);
    fixture.detectChanges();

    const hostCssClasses: string[] = compiled.classList.value.split(' ');

    expect(hostCssClasses).toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTrue();
    
  });


  it('should emit onClick  when handleClick function is called', ()=>{

    //We use spy, the spy is like a mock, but it's a function that we can use to check if it was called, how many times, and with what parameters.
    const spy = spyOn(component.onClick,'emit');

    component.handleClick();

    expect(component.onClick.emit).toHaveBeenCalled();

    expect(spy).toHaveBeenCalled();
  });


  it('should set isPressed to true when keyPressStyle function is called with a matching key', (done)=>{

    // console.log(compiled); //to see the component structure and check value to content
    //simulate keyPressStyle some key.
    component.contentValue().nativeElement.innerText = '1';

    // console.log(compiled); //to see again the componente value if is changed to '1'


    component.keyPressStyle('1');

    expect(component.isPressed()).toBeTrue();

    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
      done();
    }, 200);

  });

  it('should not set isPressed to true if key is not matching', ()=>{
    component.contentValue().nativeElement.innerText = '1';
    component.keyPressStyle('2');

    expect(component.isPressed()).toBeFalse();

  });


  it('should display projected content', ()=>{

    const testHostFixture = TestBed.createComponent(TestHostComponente);
    const compiled = testHostFixture.nativeElement as HTMLDivElement;

    expect(compiled.querySelector('span')?.textContent).toBe('Test content WOOOOAH');
    expect(compiled.querySelector('.class-text-projected')).not.toBeNull();

  })


});
