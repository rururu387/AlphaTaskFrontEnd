export class CurrencyName
{
    private currencyId: string = "";
    private fullName: string = "";

    public getCurrencyId(): string {
        return this.currencyId;
    }
    public setCurrencyId(value: string) {
        this.currencyId = value;
    }

    public getFullName(): string {
        return this.fullName;
    }
    public setFullName(value: string) {
        this.fullName = value;
    }

    constructor(currencyId: string, fullName: string)
    {
        this.currencyId = currencyId;
        this.fullName = fullName;
    }
}