import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UiService {

    constructor(private matSnackBar: MatSnackBar) {

    }

    showSnackbar(message, action, duration): void {
        this.matSnackBar.open(message, action, {
            duration: duration
          });
    }
}