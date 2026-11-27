import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  details: string;
  technologies: string[];
  hosting: string;
  image: string;
  imageAlt: string;
  url: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements AfterViewInit, OnDestroy {
  @ViewChild('carousel') carouselRef!: ElementRef<HTMLDivElement>;
  @ViewChild('closeButton') closeButtonRef?: ElementRef<HTMLButtonElement>;
  @ViewChild('projectModal') projectModalRef?: ElementRef<HTMLElement>;

  // Agrega cada proyecto aquí; esta lista alimenta las tarjetas y ambos modales.
  readonly projects: Project[] = [
    {
      title: 'AgroSmart Tech',
      subtitle: 'Gestión Agrícola Inteligente',
      description: 'Plataforma para la gestión y optimización de operaciones agrícolas.',
      details: 'AgroSmart Tech reúne herramientas para organizar y optimizar las operaciones agrícolas desde una plataforma digital.',
      technologies: ['Python', 'javascript', 'REACT', 'CSS', 'MQTT', 'Node.js', 'Express', 'MongoDB','Raspberry Pi'],
      hosting: 'Por agregar',
      image: '/Agrosmart.png',
      imageAlt: 'Vista del proyecto AgroSmart Tech',
      url: 'https://agro-8w1r.onrender.com/'
    },
    {
      title: 'Proyecto Certificados',
      subtitle: 'Sistema de Gestión de Certificados',
      description: 'Plataforma para la gestión y emisión de certificados digitales.',
      details: 'Una plataforma enfocada en facilitar la gestión y emisión de certificados digitales.',
      technologies: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'HTML', 'CSS'],
      hosting: 'Por agregar',
      image: '/proyectocertificados.png',
      imageAlt: 'Vista del sistema de gestión de certificados',
      url: 'https://pruebas-80fw.onrender.com/#/'
    },
    {
    title: 'Mi nuevo proyecto',
    subtitle: 'Tipo o categoría del proyecto',
    description: 'Texto corto que aparecerá en la tarjeta.',
    details: 'Descripción más completa que aparecerá dentro del modal.',
    technologies: ['Angular', 'TypeScript', 'Node.js'],
    hosting: 'Render',
    image: '/proyectocertificados.png',
    imageAlt: 'Vista de Mi nuevo proyecto',
    url: 'https://mi-proyecto.com/'
  }
  ];

  selectedProject: Project | null = null;
  @ViewChild('modalProjectsCarousel') modalProjectsCarouselRef?: ElementRef<HTMLDivElement>;
  private scrollInterval?: ReturnType<typeof setInterval>;
  private lastFocusedCard?: HTMLButtonElement;

  get otherProjects(): Project[] {
    // Excluye del carrusel inferior el proyecto que ya está abierto.
    return this.projects.filter((project) => project !== this.selectedProject);
  }

  ngAfterViewInit(): void {
    this.startScroll();
  }

  ngOnDestroy(): void {
    this.pauseScroll();
  }

  openProject(project: Project, event: MouseEvent): void {
    // Guarda la tarjeta para devolverle el foco al cerrar el modal.
    this.lastFocusedCard = event.currentTarget as HTMLButtonElement;
    this.selectedProject = project;
    this.pauseScroll();
    setTimeout(() => this.closeButtonRef?.nativeElement.focus());
  }

  closeProject(): void {
    this.selectedProject = null;
    this.lastFocusedCard?.focus();
    this.startScroll();
  }

  @HostListener('document:keydown', ['$event'])
  onModalKeydown(event: KeyboardEvent): void {
    if (!this.selectedProject) return;

    if (event.key === 'Escape') {
      this.closeProject();
      return;
    }

    if (event.key !== 'Tab') return;

    // Mantiene la navegación por teclado dentro del diálogo accesible.
    const focusableElements = this.projectModalRef?.nativeElement.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableElements?.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  onDialogBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeProject();
    }
  }

  selectProject(project: Project): void {
    // Cambia el contenido del modal sin cerrarlo y vuelve al inicio de sus detalles.
    this.selectedProject = project;
    if (this.projectModalRef) {
      this.projectModalRef.nativeElement.scrollTop = 0;
    }
  }

  scrollModalProjects(direction: 'previous' | 'next'): void {
    const carousel = this.modalProjectsCarouselRef?.nativeElement;
    if (!carousel) return;

    const card = carousel.querySelector<HTMLElement>('.modal-project-card');
    if (!card) return;

    // Avanza una tarjeta completa, incluyendo el espacio entre tarjetas.
    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 0;
    carousel.scrollBy({
      left: (direction === 'next' ? 1 : -1) * (card.offsetWidth + gap),
      behavior: 'smooth'
    });
  }

  onCarouselFocusOut(event: FocusEvent): void {
    const carousel = event.currentTarget;
    if (carousel instanceof HTMLElement && !carousel.contains(event.relatedTarget as Node | null)) {
      this.startScroll();
    }
  }

  scrollCarousel(direction: 'previous' | 'next'): void {
    const carousel = this.carouselRef.nativeElement;
    const card = carousel.querySelector<HTMLElement>('.project-card');
    if (!card) return;

    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 0;
    const distance = card.offsetWidth + gap;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;

    // Al llegar a un extremo, el carrusel principal vuelve al extremo opuesto.
    if (direction === 'next' && carousel.scrollLeft >= maxScroll - 1) {
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (direction === 'previous' && carousel.scrollLeft <= 1) {
      carousel.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else {
      carousel.scrollBy({
        left: direction === 'next' ? distance : -distance,
        behavior: 'smooth'
      });
    }
  }

  startScroll(): void {
    this.pauseScroll();
    if (this.selectedProject) return;

    // El avance automático solo funciona si hay contenido que desbordar.
    this.scrollInterval = setInterval(() => {
      const carousel = this.carouselRef.nativeElement;
      if (carousel.scrollWidth > carousel.clientWidth) {
        this.scrollCarousel('next');
      }
    }, 4500);
  }

  pauseScroll(): void {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = undefined;
    }
  }
}
