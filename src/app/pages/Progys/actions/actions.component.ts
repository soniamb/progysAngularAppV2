import { Component } from '@angular/core';
import { NbDateService } from '@nebular/theme';
import {ActionApiService} from "../../../services/actionModule/action-api.service";
@Component({
  selector: 'ngx-alert',
  templateUrl: 'actions.component.html',

})
export class ActionsComponent {

    actions = [];

    action = {
        code:'',
        type:'',
        priorite:'',
        demandeur:'',
        prov_de:'',
        analy_causes:'',
        categorie:'',
        desc_prob:'',
        code_origine:''
    };

  constructor(protected dateService: NbDateService<Date>,private actionservice: ActionApiService) {

      this.actionservice.getActions().subscribe(res => {
          console.log(res);
          this.actions = res['data'];

      }, error => {
          console.log(error);
      });


  }

    addAction(){

        this.actionservice.addAction(this.action).subscribe( res => {
            console.log(res);
            //this.router.navigate(['home']);
        }, error => {
            console.log(error);
        });

    }

}
