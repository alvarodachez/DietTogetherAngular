import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management-group',
  templateUrl: './management-group.component.html',
  styleUrls: ['./management-group.component.scss']
})
export class ManagementGroupComponent implements OnInit {

  showTraditional:boolean;

  constructor() { }

  ngOnInit(): void {
    this.showTraditional = true;
  }

  changeTradicional(){
    
      this.showTraditional = true;
    
    
  }

  changeObjetivo(){
    
    this.showTraditional = false;
  
  
}

}
