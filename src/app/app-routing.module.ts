import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';
import { ShowOrdenesComponent } from './show/show.orden.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'setting',
    pathMatch: 'full'
  },
  {
    path: 'home/:id',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'show/:id',
    loadChildren: './show/show.orden.module#ShowOrdenesModule',
    data: {
            orden: null
          },
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'reset-password',
    loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule',
  },
  {
    path: 'logout',
    loadChildren: './pages/profile/profile.module#ProfilePageModule',
    canActivate: [AuthGuard],

  },
  {
    path: 'signup',
    loadChildren: './pages/signup/signup.module#SignupPageModule'
  },
  {
    path: 'setting',
    loadChildren: './setting/setting.module#SettingPageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule',
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
