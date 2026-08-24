import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topbar } from "./components/topbar/topbar.component";
import { Sidebar } from "./components/sidebar/sidebar";
import { Toast } from './components/toast/toast';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../environments/environments';

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

  private readonly supabase: SupabaseClient =
    createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

  readonly isAuthenticated = signal(false);

  constructor() {
    this.loadSession();

    this.supabase.auth.onAuthStateChange(
      (_event, session) => {

        this.isAuthenticated.set(
          !!session
        );

      }
    );
  }


  private async loadSession(): Promise<void> {
    const {
      data,
      error
    } = await this.supabase.auth.getSession();

    if (error) {

      this.isAuthenticated.set(false);

      return;
    }

    this.isAuthenticated.set(
      !!data.session
    );
  };
}
