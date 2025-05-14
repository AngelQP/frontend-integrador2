import { ProductEditComponent } from "./product-edit/product-edit.component";
import { ProductNewComponent } from "./product-new/product-new.component";
import { ProductViewComponent } from "./product-view/product-view.component";
import { SearchProductsComponent } from "./search-products/search-products.component";

export const COMPONENTS = [
  SearchProductsComponent,
  ProductNewComponent,
  ProductViewComponent,
  ProductEditComponent,
]

export * from './search-products/search-products.component';
export * from './product-new/product-new.component';
export * from './product-view/product-view.component';
export * from './product-edit/product-edit.component';
