import { Component, OnInit, OnDestroy } from '@angular/core';
import { Booking } from './bookings.model';
import { BookingsService } from './bookings.service';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  loagedBookings: Booking[];
  private bookingSub: Subscription;

  constructor(private bookingsService: BookingsService) {}

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.bookingSub = this.bookingsService.bookings.subscribe((bookings) => {
      this.loagedBookings = bookings;
    });
  }

  onCancelBooking(offerId: string, slidingBookingItemToLeft: IonItemSliding) {
    slidingBookingItemToLeft.close();
    //cancel booking with id offerId
  }
}
