import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; //angular routing
import { NavController } from '@ionic/angular'; //ionic routing

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  constructor(private router: Router, private navController: NavController) {}

  ngOnInit() {}

  onBookPlace() {
    // this.router.navigateByUrl('/places/tabs/discover');//navigation angular
    this.navController.navigateBack('/places/tabs/discover');//navigation ionic
    // this.navController.pop();//that will not work after page refreshing.
  }
}
