import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { GridStack } from 'gridstack';
@Component({
  selector: "app-habilidades",
  imports: [],
  templateUrl: "./habilidades.html",
  styleUrl: "./habilidades.css",
})
export class Habilidades implements AfterViewInit {
  // Capturamos el contenedor principal de la cuadrícula
  @ViewChild('gridContainer') gridContainer!: ElementRef;

  ngAfterViewInit(): void {
    // Inicializamos GridStack con opciones modernas
    GridStack.init({
      cellHeight: '180px',
      margin: 15,
      minRow: 1,
      float: true,
      animate: true,
      column: 12,
      sizeToContent: true,
      columnOpts: {
        breakpoints: [{ w: 768, c: 1 }],
      },
    }, this.gridContainer.nativeElement);
  }
}