import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  rows!: number[];
  cols!: number[];
  // pass value in order to create table
  //If we needmore flexibility on creation of grid a new variable can be created
  numberOfCell: number = 9;

  ngOnInit(): void {
    this.rows = this.fillCell(this.numberOfCell);
    this.cols = this.fillCell(this.numberOfCell);
  }

  /*
    create cell 
  */

  private fillCell(numberOfCells: number): number[] {
    return Array.from(Array(numberOfCells), (x, i) => i + 1);
  }

  /*
    Find and set the element color
  */
  setElementColor(row: number, column: number, color?: string) {
    if (
      row > this.rows.length ||
      column > this.cols.length ||
      row < 1 ||
      column < 1
    ) {
      return;
    }
    const tr = document.getElementById(
      '#cell' + row + '_' + column
    ) as HTMLTableRowElement;
    tr.style.backgroundColor =
      color === undefined ? tr.style.backgroundColor : color;
    return tr;
  }

  /*
  fill the range of element with provided color
  color : pass color like blue green yellow
  type: either row or column
  typeValue : if type is row pass row value or else column value 
  start: based on type pass the start range value
  end: based on type pass the end range value
  */
  fillColor(
    color: string,
    type: string,
    typeValue: number,
    start: number = 0,
    end: number | undefined
  ) {
    if (end === undefined) {
      end = type === 'row' ? this.rows.length : this.cols.length;
    }
    if (start > end) {
      return;
    }
    for (let cell: number = start; cell <= end!; cell++) {
      type === 'row'
        ? this.setElementColor(typeValue, cell, color)
        : this.setElementColor(cell, typeValue, color);
    }
  }

  /*
  check for existing element and its color
  */
  flood(row: number, column: number, colorToSet: string) {
    if (row > 0 && column > 0) {
      const currentElement = this.setElementColor(
        row,
        column,
        undefined
      ) as HTMLTableRowElement;
      const currentColor = currentElement.style.backgroundColor;
      if (currentColor === colorToSet) {
        return;
      }
      this.fillColorWithFlood(row, column, colorToSet, currentColor);
      return;
    }
  }

  /*
  check the adjacent cells of existing element, to fill the color accordingly
  */
  private fillColorWithFlood(
    row: number,
    column: number,
    colorToSet: string,
    oldColor: string
  ) {
    if (row < 1) {
      return;
    }
    if (column < 1) {
      return;
    }
    if (row > this.rows.length) {
      return;
    }
    if (column > this.cols.length) {
      return;
    }
    const cell = this.setElementColor(
      row,
      column,
      undefined
    ) as HTMLTableRowElement;
    const cellColor = cell.style.backgroundColor;
    if (cellColor !== oldColor) {
      return;
    }
    cell.style.backgroundColor = colorToSet;
    //Check for adjacent cells
    this.fillColorWithFlood(row, column - 1, colorToSet, oldColor);
    this.fillColorWithFlood(row, column + 1, colorToSet, oldColor);
    this.fillColorWithFlood(row - 1, column, colorToSet, oldColor);
    this.fillColorWithFlood(row + 1, column, colorToSet, oldColor);
  }
}
