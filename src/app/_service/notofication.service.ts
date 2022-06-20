import { Injectable } from '@angular/core';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

    constructor(private toastEvokeService: ToastEvokeService) { }
  
    /*showError(text.stri): void
    {
        
    }*/
}
