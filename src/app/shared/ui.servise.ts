import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable()
export class UiService {
    loadingSTateChange = new Subject();

    constructor(private matSnackBar: MatSnackBar) {

    }

    showSnackbar(message, action, duration): void {
        this.matSnackBar.open(message, action, {
            duration: duration
          });
    }
}