import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../services/admin-service.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  allReports : any = [];

  actualPage: number = 1;

  constructor(private adminService:AdminServiceService) { }

  ngOnInit(): void {
    this.getAllReports();
  }

  /**
   * Funcion que obtiene todos los reportes
   */
  getAllReports(){
    this.adminService.getReports().subscribe( response => {

      this.allReports = response;
    })
  }



}
