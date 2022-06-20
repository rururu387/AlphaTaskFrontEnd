import { Component, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { CurrencyRatesMemeService } from '../_service/currency-rates-meme.service';
import { map, Observable, Subscription } from 'rxjs';
import { CurrencyName } from '../_payload/currency-name';
import { VisualMediaObject } from '../_payload/visual-media-object';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-currency-rate-meme',
  templateUrl: './currency-rate-meme.component.html',
  styleUrls: ['./currency-rate-meme.component.css']
})
export class CurrencyRateMemeComponent implements OnInit, OnDestroy
{
    private currencyMap: CurrencyName[] = [];

    constructor(private currencyRateMemeService: CurrencyRatesMemeService, private popUpService: ToastEvokeService,
        private sanitizer: DomSanitizer) { }

    currencyFormControl = new FormControl();

    gifMemes: VisualMediaObject[] = [];

    private selectedCurrencyIdSubscription: Subscription | null = null;
    private selectedCurrencyId: string | null = null;

    getOptionText(currencyName: CurrencyName): string
    {
        if (currencyName == null)
        {
           return "";
        }

        return currencyName.getFullName();
    }

    showMeme(): void
    {
        if (this.selectedCurrencyId == null)
        {
            let popUpSubscription = this.popUpService.warning("Недостаточно информации", 
            "Пожалуйста, выберите валюту, по отношению к которой изменился курс доллара")
            .subscribe({ 
                complete: () => { popUpSubscription.unsubscribe(); }
            })
            return;
        }

        let memeSubscription = this.currencyRateMemeService.getLatestCurrencyMeme(this.selectedCurrencyId).subscribe({
            next: (recentRateMemeResponseI: any) =>
            {
                this.gifMemes = [];

                let gifMemesI = recentRateMemeResponseI.visualMediaObjects;
                for (let gifMemeI of gifMemesI)
                {
                    let gifMeme = new VisualMediaObject(this.sanitizer, this.popUpService);
                    
                    gifMeme.setId(gifMemeI.id);

                    const host = "";
                    if (!gifMeme.setURL(SecurityContext.URL, gifMemeI.URL))
                    {
                        let popUpSubscription = this.popUpService.danger("Не удалось получить гифку", "Санитайзер недопустил ее загрузку \
                        по полученной ссылке")
                            .subscribe({ 
                                complete: () => { popUpSubscription.unsubscribe(); }
                            })
                    }
                    gifMeme.setHSizePixels(gifMemeI.hSizePixels);
                    gifMeme.setWSizePixels(gifMemeI.wSizePixels);
                    gifMeme.setTitle(gifMemeI.title);

                    this.gifMemes.push(gifMeme);
                }

                if (recentRateMemeResponseI.recentRateDynamics === "GAIN")
                {
                    for (let i = 1; i < 4; i++)
                    {
                        let popUpSubscription = this.popUpService.success("Stonks", "Money!Money!Money!Money!Money!Money!Money!Money!")
                        .subscribe({ 
                            complete: () => { popUpSubscription.unsubscribe(); }
                        })
                    }
                }

                if (recentRateMemeResponseI.recentRateDynamics === "STABLE")
                {
                    let popUpSubscription = this.popUpService.success("Be patient", "Don't panic! Results later.")
                    .subscribe({ 
                        complete: () => { popUpSubscription.unsubscribe(); }
                    })
                }
            },
            error: (error: any) =>
            {
                let popUpSubscription = this.popUpService.danger("Не удалось получить гифку", error.message)
                .subscribe({ 
                    complete: () => { popUpSubscription.unsubscribe(); }
                })
            },
            complete: () =>
            {
                memeSubscription.unsubscribe();
            }
        });

        /*this.gifMemes = [];
        let gifMeme = new VisualMediaObject(this.sanitizer);
        gifMeme.setId("1");

        const host = "https://giphy.com/";
        let input = "embed/3fM0YdrBuHiiQ";

        gifMeme.setURL(SecurityContext.RESOURCE_URL, host, input);
        gifMeme.setHSizePixels(270);
        gifMeme.setWSizePixels(480);
        gifMeme.setTitle("Cool goose");

        this.gifMemes.push(gifMeme);*/
    }

    filteredOptions: Observable<CurrencyName[]> = new Observable();

    private _filter(value: string): CurrencyName[] {
        const filterValue = value.toLowerCase();

        return this.currencyMap.filter(option => option.getFullName().toLowerCase().includes(filterValue))
        .sort((val1, val2) => 
        {
            return val1.getFullName().toLowerCase().localeCompare(val2.getFullName().toLowerCase())
        });
    }

    ngOnDestroy(): void
    {
        if (this.selectedCurrencyIdSubscription != null && ! this.selectedCurrencyIdSubscription.closed)
        {
            this.selectedCurrencyIdSubscription.unsubscribe();
        }
    }

    ngOnInit(): void
    {
        this.filteredOptions = this.currencyFormControl.valueChanges.pipe(
            map((value: CurrencyName | string) => 
            {
                if (value instanceof CurrencyName)
                {
                    return this._filter(value.getFullName());
                }
                return this._filter(value);
            }),
        );

        this.selectedCurrencyIdSubscription = this.currencyFormControl.valueChanges.subscribe({
            next: (value: CurrencyName | string) =>
            {
                if (value instanceof CurrencyName)
                {
                    this.selectedCurrencyId = value.getCurrencyId();
                    console.log(value);
                }
                else
                {
                    this.selectedCurrencyId = null;
                }
            }
        });

        this.currencyMap = 
        [
            new CurrencyName("AED", "United Arab Emirates Dirham"),
            new CurrencyName("AFN", "Afghan Afghani"),
            new CurrencyName("ALL", "Albanian Lek"),
            new CurrencyName("AMD", "Armenian Dram"),
            new CurrencyName("ANG", "Netherlands Antillean Guilder"),
            new CurrencyName("AOA", "Angolan Kwanza"),
            new CurrencyName("ARS", "Argentine Peso"),
            new CurrencyName("AUD", "Australian Dollar"),
            new CurrencyName("AWG", "Aruban Florin"),
            new CurrencyName("AZN", "Azerbaijani Manat"),
            new CurrencyName("BAM", "Bosnia-Herzegovina Convertible Mark"),
            new CurrencyName("BBD", "Barbadian Dollar"),
            new CurrencyName("BDT", "Bangladeshi Taka"),
            new CurrencyName("BGN", "Bulgarian Lev"),
            new CurrencyName("BHD", "Bahraini Dinar"),
            new CurrencyName("BIF", "Burundian Franc"),
            new CurrencyName("BMD", "Bermudan Dollar"),
            new CurrencyName("BND", "Brunei Dollar"),
            new CurrencyName("BOB", "Bolivian Boliviano"),
            new CurrencyName("BRL", "Brazilian Real"),
            new CurrencyName("BSD", "Bahamian Dollar"),
            new CurrencyName("BTC", "Bitcoin"),
            new CurrencyName("BTN", "Bhutanese Ngultrum"),
            new CurrencyName("BWP", "Botswanan Pula"),
            new CurrencyName("BYN", "Belarusian Ruble"),
            new CurrencyName("BYR", "Belarusian Ruble (pre-2016)"),
            new CurrencyName("BZD", "Belize Dollar"),
            new CurrencyName("CAD", "Canadian Dollar"),
            new CurrencyName("CDF", "Congolese Franc"),
            new CurrencyName("CHF", "Swiss Franc"),
            new CurrencyName("CLF", "Chilean Unit of Account (UF)"),
            new CurrencyName("CLP", "Chilean Peso"),
            new CurrencyName("CNH", "Chinese Yuan (Offshore)"),
            new CurrencyName("CNY", "Chinese Yuan"),
            new CurrencyName("COP", "Colombian Peso"),
            new CurrencyName("CRC", "Costa Rican Colón"),
            new CurrencyName("CUC", "Cuban Convertible Peso"),
            new CurrencyName("CUP", "Cuban Peso"),
            new CurrencyName("CVE", "Cape Verdean Escudo"),
            new CurrencyName("CZK", "Czech Republic Koruna"),
            new CurrencyName("DJF", "Djiboutian Franc"),
            new CurrencyName("DKK", "Danish Krone"),
            new CurrencyName("DOP", "Dominican Peso"),
            new CurrencyName("DZD", "Algerian Dinar"),
            new CurrencyName("EEK", "Estonian Kroon"),
            new CurrencyName("EGP", "Egyptian Pound"),
            new CurrencyName("ERN", "Eritrean Nakfa"),
            new CurrencyName("ETB", "Ethiopian Birr"),
            new CurrencyName("EUR", "Euro"),
            new CurrencyName("FJD", "Fijian Dollar"),
            new CurrencyName("FKP", "Falkland Islands Pound"),
            new CurrencyName("GBP", "British Pound Sterling"),
            new CurrencyName("GEL", "Georgian Lari"),
            new CurrencyName("GGP", "Guernsey Pound"),
            new CurrencyName("GHS", "Ghanaian Cedi"),
            new CurrencyName("GIP", "Gibraltar Pound"),
            new CurrencyName("GMD", "Gambian Dalasi"),
            new CurrencyName("GNF", "Guinean Franc"),
            new CurrencyName("GTQ", "Guatemalan Quetzal"),
            new CurrencyName("GYD", "Guyanaese Dollar"),
            new CurrencyName("HKD", "Hong Kong Dollar"),
            new CurrencyName("HNL", "Honduran Lempira"),
            new CurrencyName("HRK", "Croatian Kuna"),
            new CurrencyName("HTG", "Haitian Gourde"),
            new CurrencyName("HUF", "Hungarian Forint"),
            new CurrencyName("IDR", "Indonesian Rupiah"),
            new CurrencyName("ILS", "Israeli New Sheqel"),
            new CurrencyName("IMP", "Manx pound"),
            new CurrencyName("INR", "Indian Rupee"),
            new CurrencyName("IQD", "Iraqi Dinar"),
            new CurrencyName("IRR", "Iranian Rial"),
            new CurrencyName("ISK", "Icelandic Króna"),
            new CurrencyName("JEP", "Jersey Pound"),
            new CurrencyName("JMD", "Jamaican Dollar"),
            new CurrencyName("JOD", "Jordanian Dinar"),
            new CurrencyName("JPY", "Japanese Yen"),
            new CurrencyName("KES", "Kenyan Shilling"),
            new CurrencyName("KGS", "Kyrgystani Som"),
            new CurrencyName("KHR", "Cambodian Riel"),
            new CurrencyName("KMF", "Comorian Franc"),
            new CurrencyName("KPW", "North Korean Won"),
            new CurrencyName("KRW", "South Korean Won"),
            new CurrencyName("KWD", "Kuwaiti Dinar"),
            new CurrencyName("KYD", "Cayman Islands Dollar"),
            new CurrencyName("KZT", "Kazakhstani Tenge"),
            new CurrencyName("LAK", "Laotian Kip"),
            new CurrencyName("LBP", "Lebanese Pound"),
            new CurrencyName("LKR", "Sri Lankan Rupee"),
            new CurrencyName("LRD", "Liberian Dollar"),
            new CurrencyName("LSL", "Lesotho Loti"),
            new CurrencyName("LYD", "Libyan Dinar"),
            new CurrencyName("MAD", "Moroccan Dirham"),
            new CurrencyName("MDL", "Moldovan Leu"),
            new CurrencyName("MGA", "Malagasy Ariary"),
            new CurrencyName("MKD", "Macedonian Denar"),
            new CurrencyName("MMK", "Myanma Kyat"),
            new CurrencyName("MNT", "Mongolian Tugrik"),
            new CurrencyName("MOP", "Macanese Pataca"),
            new CurrencyName("MRO", "Mauritanian Ouguiya (pre-2018)"),
            new CurrencyName("MRU", "Mauritanian Ouguiya"),
            new CurrencyName("MTL", "Maltese Lira"),
            new CurrencyName("MUR", "Mauritian Rupee"),
            new CurrencyName("MVR", "Maldivian Rufiyaa"),
            new CurrencyName("MWK", "Malawian Kwacha"),
            new CurrencyName("MXN", "Mexican Peso"),
            new CurrencyName("MYR", "Malaysian Ringgit"),
            new CurrencyName("MZN", "Mozambican Metical"),
            new CurrencyName("NAD", "Namibian Dollar"),
            new CurrencyName("NGN", "Nigerian Naira"),
            new CurrencyName("NIO", "Nicaraguan Córdoba"),
            new CurrencyName("NOK", "Norwegian Krone"),
            new CurrencyName("NPR", "Nepalese Rupee"),
            new CurrencyName("NZD", "New Zealand Dollar"),
            new CurrencyName("OMR", "Omani Rial"),
            new CurrencyName("PAB", "Panamanian Balboa"),
            new CurrencyName("PEN", "Peruvian Nuevo Sol"),
            new CurrencyName("PGK", "Papua New Guinean Kina"),
            new CurrencyName("PHP", "Philippine Peso"),
            new CurrencyName("PKR", "Pakistani Rupee"),
            new CurrencyName("PLN", "Polish Zloty"),
            new CurrencyName("PYG", "Paraguayan Guarani"),
            new CurrencyName("QAR", "Qatari Rial"),
            new CurrencyName("RON", "Romanian Leu"),
            new CurrencyName("RSD", "Serbian Dinar"),
            new CurrencyName("RUB", "Russian Ruble"),
            new CurrencyName("RWF", "Rwandan Franc"),
            new CurrencyName("SAR", "Saudi Riyal"),
            new CurrencyName("SBD", "Solomon Islands Dollar"),
            new CurrencyName("SCR", "Seychellois Rupee"),
            new CurrencyName("SDG", "Sudanese Pound"),
            new CurrencyName("SEK", "Swedish Krona"),
            new CurrencyName("SGD", "Singapore Dollar"),
            new CurrencyName("SHP", "Saint Helena Pound"),
            new CurrencyName("SLL", "Sierra Leonean Leone"),
            new CurrencyName("SOS", "Somali Shilling"),
            new CurrencyName("SRD", "Surinamese Dollar"),
            new CurrencyName("SSP", "South Sudanese Pound"),
            new CurrencyName("STD", "São Tomé and Príncipe Dobra (pre-2018)"),
            new CurrencyName("STN", "São Tomé and Príncipe Dobra"),
            new CurrencyName("SVC", "Salvadoran Colón"),
            new CurrencyName("SYP", "Syrian Pound"),
            new CurrencyName("SZL", "Swazi Lilangeni"),
            new CurrencyName("THB", "Thai Baht"),
            new CurrencyName("TJS", "Tajikistani Somoni"),
            new CurrencyName("TMT", "Turkmenistani Manat"),
            new CurrencyName("TND", "Tunisian Dinar"),
            new CurrencyName("TOP", "Tongan Paʻanga"),
            new CurrencyName("TRY", "Turkish Lira"),
            new CurrencyName("TTD", "Trinidad and Tobago Dollar"),
            new CurrencyName("TWD", "New Taiwan Dollar"),
            new CurrencyName("TZS", "Tanzanian Shilling"),
            new CurrencyName("UAH", "Ukrainian Hryvnia"),
            new CurrencyName("UGX", "Ugandan Shilling"),
            new CurrencyName("USD", "United States Dollar"),
            new CurrencyName("UYU", "Uruguayan Peso"),
            new CurrencyName("UZS", "Uzbekistan Som"),
            new CurrencyName("VEF", "Venezuelan Bolívar Fuerte"),
            new CurrencyName("VND", "Vietnamese Dong"),
            new CurrencyName("VUV", "Vanuatu Vatu"),
            new CurrencyName("WST", "Samoan Tala"),
            new CurrencyName("XAF", "CFA Franc BEAC"),
            new CurrencyName("XAG", "Silver (troy ounce)"),
            new CurrencyName("XAU", "Gold (troy ounce)"),
            new CurrencyName("XCD", "East Caribbean Dollar"),
            new CurrencyName("XDR", "Special Drawing Rights"),
            new CurrencyName("XOF", "CFA Franc BCEAO"),
            new CurrencyName("XPD", "Palladium Ounce"),
            new CurrencyName("XPF", "CFP Franc"),
            new CurrencyName("XPT", "Platinum Ounce"),
            new CurrencyName("YER", "Yemeni Rial"),
            new CurrencyName("ZAR", "South African Rand"),
            new CurrencyName("ZMK", "Zambian Kwacha (pre-2013)"),
            new CurrencyName("ZMW", "Zambian Kwacha"),
        ];
    }

    debug(value: any): boolean
    {
        console.log(value);
        return false;
    }
}
