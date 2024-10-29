
import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";

describe('CalculatorService',()=>{
  let service: CalculatorService;

  beforeEach(()=>{
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  })

  it('shoul be created',()=>{
    expect(service).toBeTruthy();
  })

  it('shoul be created with default values', ()=>{
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });
});
