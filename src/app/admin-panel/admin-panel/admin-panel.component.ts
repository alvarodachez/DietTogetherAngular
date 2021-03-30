import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../services/admin-service.service';
import { LogInService } from '../../entry/services/log-in.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  showMenu:string;

  allReports : any = [];

  myReports : any = [];

  actualPage: number = 1;

  actualPage2: number = 1;

  constructor(private adminService:AdminServiceService, private login:LogInService) { }

  ngOnInit(): void {
    this.login.isUserInSession();
    this.showMenu = 'reportes';
    this.getAllReports();
    this.getMyReports();
    
  }

  /**
   * Funcion que obtiene todos los reportes
   */
  getAllReports(){
    this.adminService.getReports().subscribe( response => {

      this.allReports = response;
    })
  }

  getMyReports(){
    this.adminService.getAssignedReports().subscribe(response => {
      this.myReports = response;
    })
  }

  assignReport(id:any){
    this.adminService.assignReport(id).subscribe(response =>{

      this.getAllReports()
      this.getMyReports();

    })
  }

  changeShowMenu(toChange:string){
    this.showMenu = toChange;
  }



}
