import { Component, OnInit } from '@angular/core';
import { CurrencyRatesMemeService } from '../_service/currency-rates-meme.service';

@Component({
  selector: 'app-currency-rate-meme',
  templateUrl: './currency-rate-meme.component.html',
  styleUrls: ['./currency-rate-meme.component.css']
})
export class CurrencyRateMemeComponent implements OnInit
{
    constructor(private currencyRateMemeService: CurrencyRatesMemeService) { }

    let 

    private gifMeme: GifObject;

    ngOnInit(): void
    {
        let gifMemeI = this.currencyRateMemeService.getLatestCurrencyMeme();
        this.gifMeme;
    }

}
