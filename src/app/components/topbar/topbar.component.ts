import { Component, HostListener, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient, createClient, User } from '@supabase/supabase-js';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class Topbar {
  private readonly router = inject(Router);

  private readonly supabase: SupabaseClient =
    createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

  readonly userMenuOpen = signal(false);

  readonly user = signal<User | null>(null);

  readonly userName = signal('Usuário');

  readonly userEmail = signal('');

  readonly userInitials = signal('US');


  constructor() {
    this.loadUser();

    this.supabase.auth.onAuthStateChange(
      (_event, session) => {

        const user =
          session?.user ?? null;

        this.setUser(user);

      }
    );
  };

  private async loadUser(): Promise<void> {
    const {
      data,
      error
    } = await this.supabase.auth.getUser();

    if (error || !data.user) {
      return;
    }

    this.setUser(data.user);
  };


  private setUser(user: User | null): void {
    this.user.set(user);

    if (!user) {

      this.userName.set('Usuário');
      this.userEmail.set('');
      this.userInitials.set('US');

      return;
    }

    const metadata =
      user.user_metadata as {
        nome?: string;
        name?: string;
      };

    const name =
      metadata?.nome?.trim() ||
      metadata?.name?.trim() ||
      '';

    const email =
      user.email?.trim() || '';

    const displayName =
      name || this.nameFromEmail(email);

    this.userName.set(displayName);

    this.userEmail.set(email);

    this.userInitials.set(
      this.generateInitials(displayName)
    );
  };


  toggleUserMenu(): void {
    this.userMenuOpen.update(
      open => !open
    );
  };

  @HostListener(
    'document:click',
    ['$event']
  )
  onDocumentClick(event: MouseEvent): void {
    const target =
      event.target as HTMLElement;

    if (
      !target.closest('.user-menu')
    ) {

      this.userMenuOpen.set(false);

    }
  };

  async logout(): Promise<void> {
    this.userMenuOpen.set(false);

    const {
      error
    } = await this.supabase.auth.signOut();

    if (error) {

      console.error(
        'Erro ao sair:',
        error
      );

      return;
    }

    await this.router.navigate([
      '/login'
    ]);
  };

  private generateInitials(
    name: string
  ): string {
    const normalized =
      name
        .trim()
        .replace(/\s+/g, ' ');

    if (!normalized) {
      return 'US';
    }

    const parts =
      normalized.split(' ');

    if (parts.length === 1) {

      return parts[0]
        .substring(0, 2)
        .toUpperCase();

    }

    const first =
      parts[0][0];

    const last =
      parts[parts.length - 1][0];

    return (
      `${first}${last}`
    ).toUpperCase();
  };

  private nameFromEmail(
    email: string
  ): string {
    if (!email) {
      return 'Usuário';
    }

    const localPart =
      email.split('@')[0];

    return localPart
      .replace(/[._-]+/g, ' ')
      .replace(/\b\w/g, letter =>
        letter.toUpperCase()
      );
  };
}
