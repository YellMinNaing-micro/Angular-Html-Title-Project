import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { MasterComponent } from './home/master/master.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { title: 'Home', favicon: 'assets/favicon-home.ico' }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home', favicon: 'assets/favicon-home.ico' },
    children: [
      {
        path: 'master',
        component: MasterComponent,
        data: { title: 'Master', favicon: 'assets/favicon-master.ico' }
      }
    ]
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'About', favicon: 'assets/favicon-about.ico' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], // Enable hash routing
  exports: [RouterModule]
})
export class AppRoutingModule { }
