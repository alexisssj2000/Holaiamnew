import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root' // Disponible en toda la aplicación
})
export class ProjectService {
  // En local usas localhost, en producción cambiarás esto por la URL de Render de tu backend
  private apiUrl = `${environment.apiUrl}/getProjects`;; 

  constructor(private http: HttpClient) {}

  // Método para obtener todos los proyectos de la base de datos
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
