import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Asegúrate de tenerlo para las directivas estructuradas
import { ProjectService } from '../../core/services/project.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule], // Necesario si usas ciclos en el HTML
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('carousel') carouselRef!: ElementRef<HTMLDivElement>;
  private scrollInterval: any;
  
  // Aquí guardaremos los proyectos que vengan de la base de datos
  projects: any[] = []; 

  // Inyectamos el servicio en el constructor
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    // Llamamos a la API en cuanto el componente se inicializa
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data; // Guardamos los datos del backend
      },
      error: (err) => {
        console.error('Error al conectar con el backend:', err);
      }
    });
  }

  getImageUrl(imagePath: string): string {
    if (!imagePath) return '';
    // El backend ya limpia 'src/uploads/', así que solo unimos la URL base estática
    return `${environment.staticUrl}/uploads/${imagePath}`;
  }

  // Lógica del carrusel automático (se mantiene igual)
  ngAfterViewInit(): void {
    this.startScroll();
  }

  ngOnDestroy(): void {
    this.pauseScroll();
  }

  startScroll(): void {
    this.pauseScroll(); 
    this.scrollInterval = setInterval(() => {
      if (this.carouselRef && this.projects.length > 0) { // Validamos que ya haya proyectos cargados
        const el = this.carouselRef.nativeElement;
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (el.scrollLeft >= maxScroll - 10) { 
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollBy({ left: 350, behavior: 'smooth' });
        }
      }
    }, 3000);
  }

  pauseScroll(): void {
    if (this.scrollInterval) clearInterval(this.scrollInterval);
  }
}