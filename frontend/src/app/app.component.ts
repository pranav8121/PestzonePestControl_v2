import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pestzone Pest Control';
  contactForm: FormGroup;
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;

  // Business Information
  businessInfo = {
    name: 'Pestzone Pest Control',
    phones: ['+91-9819833383', '+91-8108489177'],
    email: 'santoshkadam1916@gmail.com',
    address: 'Katodi pada, Ramchandra B Kadam Marg, near Kajrolkar society, Ghatkopar, Mumbai, Maharashtra 400084'
  };

  // Services offered
  services = [
    {
      icon: 'fas fa-bug',
      title: 'Cockroach Control',
      description: 'Complete elimination of cockroaches with organic, safe treatments that protect your family and pets.'
    },
    {
      icon: 'fas fa-home',
      title: 'Termite Treatment',
      description: 'Advanced termite control solutions to protect your property from structural damage with eco-friendly methods.'
    },
    {
      icon: 'fas fa-spider',
      title: 'General Pest Control',
      description: 'Comprehensive pest management for ants, spiders, lizards, and other common household pests.'
    },
    {
      icon: 'fas fa-mouse-pointer',
      title: 'Rodent Control',
      description: 'Effective and humane rodent control solutions to keep mice and rats away from your premises.'
    },
    {
      icon: 'fas fa-leaf',
      title: 'Organic Solutions',
      description: 'Environment-friendly pest control using organic compounds that are safe for children and pets.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Preventive Care',
      description: 'Regular maintenance and prevention programs to keep your property pest-free year-round.'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.email]],
      message: ['']
    });
  }

  // Make phone call
  makeCall(phone: string): void {
    window.location.href = `tel:${phone}`;
  }

  // Send WhatsApp message
  sendWhatsApp(phone: string): void {
    const message = encodeURIComponent('Hi, I need pest control services. Please provide more information.');
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }

  // Submit contact form
  onSubmit(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitMessage = '';

      const formData = this.contactForm.value;
      
      // Make API call to backend
      this.http.post(`${environment.apiUrl}/contact`, formData)
        .subscribe({
          next: (response: any) => {
            this.submitSuccess = true;
            this.submitMessage = response.message || 'Thank you! We will contact you soon.';
            this.contactForm.reset();
            this.isSubmitting = false;
          },
          error: (error) => {
            this.submitSuccess = false;
            this.submitMessage = error.error?.message || 'Failed to submit. Please try again.';
            this.isSubmitting = false;
          }
        });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  // Get form control for validation
  getFormControl(name: string) {
    return this.contactForm.get(name);
  }

  // Scroll to section
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}