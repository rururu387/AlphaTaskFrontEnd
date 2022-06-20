import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CurrencyRatesMemeService {

    constructor(private httpClient: HttpClient) 
    {
        this.serverUrl = "http://localhost:8080/api/v1/usd-rate/random-contemporary-memes";
    }

    private serverUrl: string;

    getLatestCurrencyMeme(currencyId: string): Observable<any>
    {
        let httpParams = new HttpParams();
        httpParams = httpParams.append("quoteCurrencyId", currencyId);

        let httpHeaders = new HttpHeaders();
        httpHeaders = httpHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        return this.httpClient.get(this.serverUrl, { headers: httpHeaders, params: httpParams });
    }
}
