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
}
