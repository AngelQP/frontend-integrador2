import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext'
import { DropdownModule } from 'primeng/dropdown'
import { InputNumberModule } from 'primeng/inputnumber'
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KnobModule } from 'primeng/knob';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SliderModule } from 'primeng/slider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TreeSelectModule } from 'primeng/treeselect';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SpeedDialModule } from 'primeng/speeddial';
import { PaginatorModule } from 'primeng/paginator';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';
import { FileUploadModule } from 'primeng/fileupload';
import { SkeletonModule} from 'primeng/skeleton';
import { ChipsModule} from 'primeng/chips';

// libs
import { UISharedModule } from '@tramarsa/xplat/features';

const MODULES_MATERIAL = [InputTextModule,
  InputNumberModule,
  DropdownModule,
  AutoCompleteModule,
  CalendarModule,
  CheckboxModule,
  RippleModule,
  InputMaskModule,
  InputSwitchModule,
  InputTextareaModule,
  KnobModule,
  KeyFilterModule,
  ListboxModule,
  MultiSelectModule,
  PasswordModule,
  RadioButtonModule,
  RatingModule,
  SliderModule,
  SelectButtonModule,
  ToggleButtonModule,
  TreeSelectModule,
  ButtonModule,
  SplitButtonModule,
  SpeedDialModule,
  PaginatorModule,
  VirtualScrollerModule,
  CardModule,
  ScrollPanelModule,
  TabViewModule,
  ToolbarModule,
  ConfirmDialogModule,
  //ConfirmationService,
  DialogModule,
  DynamicDialogModule,
  OverlayPanelModule,
  SidebarModule,
  TooltipModule,
  FileUploadModule,
  MenubarModule,
  BreadcrumbModule,
  BadgeModule,
  AvatarModule,
  AccordionModule,
  DividerModule,
  ToastModule,
  PanelMenuModule,
  MessagesModule,
  ProgressSpinnerModule,
  SkeletonModule,
  ChipsModule
]

const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  UISharedModule,
  MODULES_MATERIAL
];

@NgModule({
  imports: [...MODULES],
  declarations: [/*...UI_COMPONENTS*/],
  exports: [...MODULES,/* ...UI_COMPONENTS*/],
  providers: [ConfirmationService, MessageService]
})
export class UIModule { }
