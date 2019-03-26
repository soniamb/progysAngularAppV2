import { NgModule } from '@angular/core';

import { TreeModule } from 'angular-tree-component';
import { ToasterModule } from 'angular2-toaster';

import { ThemeModule } from '../../@theme/theme.module';
import { ProgysRoutingModule } from './progys-routing.module';

// components
import { ProgysComponent } from './progys.component';

// service
import { NewsService } from './services/news.service';
import {ActionsComponent} from "./actions/actions.component";

const COMPONENTS = [
    ProgysComponent,
    ActionsComponent
];

const SERVICES = [
  NewsService,
];

const MODULES = [
  ThemeModule,
  ProgysRoutingModule,
  TreeModule,
  ToasterModule.forRoot(),
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class ProgysModule { }
