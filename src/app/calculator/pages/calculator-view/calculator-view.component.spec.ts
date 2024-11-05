
import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorViewComponent from './calculator-view.component';

describe('CalulatorViewComponent', () => {

  let fixture: ComponentFixture<CalculatorViewComponent>;
  let compiled: HTMLElement;
  let component: CalculatorViewComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorViewComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
      expect(component).toBeTruthy();
  });

  it('should contain app-calculator component', ()=>{

    expect(compiled.querySelector('app-calculator')).not.toBeNull();

  });

  it('should contain basic css classes', ()=>{
    const divElement = compiled.querySelector('div');
    const divClasses = divElement?.classList.value.split(' ');


    const shouldHaveClass = 'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(' ');

    shouldHaveClass.forEach((className:any)=>{
      expect(divClasses).toContain(className);
    });
  });

});
