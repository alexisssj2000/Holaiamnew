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
    GridStack.init(
      {
        cellHeight: '90px',
        margin: 1,
        minRow: 1,
        float: false,
        animate: true,
        column: 12,
        sizeToContent: true,
        columnOpts: {
          breakpoints: [
            { w: 1024, c: 12 },
            { w: 768, c: 1 },
          ],
        },
      },
      this.gridContainer.nativeElement,
    );
  }
}