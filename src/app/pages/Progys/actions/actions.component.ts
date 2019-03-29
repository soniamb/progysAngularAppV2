import {Component} from '@angular/core';
import { NbDateService } from '@nebular/theme';
import {ActionApiService} from "../../../services/actionModule/action-api.service";
import { NgxSpinnerService } from 'ngx-spinner';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-alert',
  templateUrl: 'actions.component.html',

})
export class ActionsComponent {

    actions = [];
    add_action=false;
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
    closeResult: string;

  constructor(protected dateService: NbDateService<Date>,private actionservice: ActionApiService,
              private spinner: NgxSpinnerService,private modalService: NgbModal) {

      this.actionservice.getActions().subscribe(res => {
          console.log(res);
          this.actions = res['data'];

      }, error => {
          console.log(error);
      });


  }

    open(content) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size:'lg'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    showHideAddAction(){
      this.add_action = !this.add_action;
    }


    addAction(){
        this.spinner.show();
        this.actionservice.addAction(this.action).subscribe( res => {

            this.actionservice.getActions().subscribe(res => {
                console.log(res);
                this.actions = res['data'];
                this.spinner.hide();
                this.add_action = !this.add_action;

            }, error => {
                console.log(error);
            });
        }, error => {
            console.log(error);
        });

    }

}
