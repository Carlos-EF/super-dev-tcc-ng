import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-auth',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Auth {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  private readonly supabase: SupabaseClient =
    createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    );

  readonly loading = signal(false);

  readonly showPassword = signal(false);

  readonly errorMessage = signal<string | null>(null);

  readonly successMessage = signal<string | null>(null);

  readonly loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get emailInvalid(): boolean {
    const control =
      this.loginForm.controls.email;

    return control.invalid &&
      (control.touched || control.dirty);
  };

  get passwordInvalid(): boolean {
    const control =
      this.loginForm.controls.password;

    return control.invalid &&
      (control.touched || control.dirty);
  };

  togglePassword(): void {
    this.showPassword.update(
      value => !value
    );
  };


  private clearMessages(): void {
    this.errorMessage.set(null);

    this.successMessage.set(null);
  };

  async login(): Promise<void> {
    this.clearMessages();

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      return;
    }

    this.loading.set(true);

    const {
      email,
      password
    } = this.loginForm.getRawValue();

    try {
      const {
        data,
        error
      } =
        await this.supabase.auth.signInWithPassword({
          email,
          password
        });

      if (error) {
        throw error;
      }

      if (!data.session) {
        throw new Error(
          'Não foi possível criar a sessão.'
        );
      }

      await this.router.navigate([
        '/home'
      ]);

    } catch (error: unknown) {
      this.errorMessage.set(
        this.translateAuthError(error)
      );
    } finally {
      this.loading.set(false);
    }
  };

  private translateAuthError(
    error: unknown
  ): string {
    const message =
      error instanceof Error
        ? error.message.toLowerCase()
        : '';

    if (
      message.includes(
        'invalid login credentials'
      )
    ) {
      return 'E-mail ou senha inválidos.';
    }

    if (
      message.includes(
        'email not confirmed'
      )
    ) {
      return 'Confirme seu e-mail antes de entrar.';
    }

    if (
      message.includes(
        'user not found'
      )
    ) {
      return 'Usuário não encontrado.';
    }

    if (
      message.includes(
        'rate limit'
      )
    ) {
      return 'Muitas tentativas. Aguarde alguns instantes e tente novamente.';
    }

    if (
      message.includes(
        'network'
      ) ||
      message.includes(
        'fetch'
      )
    ) {
      return 'Não foi possível conectar ao servidor. Verifique sua conexão.';
    }

    return 'Não foi possível realizar o login. Tente novamente.';
  };
}
