import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConversionService {
  private readonly apiUrl = 'https://v6.exchangerate-api.com/v6/';
  private readonly apiKey = '2175773fe13edf6f9ed8ec91'; // Replace with your actual API key


  constructor(private http: HttpClient) { }

  convertToUSD(amount: number, currency: string): Observable<number> {
    const url = `${this.apiUrl}${this.apiKey}/latest/${currency}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        console.log('API Response:', response); // Log the API response
        const rate = response?.conversion_rates?.USD;
        if (!rate) {
          throw new Error('USD rate not found in API response');
        }
        return amount * rate;
      })
    );
  }
}
