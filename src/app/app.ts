import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topbar } from "./components/topbar/topbar.component";
import { Sidebar } from "./components/sidebar/sidebar";
import { Toast } from './components/toast/toast';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Topbar,
    Sidebar,
    Toast
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tcc');
}
