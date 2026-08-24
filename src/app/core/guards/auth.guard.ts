import { inject } from '@angular/core';
import {
    CanActivateFn,
    Router
} from '@angular/router';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environments';


export const authGuard: CanActivateFn = async () => {
    const supabase: SupabaseClient =
        createClient(
            environment.supabaseUrl,
            environment.supabaseKey
        );

    const router =
        inject(Router);

    const {
        data,
        error
    } =
        await supabase.auth.getSession();

    if (
        error ||
        !data.session
    ) {
        return router.createUrlTree([
            '/login'
        ]);
    }

    return true;
};