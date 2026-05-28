import { Routes } from '@angular/router';
import { Home } from './features/home/home.component';
import { Projects } from './features/projects/projects';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'projects', component: Projects}

];
