import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,   
    MatButtonModule,
    MatIconButton,
    MatToolbarModule,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public isSidebarOpen: boolean = false;

  private sub: Subscription = new Subscription();

  constructor(private uiService: UiService) {}

  ngOnInit() {
    this.sub.add(
      this.uiService.getSidebarOpen().subscribe((isOpen) => {
        this.isSidebarOpen = isOpen;
      })
    );

}
ngOnDestroy() {
  this.sub.unsubscribe();
}

public toggleSidebar(): void {
  this.uiService.toggleSidebar(!this.isSidebarOpen);
}
}
