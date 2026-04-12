import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Toast } from "primeng/toast";
import { ConfirmDialogModule } from "primeng/confirmdialog";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, Toast, ConfirmDialogModule],
    template: `
    <router-outlet></router-outlet>
    <p-toast></p-toast>
    <p-confirmdialog></p-confirmdialog>
    `
})
export class AppComponent {}
