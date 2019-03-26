import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgysComponent } from './progys.component';
import {ActionsComponent} from "./actions/actions.component";

const routes: Routes = [{
  path: '',
  component: ProgysComponent,
  children: [
    {
      path: 'Actions',
      component: ActionsComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgysRoutingModule {
}
