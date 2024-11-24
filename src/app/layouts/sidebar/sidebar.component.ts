import { Component, ElementRef } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { LayoutService } from "../service/layout.service";

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [
		MenuComponent
	],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

	constructor(
		public layoutService: LayoutService,
		public el: ElementRef
	) {
	}

}
