import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from "primeng/api";
import { ToastService } from "./shared/services/toast.service";
import { ToastModule } from "primeng/toast";

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, ToastModule],
	providers: [MessageService, ToastService],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
}
