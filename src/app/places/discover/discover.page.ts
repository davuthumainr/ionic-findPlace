import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Place } from '../places.model';
import { PlacesService } from '../places.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  private placesSub: Subscription;

  constructor(
    private placesService: PlacesService,
    private menuController: MenuController
  ) {}

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.placesService.places.subscribe((places) => {
      this.loadedPlaces = places;
      this.listedLoadedPlaces = this.loadedPlaces.slice(1);
    });
  }

  //discover menu - openmenu
  onOpenMenu() {
    this.menuController.toggle();
  }

  //
  onFilterUpdate(event: any) {
    console.log(event.detail);
  }
}
