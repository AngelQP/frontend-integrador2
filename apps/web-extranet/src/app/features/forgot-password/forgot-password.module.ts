import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForgotPassworComponent } from "./components";

import { SharedModule } from "../shared/shared.module";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";

export const routes: Routes = [
  {
    path: '',
    // path: 'forgot-password',
    component: ForgotPassworComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [ForgotPassworComponent, ResetPasswordComponent],
  exports: [ForgotPassworComponent, ResetPasswordComponent]
})
export class ForgotPasswordModule {}
