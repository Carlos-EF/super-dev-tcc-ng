import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topbar } from "./components/topbar.component/topbar.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Topbar
],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tcc');
}
