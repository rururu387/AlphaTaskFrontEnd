import { Component, SecurityContext } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ToastEvokeService } from "@costlydeveloper/ngx-awesome-popup";

@Component({
    selector: 'app',
    template: `
    <p>
      This component should not be displayed
    </p>
    `
  })
export class VisualMediaObject
{
    constructor(private sanitizer: DomSanitizer, private popUpService: ToastEvokeService,) {}
    
    private id: string = "";
    private resourceURL: SafeResourceUrl = "";
    private hSizePixels: number = 0;
    private wSizePixels: number = 0;
    private title: string = "";

    public getId(): string {
        return this.id;
    }
    public setId(value: string) {
        this.id = value;
    }

    public getURL(): SafeResourceUrl {
        return this.resourceURL;
    }
    public setURL(context: SecurityContext, unsafeURL: string): boolean
    {
        let sanitizedUrl: string | null = null;
        
        try
        {
            sanitizedUrl = this.sanitizer.sanitize(context, unsafeURL);
        }
        catch(e)
        {
            return false;
        }
        if (sanitizedUrl == null)
        {
            return false;
        }
        
        this.resourceURL = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeURL);
        return true;
    }

    public getHSizePixels(): number {
        return this.hSizePixels;
    }
    public setHSizePixels(value: number) {
        this.hSizePixels = value;
    }

    public getWSizePixels(): number {
        return this.wSizePixels;
    }
    public setWSizePixels(value: number) {
        this.wSizePixels = value;
    }

    public getTitle(): string {
        return this.title;
    }
    public setTitle(value: string) {
        this.title = value;
    }
}