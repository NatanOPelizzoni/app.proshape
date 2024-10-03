import { Component, OnInit } from '@angular/core';
import { LayoutService } from "../service/layout.service";
import { NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { MenuitemComponent } from "../menuitem/menuitem.component";

@Component({
	selector: 'app-menu',
	standalone: true,
	imports: [
		NgForOf,
		NgIf,
		NgOptimizedImage,
		MenuitemComponent
	],
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

	model: any[] = [];

	constructor(
		public layoutService: LayoutService,
	) {
	}

	ngOnInit() {
		this.model = [
			{
				label: 'Home',
				visible: true,
				items: [
					{label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/app'], visible: true, isMaterialIcon: false}
				]
			},
			{
				label: 'Cadastros',
				visible: true,
				items: [
					{label: 'Usuários', icon: 'pi pi-fw pi-users', routerLink: ['/app/user'], visible: true, isMaterialIcon: false},
					{label: 'Clientes', icon: 'pi pi-fw pi-address-book', routerLink: ['/app/client'], visible: true, isMaterialIcon: false},
					{label: 'Grupo Muscular', icon: 'accessibility', routerLink: ['/app/body-group'], visible: true, isMaterialIcon: true},
					{label: 'Exercício', icon: 'fitness_center', routerLink: ['/app/exercise'], visible: true, isMaterialIcon: true},
					{label: 'Ficha de treino', icon: 'list_alt', routerLink: ['/app/training-sheet'], visible: true, isMaterialIcon: true},
				]
			}
		];

	}
}
