import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyConversionService } from './currency-conversion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'currencyCalculator';
  conversionForm!: FormGroup;
  convertedAmount: number | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private conversionService: CurrencyConversionService) {}

  ngOnInit(): void {
    this.conversionForm = this.fb.group({
      amount: ['', [Validators.required]],
      currency: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.conversionForm.valid) {
      const amount = this.conversionForm.value.amount;
      const currency = this.conversionForm.value.currency;
      this.conversionService.convertToUSD(amount, currency).subscribe({
        next: (result) => {
          this.convertedAmount = result;
            this.errorMessage = null
      }, error: (err) => {
        
          console.error('Error converting currency:', err);
          this.errorMessage = 'There was an error converting the currency. Please check the currency code and try again.';

      }
      }
        
      );
    }
  }
}
