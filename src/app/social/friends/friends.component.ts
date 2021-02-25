import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  userFriends: any = [];

  constructor(private friendService: FriendsService) { }

  ngOnInit(): void {
    this.getFriends();
  }

  getFriends() {
    this.friendService.getFriends().subscribe(res => {
      this.userFriends = res;
    })
  }

}
