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
      cellHeight: '180px', // Altura base de cada bloque
      margin: 15,          // Espacio entre tarjetas
      minRow: 1,           // Mínimo de filas
      float: true,         // Permite que las tarjetas floten hacia arriba
      animate: true,       // Animaciones suaves al soltar
      column: 12           // Sistema de 12 columnas (estándar de diseño)
    }, this.gridContainer.nativeElement);
  }
}