import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { GeolocationService } from './geolocation.service';

@NgModule({
  declarations: [
    HomeComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  providers: [GeolocationService],
})
export class MainModule { }
