import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/calculator',
    loadComponent: () => import('./calculator/components/calculator-view/calculator-view.component')
  },
];

