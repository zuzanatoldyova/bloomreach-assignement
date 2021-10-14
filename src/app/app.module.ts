import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CustomerFilterComponent } from './customer-filter/customer-filter.component';
import { FunnelStepComponent } from './funnel-step/funnel-step.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerFilterComponent,
    FunnelStepComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
