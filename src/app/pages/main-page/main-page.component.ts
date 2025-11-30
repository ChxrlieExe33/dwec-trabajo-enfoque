import { Component } from '@angular/core';
import {HeaderBarComponent} from '../../components/header-bar/header-bar.component';
import {MainPageOptionsComponent} from '../../components/main-page-options/main-page-options.component';
import {FooterBarComponent} from '../../components/footer-bar/footer-bar.component';

@Component({
  selector: 'app-main-page',
  imports: [
    HeaderBarComponent,
    MainPageOptionsComponent,
    FooterBarComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

}
