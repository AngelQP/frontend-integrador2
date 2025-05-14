import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserNewComponent } from "./user-new/user-new.component";
import { UserViewComponent } from "./user-view/user-view.component";
import { SearchUsersComponent } from "./search-users/search-users.component";

export const COMPONENTS = [
  SearchUsersComponent,
  UserNewComponent,
  UserViewComponent,
  UserEditComponent,
]

export * from './search-users/search-users.component';
export * from './user-new/user-new.component';
export * from './user-view/user-view.component';
export * from './user-edit/user-edit.component';
