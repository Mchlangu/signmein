import { Component, OnInit } from '@angular/core';
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  latitude: number | null = null;
  longitude: number | null = null;
  
  officeLatitude: number = -26.1858094;
  officeLongitude: number = 28.018118;
  units: string = "K";
  approvedRadius: number = 3;
  userRadius: number | null = null;


  
  error: string | null = null;

  constructor(private geolocationService: GeolocationService) { }

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  getCurrentLocation(): void {
    this.geolocationService.getCurrentPosition()
      .then(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.userRadius = this.geolocationService.distance(this.officeLatitude, this.officeLongitude, 
        this.latitude, this.longitude, this.units)
        if( this.userRadius<= this.approvedRadius){
            console.log('Welcome to shaper');
            alert("Welcome to shaper");
        }

      })
      .catch(error => {
        this.error = error;
      });
  }
}
  