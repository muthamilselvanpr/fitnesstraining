import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModuleModule } from '../material-module/material-module.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        MaterialModuleModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        MaterialModuleModule
    ]
})

export class SharedModule {

}