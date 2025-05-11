import { NgModule } from '@angular/core';

// xplat
import { UIModule } from '@tramarsa/xplat/web/features';
import { ErrorHandlerComponent, MessageResultComponent } from './components';

const MODULES = [UIModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES, MessageResultComponent, ErrorHandlerComponent],
  declarations: [MessageResultComponent, ErrorHandlerComponent]
})
export class SharedModule {}
