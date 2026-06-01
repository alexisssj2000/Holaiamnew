import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements AfterViewInit, OnDestroy {
  // 1. Capturamos el div del carrusel usando el #carousel del HTML
  @ViewChild('carousel') carouselRef!: ElementRef<HTMLDivElement>;
  
  // Variable para guardar el temporizador y poder pausarlo
  private scrollInterval: any;

  // 2. Iniciamos el movimiento cuando el componente ya se dibujó en pantalla
  ngAfterViewInit(): void {
    this.startScroll();
  }

  // 3. Limpiamos el temporizador si el usuario cambia de página para evitar bugs
  ngOnDestroy(): void {
    this.pauseScroll();
  }

  // 4. Función para arrancar el movimiento automático
  startScroll(): void {
    // Evitamos que se creen múltiples intervalos si el usuario mueve mucho el mouse
    this.pauseScroll(); 
    
    // Configuramos el temporizador para que se ejecute cada 3 segundos (3000 ms)
    this.scrollInterval = setInterval(() => {
      if (this.carouselRef) {
        const el = this.carouselRef.nativeElement;
        
        // Calculamos si ya llegamos al final del scroll
        const maxScroll = el.scrollWidth - el.clientWidth;
        
        // Si ya está al final, lo regresamos al inicio (0). Si no, lo movemos 350px a la derecha.
        if (el.scrollLeft >= maxScroll - 10) { 
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: 350, behavior: 'smooth' });
        }
      }
    }, 3000); // Puedes cambiar el 3000 para que vaya más rápido o más lento
  }

  // 5. Función para pausar el movimiento
  pauseScroll(): void {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
  }
}