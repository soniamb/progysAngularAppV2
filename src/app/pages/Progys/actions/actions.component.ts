import { Component } from '@angular/core';
import { NbDateService } from '@nebular/theme';
@Component({
  selector: 'ngx-alert',
  templateUrl: 'actions.component.html',

})
export class ActionsComponent {

  constructor(protected dateService: NbDateService<Date>) {

  }

}
