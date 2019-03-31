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
import {NgxSpinnerModule} from "ngx-spinner";
import {NgCircleProgressModule} from "ng-circle-progress";

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
    NgxSpinnerModule,
    NgCircleProgressModule.forRoot({
        radius: 100,
        outerStrokeWidth: 16,
        innerStrokeWidth: 8,
        outerStrokeColor: "#78C000",
        innerStrokeColor: "#C7E596",
        animationDuration: 300
    })
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
