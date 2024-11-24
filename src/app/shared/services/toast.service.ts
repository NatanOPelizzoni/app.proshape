import { Injectable } from '@angular/core';
import { MessageService } from "primeng/api";

@Injectable({
	providedIn: 'root'
})
export class ToastService {

	constructor(
		private messageService: MessageService
	) {
	}

	showToast(severity: 'success' | 'info' | 'warn' | 'error' | 'contrast' | 'secondary', summary: string, detail: string, life: number = 1000) {
		this.messageService.add({severity: severity, summary: summary, detail: detail, life: life});
	}

	showCrudAlerts(errors: { [key: string]: string[] }) {
		if (errors) {
			Object.keys(errors).forEach(key => {
				errors[key].forEach((message: string) => {
					this.showFixedToast(message);
				});
			});
		}
	}

	private showFixedToast(message: string): void {
		switch (message) {
			case 'The email has already been taken.':
				this.showToast('warn', 'Atenção', 'O email já está sendo utilizado.', 5000);
				break;
			case 'The password field must be at least 8 characters.':
				this.showToast('warn', 'Atenção', 'A senha deve ter pelo menos 8 caracteres.', 5000);
				break;
			case 'The name field must not be greater than 255 characters.':
				this.showToast('warn', 'Atenção', 'O nome não deve ter mais de 255 caracteres.', 5000);
				break;
			case 'The email field must be a valid email address.':
				this.showToast('warn', 'Atenção', 'O email deve ser um endereço de email válido.', 5000);
				break;
			case 'The email field must not be greater than 255 characters.':
				this.showToast('warn', 'Atenção', 'O email não deve ter mais de 255 caracteres.', 5000);
				break;
			default:
				this.showToast('error', 'Erro', message, 5000);
				break;
		}
	}
}
