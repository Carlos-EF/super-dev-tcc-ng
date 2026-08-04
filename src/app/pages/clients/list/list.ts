import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class ClientsList {
  
}
