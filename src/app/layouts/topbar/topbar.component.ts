import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from "@angular/router";
import { LayoutService } from "../service/layout.service";
import { NgClass } from "@angular/common";
import { MenuItem } from "primeng/api";

@Component({
	selector: 'app-topbar',
	standalone: true,
	imports: [
		RouterLink,
		NgClass,
	],
	templateUrl: './topbar.component.html',
	styleUrl: './topbar.component.scss'
})
export class TopbarComponent {

	items!: MenuItem[];

	@ViewChild('menubutton') menuButton!: ElementRef;

	@ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

	@ViewChild('topbarmenu') menu!: ElementRef;

	constructor(
		public layoutService: LayoutService
	) {
	}
}
