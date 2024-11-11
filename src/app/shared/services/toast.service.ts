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
					const oMessage = this.getFixedMessage(message);
					this.messageService.add({severity: oMessage.severity, summary: oMessage.summary, detail: oMessage.detail, life: 1000});
				});
			});
		}
	}

	private getFixedMessage(message: string): { severity: string, summary: string, detail: string } {
		switch (message) {
			case 'The email has already been taken.':
				return {severity: 'warning', summary: 'Atenção', detail: 'O email já está sendo utilizado.'};
			case 'The password field must be at least 8 characters.':
				return {severity: 'warning', summary: 'Atenção', detail: 'A senha deve ter pelo menos 8 caracteres.'};
			default:
				return {severity: 'error', summary: 'Erro', detail: message};
		}
	}
}
