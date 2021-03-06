import { Component, OnInit, OnDestroy } from '@angular/core';
import { Booking } from './bookings.model';
import { BookingsService } from './bookings.service';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  isLoading = false;
  private bookingSub: Subscription;

  constructor(
    private bookingsService: BookingsService,
    private loadingControlling: LoadingController
  ) {}

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.bookingSub = this.bookingsService.bookings.subscribe((bookings) => {
      this.loadedBookings = bookings;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.bookingsService.fetchBookings().subscribe();
    this.isLoading = false;
  }

  onCancelBooking(bookingId: string, slidingBookingItemToLeft: IonItemSliding) {
    slidingBookingItemToLeft.close();
    this.loadingControlling
      .create({
        message: 'Cancelling...',
      })
      .then((loadingElement) => {
        loadingElement.present();
        this.bookingsService.cancelBooking(bookingId).subscribe(() => {
          loadingElement.dismiss();
        });
      });
  }
}
