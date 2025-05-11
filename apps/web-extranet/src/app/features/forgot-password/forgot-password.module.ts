import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForgotPassworComponent } from "./components";

import { SharedModule } from "../shared/shared.module";
import { RecoveryPasswordComponent } from "./components/recovery-password/recovery-password.component";

export const routes: Routes = [
  {
    path: '',
    // path: 'forgot-password',
    component: ForgotPassworComponent
  },
  {
    path: 'reset-password',
    component: RecoveryPasswordComponent
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [ForgotPassworComponent, RecoveryPasswordComponent],
  exports: [ForgotPassworComponent, RecoveryPasswordComponent]
})
export class ForgotPasswordModule {}
