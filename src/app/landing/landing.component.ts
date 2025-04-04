import { Component} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  letters = ['J', 'F', 'Q', 'P', 'W', 'R', 'S', 'X', 'T', 'A', 'L', 'G', 'C', 'B', 'Y', 'E', 'U', 'O', 'D', 'Z', 'K', 'H', 'I', 'M', 'N', 'V', ];
  ngOnInit(): void {
    const isAlert = sessionStorage.getItem('alert');

    if (!sessionStorage.getItem('alert')) {
      Swal.fire({
        title: 'Welcome',
        html: `This interactive web app is designed to help you enhance your Kapampangan vocabulary. 
               <br><br>For more information, kindly refer to the About Page.`,
        imageUrl: '/assets/icon.png',
        imageWidth: 150,
        imageHeight: 150,
        showCancelButton: false,
        confirmButtonText: 'I understand',
        cancelButtonText: 'No',
        confirmButtonColor: '#BB3E03',
        cancelButtonColor: '#BB3E03',
        customClass: {
          title: 'swal-custom-title',
          htmlContainer: 'swal-custom-text',
          confirmButton: 'swal-custom-button',
          cancelButton: 'swal-custom-button'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          sessionStorage.setItem('alert', 'true');
        }
      });
    }
  }    

  constructor(private router: Router) {}
  goToPlay() {
    this.router.navigate(['/play'])
  }

  goToAbout() {
    this.router.navigate(['/about'])
  }

  goTohow() {
    this.router.navigate(['/how-to-play'])
  }

  

}
