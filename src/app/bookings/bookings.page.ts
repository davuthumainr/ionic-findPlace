import { Component, OnInit } from '@angular/core';
import { Booking } from './bookings.model';
import { BookingsService } from './bookings.service';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  loagedBookings: Booking[];

  constructor(private bookingsService: BookingsService) {}

  ngOnInit() {
    this.loagedBookings = this.bookingsService.bookings;
  }

  onCancelBooking(offerId: string, slidingBookingItemToLeft: IonItemSliding) {
    slidingBookingItemToLeft.close();
    //cancel booking with id offerId
  }
}
