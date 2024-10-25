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
});
