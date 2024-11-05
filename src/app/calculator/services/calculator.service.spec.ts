
import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";

describe('CalculatorService',()=>{
  let service: CalculatorService;

  beforeEach(()=>{
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  })

  beforeAll(()=>{});
  afterAll(()=>{});
  afterEach(()=>{});


  it('should be created',()=>{
    expect(service).toBeTruthy();
  })

  it('should be created with default values', ()=>{
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it("should set resultText to '0' when C is pressed", ()=>{

    //Set values to simulate any behavior.
    service.resultText.set('2');
    service.subResultText.set('2');
    service.lastOperator.set('*')
    //Press C
    service.constructNumber('C');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');

  });

  it('should update resultText with number input', ()=>{
    service.constructNumber('1');
    expect(service.resultText()).toBe('1');

    service.constructNumber('2');
    expect(service.resultText()).toBe('12');

  });

  it('should handle operators correctly', ()=>{
    service.constructNumber('1');
    service.constructNumber('+');

    expect(service.lastOperator()).toBe('+');
    expect(service.subResultText()).toBe('1');

  });

  it('should calculate result correctly for addition', () =>{
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('1');
    service.constructNumber('=');

    expect(service.resultText()).toBe('2');
  });

  it('should calculate result correctly for substraction', () =>{
    service.constructNumber('2');
    service.constructNumber('-');
    service.constructNumber('1');
    service.constructNumber('=');

    expect(service.resultText()).toBe('1');
  });
  it('should calculate result correctly for multiplication', () =>{
    service.constructNumber('2');
    service.constructNumber('*');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('4');
  });

  it('should calculate result correctly for division', () =>{
    service.constructNumber('2');
    service.constructNumber('/');
    //or : service.resultText.set(10)
    service.constructNumber('1');
    service.constructNumber('0');
    // 2 / 10
    service.constructNumber('=');

    expect(service.resultText()).toBe('5');
  });

  it('should handle decimal point correctly', () =>{
    service.constructNumber('2');
    service.constructNumber('.');
    service.constructNumber('5');

    expect(service.resultText()).toBe('2.5');
    service.constructNumber('.');
    expect(service.resultText()).toBe('2.5');
  });


  it('should handle decimal point correctly starting with zero', () =>{
    service.constructNumber('2');
    service.constructNumber('.');
    service.constructNumber('5');

    expect(service.resultText()).toBe('2.5');
    service.constructNumber('.');
    expect(service.resultText()).toBe('2.5');

    expect(service.resultText()).toBe('2.5');
    service.constructNumber('.');
    service.constructNumber('.');
    service.constructNumber('.');
    expect(service.resultText()).toBe('2.5');
  });



  it('should handle sign change correctly', ()=>{
    service.constructNumber('1');
    service.constructNumber('+/-');

    expect(service.resultText()).toBe('-1');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('1');

  });

  it('should handle backspace correctly', () =>{
    service.resultText.set('123');

    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('12');

    service.constructNumber('Backspace')
    expect(service.resultText()).toBe('1')

    service.constructNumber('Backspace')
    expect(service.resultText()).toBe('0')

  });


  it('should handle max length', ()=>{
    for (let index = 0; index < 10; index++) {
      service.constructNumber('1')
    }

    expect(service.resultText().length).toBe(10);

    //Add one more number to validate not pass length to max 10 characters
    service.constructNumber('1')
    expect(service.resultText().length).toBe(10);

  });

});
