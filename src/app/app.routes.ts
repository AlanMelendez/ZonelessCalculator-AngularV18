import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@/calculator/pages/calculator-view/calculator-view.component'),
  },
  {
    path:'**',
    redirectTo: '/calculator',
  }
];

