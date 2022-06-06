import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { Router, ActivatedRoute } from '@angular/router'; //angular routing
import { ModalController, NavController } from '@ionic/angular'; //ionic routing
import { PlacesService } from '../../places.service';
import { Place } from '../../places.model';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;
  constructor(
    // private router: Router,
    private navController: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navController.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
    });
  }

  onBookPlace() {
    // this.router.navigateByUrl('/places/tabs/discover');//navigation angular
    //this.navController.navigateBack('/places/tabs/discover'); //navigation ionic
    // this.navController.pop();//that will not work after page refreshing.

    this.modalController
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.place },
      })
      .then((modalElement) => {
        modalElement.present();
        return modalElement.onDidDismiss();
      })
      .then((resultData) => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === 'confirm') {
          console.log('BOOKED!');
        }
      });
  }
}
