import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
selector:'app-stopTraining',
template:`<h1 mat-dialog-title>Are you sure?</h1>
<div>You already got {{passedData.progress}}%</div>
<mat-dialog-actions>
  <button mat-raised-button [mat-dialog-close]='true'>Yes</button>
  <button mat-raised-button [mat-dialog-close]='false'>No</button>
</mat-dialog-actions>`
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}
}
