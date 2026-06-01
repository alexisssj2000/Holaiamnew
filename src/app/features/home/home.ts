import { Component } from "@angular/core";
import { Habilidades } from "../habilidades/habilidades";
import { Projects } from "../projects/projects";
import { Certificados } from "../certificados/certificados";

@Component({
  selector: "app-home",
  imports: [Habilidades,Projects,Certificados],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
})
export class Home {}
