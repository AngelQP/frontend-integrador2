import { ClientEditComponent } from "./client-edit/client-edit.component";
import { ClientNewComponent } from "./client-new/client-new.component";
import { ClientViewComponent } from "./client-view/client-view.component";
import { SearchClientsComponent } from "./search-clients/search-clients.component";

export const COMPONENTS = [
  SearchClientsComponent,
  ClientNewComponent,
  ClientViewComponent,
  ClientEditComponent,
]

export * from './search-clients/search-clients.component';
export * from './client-new/client-new.component';
export * from './client-view/client-view.component';
export * from './client-edit/client-edit.component';
