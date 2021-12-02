import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { UserIdentityService } from './shared/user-identity.service';
import { UserComponent } from './user/user.component';
import { StudentComponent } from './student/student.component';


import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import {CheckboxModule} from 'primeng/checkbox';
import {ToggleButtonModule} from 'primeng/togglebutton';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SpeedDialModule } from 'primeng/speeddial';
import { TooltipModule } from 'primeng/tooltip';
import { TabMenuModule } from 'primeng/tabmenu';
import {MegaMenuModule} from 'primeng/megamenu';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {CarouselModule} from 'primeng/carousel';
import {PickListModule} from 'primeng/picklist';
import {TreeModule} from 'primeng/tree';



import {TreeTableModule} from 'primeng/treetable';
import {TreeNode} from 'primeng/api';

import { FieldsetModule } from 'primeng/fieldset';

import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {ListboxModule} from 'primeng/listbox';

import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {CardModule} from 'primeng/card';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import {BadgeModule} from 'primeng/badge';

import { StudentService } from './shared/student.service';

import { AdcarouselComponent } from './adcarousel/adcarousel.component';
import { SettingsComponent } from './settings/settings.component';
import { LetterComponent } from './letter/letter.component';
import { PostofficeComponent } from './postoffice/postoffice.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    StudentComponent,
    
    AdcarouselComponent,
         SettingsComponent,
         LetterComponent,
         PostofficeComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TreeModule,
    MessagesModule,
    MessageModule,
    CheckboxModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    SpeedDialModule,
    TooltipModule,
    TabMenuModule,
    AvatarModule,
    AvatarGroupModule,
    CarouselModule,
    MenubarModule,
    MegaMenuModule, 
    CardModule,
    ListboxModule,
    VirtualScrollerModule,
    PickListModule,
    FieldsetModule,
    BadgeModule,
    TreeTableModule,
    ToggleButtonModule
    
  ],
  providers: [UserIdentityService, StudentService, MessageService],

  bootstrap: [AppComponent]
})
export class AppModule { }
