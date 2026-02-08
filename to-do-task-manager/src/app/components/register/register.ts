import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  name = '';
  email = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  register(): void {

    if (!this.name || !this.email || !this.password) {
      this.error = 'All fields are required';
      return;
    }

    if (!this.email.endsWith('@gmail.com')) {
      this.error = 'Email must end with @gmail.com';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters';
      return;
    }

    this.error = '';

    this.http.post('http://localhost:8082/api/auth/register', {
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.error = 'Email already exists';
      }
    });
  }
}