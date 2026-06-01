import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
// 1. Importamos NgParticlesService aquí
import { NgxParticlesModule, NgParticlesService } from '@tsparticles/angular'; 
import { type Engine } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, NgxParticlesModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  
  id = "tsparticles";

  particlesOptions = {
    background: { color: { value: "#121212" } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        resize: { enable: true }
      },
      modes: { repulse: { distance: 100, duration: 0.4 } }
    },
    particles: {
      color: { value: "#4ade80" },
      links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.2, width: 1 },
      move: { enable: true, speed: 1.2, direction: "none" as const, random: false, straight: false, outModes: { default: "bounce" as const } },
      number: { density: { enable: true, width: 800, height: 800 }, value: 50 },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } }
    },
    detectRetina: true
  };

  // 2. Inyectamos el servicio en el constructor de Angular
  constructor(private readonly ngParticlesService: NgParticlesService) {}

  // 3. Inicializamos el motor a través del servicio
  ngOnInit(): void {
    this.ngParticlesService.init(async (engine: Engine) => {
      await loadSlim(engine);
    });
  }
}