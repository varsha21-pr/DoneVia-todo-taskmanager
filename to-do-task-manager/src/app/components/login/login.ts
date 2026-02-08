import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';
  isDarkMode = false;

  constructor(private router: Router,
    private http:HttpClient ) {}
    ngOnInit() {
      this.isDarkMode = localStorage.getItem('theme') === 'dark';
      document.body.classList.toggle('dark-theme', this.isDarkMode);
    }

    login(form: NgForm) {
      if (form.invalid) return;
    
      this.http.post<any>('http://localhost:8082/api/auth/login', {
        email: this.email,
        password: this.password
      }).subscribe({
        next: (user) => {
          localStorage.setItem('userId', user.userId);
          localStorage.setItem('userName', user.name);
          this.router.navigate(['/tasks']);
        },
        error: () => {
          alert('Invalid credentials');
        }
      });
    }
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      document.body.classList.toggle('dark-theme', this.isDarkMode);
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
}
