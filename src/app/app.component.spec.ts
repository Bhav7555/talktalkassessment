import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;

const fillCellData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call fillCell on load', () => {
    component.numberOfCell = 9;
    fixture.detectChanges();
    spyOn<any>(component, 'fillCell');
    component.ngOnInit();
    expect(component['fillCell']).toHaveBeenCalled();
    expect(component['fillCell']).toHaveBeenCalledWith(9);
  });

  it('should call fillCell on load and set row and cols of specfied length', () => {
    const data = component['fillCell'](9);
    expect(data.length).toEqual(fillCellData.length);
    expect(data.length).toEqual(fillCellData.length);
  });

  it('set row of 9 and cols of 8  length', () => {
    component.rows = fillCellData;
    let mockData: number[] = [...fillCellData];
    mockData.pop();
    fixture.detectChanges();
    component.cols = mockData;
    expect(component.rows.length).toEqual(fillCellData.length);
    expect(component.cols.length).toEqual(fillCellData.length - 1);
  });

  it('should return empty array on call of fillCell with 0', () => {
    component.numberOfCell = 0;
    fixture.detectChanges();
    expect(component['fillCell'](component.numberOfCell)).toEqual([]);
  });

  it('should set ElementColor to yellow as passed for particular grid where row as 2 column as 8 and color as yellow', () => {
    component.numberOfCell = 9;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    component.setElementColor(2, 8, 'yellow');
    fixture.detectChanges();
    const td = document.getElementById('#cell2_8') as HTMLElement;
    expect(td.style.backgroundColor).toBe('yellow');
  });

  it('should set ElementColor to blue as passed for particular grid where row as 4 column as 8 and color as blue', () => {
    component.numberOfCell = 9;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    component.setElementColor(4, 8, 'blue');
    fixture.detectChanges();
    const td = document.getElementById('#cell4_8') as HTMLElement;
    expect(td.style.backgroundColor).toBe('blue');
  });

  it('should set ElementColor to blue as passed for particular grid where row as 5 column as 9 and color as blue', () => {
    component.numberOfCell = 9;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    component.setElementColor(5, 9, 'blue');
    fixture.detectChanges();
    const td = document.getElementById('#cell5_9') as HTMLElement;
    expect(td.style.backgroundColor).toBe('blue');
  });

  it('should not set element color of other grid if passed color does not match the row and col', () => {
    component.numberOfCell = 9;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    component.setElementColor(2, 3, 'blue');
    fixture.detectChanges();
    const td = document.getElementById('#cell2_3') as HTMLElement;
    expect(td.style.backgroundColor).toBe('blue');
    const tdWithoutColor = document.getElementById('#cell2_2') as HTMLElement;
    expect(tdWithoutColor.style.backgroundColor).not.toBe('blue');
  });

  it('should not set element color if color not passed for particular row and column', () => {
    component.numberOfCell = 9;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    component.setElementColor(1, 2, '');
    fixture.detectChanges();
    const td = document.getElementById('#cell1_2') as HTMLElement;
    expect(td.style.backgroundColor).not.toBe('blue');
  });

  it('should not set element color if color passed is blue but particular row doesnot exist', () => {
    component.numberOfCell = 9;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    component.setElementColor(10, 2, 'blue');
    fixture.detectChanges();
    const tr = document.getElementById('#cell10_2') as HTMLElement;
    expect(tr).toBeNull();
  });

  it('should not set element color if color passed is blue but particular column doesnot exist', () => {
    component.numberOfCell = 9;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    component.setElementColor(1, 10, 'blue');
    fixture.detectChanges();
    const td = document.getElementById('#cell1_10') as HTMLElement;
    expect(td).toBeNull();
  });

  it('should fill row 3 from column 2 to 7 using Blue', () => {
    component.numberOfCell = 9;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    component.fillColor('blue', 'row', 3, 2, 7);
    fixture.detectChanges();
    const td32 = document.getElementById('#cell3_2') as HTMLElement;
    const td33 = document.getElementById('#cell3_3') as HTMLElement;
    const td35 = document.getElementById('#cell3_5') as HTMLElement;
    const td37 = document.getElementById('#cell3_7') as HTMLElement;
    expect(td32.style.backgroundColor).toBe('blue');
    expect(td33.style.backgroundColor).toBe('blue');
    expect(td35.style.backgroundColor).toBe('blue');
    expect(td37.style.backgroundColor).toBe('blue');
  });

  it('should fill row 4 from column 5 to 6 using Blue', () => {
    component.numberOfCell = 9;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    component.fillColor('blue', 'row', 4, 5, 6);
    fixture.detectChanges();
    const td45 = document.getElementById('#cell4_5') as HTMLElement;
    const td46 = document.getElementById('#cell4_6') as HTMLElement;
    expect(td45.style.backgroundColor).toBe('blue');
    expect(td46.style.backgroundColor).toBe('blue');
  });

  it('should fill color for row 4, if column start range is 0 and end range is greater than 0', () => {
    component.numberOfCell = 9;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    component.fillColor('blue', 'row', 4, 0, 6);
    fixture.detectChanges();
    const td41 = document.getElementById('#cell4_1') as HTMLElement;
    expect(td41.style.backgroundColor).toBe('blue');
  });

  it('should not fill color for row 4, if column start and end range is 0 ', () => {
    component.numberOfCell = 9;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    component.fillColor('blue', 'row', 4, 0, 0);
    fixture.detectChanges();
    const td41 = document.getElementById('#cell4_1') as HTMLElement;
    expect(td41.style.backgroundColor).not.toBe('blue');
  });

  it('should  fill complete row 4 with blue color, if column start range is 1 and end range is undefined ', () => {
    component.numberOfCell = 9;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    component.fillColor('blue', 'row', 4, 1, undefined);
    fixture.detectChanges();
    for (let col: number = 1; col <= 9; col++) {
      const td = document.getElementById('#cell4' + '_' + col) as HTMLElement;
      expect(td.style.backgroundColor).toBe('blue');
    }
  });

  it('should not fill complete row 4 with blue color, if column start range is 1 and end range is 0 ', () => {
    component.numberOfCell = 9;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    component.fillColor('blue', 'row', 4, 1, 0);
    fixture.detectChanges();
    for (let col: number = 1; col <= 9; col++) {
      const td = document.getElementById('#cell4' + '_' + col) as HTMLElement;
      expect(td.style.backgroundColor).not.toBe('blue');
    }
  });

  it('should not fillColorWithFlood for any row if row defined as 0', () => {
    spyOn<any>(component, 'fillColorWithFlood');
    component.numberOfCell = 9;
    fixture.detectChanges();
    component.flood(0, 6, 'red');
    fixture.detectChanges();
    expect(component['fillColorWithFlood']).not.toHaveBeenCalled();
  });

  it('should not fillColorWithFlood for any col if col defined as 0', () => {
    spyOn<any>(component, 'fillColorWithFlood');
    component.numberOfCell = 9;
    fixture.detectChanges();
    component.flood(1, 0, 'red');
    fixture.detectChanges();
    expect(component['fillColorWithFlood']).not.toHaveBeenCalled();
  });

  it('should  make all cell as red color, if flood function is clicked at first', () => {
    component.numberOfCell = 9;
    component.ngOnInit();
    fixture.detectChanges();
    component.flood(1, 1, 'red');
    fixture.detectChanges();
    for (let row: number = 1; row <= 9; row++) {
      for (let col: number = 1; col <= 9; col++) {
        const td = document.getElementById(
          '#cell' + row + '_' + col
        ) as HTMLElement;
        expect(td.style.backgroundColor).toBe('red');
      }
    }
  });

  it('should make all cell as red color for cells whose adjacent cells are having existing color as blue', () => {
    component.numberOfCell = 9;
    component.ngOnInit();
    fixture.detectChanges();
    component.fillColor('blue', 'row', 3, 2, 7);
    fixture.detectChanges();
    component.flood(3, 6, 'red');
    fixture.detectChanges();
    for (let col: number = 2; col <= 7; col++) {
      const td = document.getElementById('#cell3' + '_' + col) as HTMLElement;
      expect(td.style.backgroundColor).toBe('red');
    }
  });

  it('should make 1 cell as red color for cells whose adjacent cells are not having any color', () => {
    component.numberOfCell = 9;
    component.ngOnInit();
    fixture.detectChanges();
    component.setElementColor(3, 6, 'green');
    fixture.detectChanges();
    component.flood(3, 6, 'red');
    fixture.detectChanges();
    for (let row: number = 1; row <= 9; row++) {
      for (let col: number = 1; col <= 9; col++) {
        if (row === 3 && col === 6) {
          const td = document.getElementById(
            '#cell' + row + '_' + col
          ) as HTMLElement;
          expect(td.style.backgroundColor).toBe('red');
        } else {
          const td = document.getElementById(
            '#cell' + row + '_' + col
          ) as HTMLElement;
          expect(td.style.backgroundColor).not.toBe('red');
        }
      }
    }
  });
});
