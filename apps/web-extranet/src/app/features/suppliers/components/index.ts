import { SupplierEditComponent } from "./supplier-edit/supplier-edit.component";
import { SupplierNewComponent } from "./supplier-new/supplier-new.component";
import { SupplierViewComponent } from "./supplier-view/supplier-view.component";
import { SearchSuppliersComponent } from "./search-suppliers/search-suppliers.component";

export const COMPONENTS = [
  SearchSuppliersComponent,
  SupplierNewComponent,
  SupplierViewComponent,
  SupplierEditComponent,
]

export * from './search-suppliers/search-suppliers.component';
export * from './supplier-new/supplier-new.component';
export * from './supplier-view/supplier-view.component';
export * from './supplier-edit/supplier-edit.component';
