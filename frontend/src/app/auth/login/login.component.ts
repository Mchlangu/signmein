import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto, AuthResponseDto } from '../../models/auth.models';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginDto: LoginDto = { username: '', password: '' };
  private buildingLatitude = 40.7128;
  private buildingLongitude = -74.0060; 
  private maxDistance = 0.01;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  onSubmit(): void {
    this.authService.login(this.loginDto).subscribe({
      next: (response) => {
        localStorage.setItem('accessToken', response.accessToken);
        this.getLocationAndVerifyAttendance();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }

  getLocationAndVerifyAttendance(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => this.showPosition(position),
        (error) => console.error(error),
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position: GeolocationPosition): void {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const attended = this.isWithinBuilding(latitude, longitude);
    this.captureAttendance(attended);
  }

  isWithinBuilding(latitude: number, longitude: number): boolean {
    const distance = this.calculateDistance(latitude, longitude, this.buildingLatitude, this.buildingLongitude);
    return distance <= this.maxDistance;
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2 - lat1) * Math.PI/180;
    const Δλ = (lon2 - lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const distance = R * c;
    return distance;
  }

  captureAttendance(attended: boolean): void {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const headers = { 'Authorization': `Bearer ${accessToken}` };
      this.http.post('http://localhost:8080/api/attendance', { attended }, { headers }).subscribe({
        next: () => console.log('Attendance captured successfully'),
        error: (error) => console.error('Error capturing attendance', error)
      });
    }
  }
}
