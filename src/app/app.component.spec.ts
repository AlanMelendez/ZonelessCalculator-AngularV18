import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should be 2', () => {
    // Arrange
    const num1 =1;
    const num2 =2;

    //Act
    const result = num1 + num2;

    //Assert
    expect(result).toBe(3);


  });

  it(`should have the 'zonelessCalculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zonelessCalculator');
  });

  it('should render router-outlet', () => {
    // expect(compiled.querySelector('h1')).toBeTruthy();
    // expect(compiled.querySelector('router-outlet')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).not.toBeNull();

  });



  it('should render outlet-router wrapped with css classes', ()=>{

 // Let's take the  div element, this 'container div' contain inside it the router element.
    const divElement = compiled.querySelector('div');
    // console.log(divElement);
    // console.log(divElement.classList.value);

    //Evaluate css class of div:
    const cssClasses = 'min-w-screen min-h-screen bg-gray-100 flex items-center justify-center px-5 py-5'.split(' ')
    const divClasses = divElement.classList.value.split(' ');

    console.log('Clases to expect: ',cssClasses)

    //Evaluate the div element not be null.
    expect(divElement).not.toBeNull();

    //Evaluate cssClasses with classes of divElement, verify be the same  class in each iteration.
    divElement.classList.forEach((className:string)=>{
      expect(cssClasses).toContain(className)
    });

    cssClasses.forEach((className:string)=>{
        expect(divClasses).toContain(className)
    });

  });

  it("shoul contain the 'buy me a beer' link", ()=>{

    //tips to evalualte:
    /**
     * anchoElement.title = 'Buy me a beer'
     * anchorElement.href = 'https://www.buymeacoffee.com/scottwindon'
     */

    //Let's take  "a" element.
    const anchorElement = compiled.querySelector('a');
    const titleToEvaluate:string = 'Buy me a beer'
    const urlToEvaluate:string = 'https://www.buymeacoffee.com/scottwindon'

    //Evaluate the element not be null
    expect(anchorElement).not.toBeNull();

    //Evaluate each value (titleToEvaluate, urlToEvaluate)
    expect(anchorElement.href).toContain(urlToEvaluate);
    expect(anchorElement.title).toContain(titleToEvaluate);


  });

});
