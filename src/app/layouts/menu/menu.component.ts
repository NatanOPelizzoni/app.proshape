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
					{label: 'Dashboard', icon: 'home', routerLink: ['/app'], visible: true}
				]
			},
			{
				label: 'Cadastros',
				visible: true,
				items: [
					{label: 'Usuários', icon: 'group', routerLink: ['/app/user'], visible: true},
					{label: 'Clientes', icon: 'emoji_people', routerLink: ['/app/client'], visible: true},
					{label: 'Grupo Muscular', icon: 'accessibility_new', routerLink: ['/app/body-group'], visible: true},
					{label: 'Exercício', icon: 'fitness_center', routerLink: ['/app/exercise'], visible: true},
					{label: 'Ficha de treino', icon: 'receipt_long', routerLink: ['/app/training-sheet'], visible: true},
				]
			}
		];

	}
}
