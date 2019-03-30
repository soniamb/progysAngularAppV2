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
    actionsCopy =[];
    add_action=false;
    update =false;

    search = {
        code:'',
        code_origine:'',
        type:'',
        categorie:'',
        priorite:'',
        demandeur:'',
        origine:'',
        etat:'',
        dateDe:'',
        dateA:''
    };

    action = {
        code:'',
        type:'',
        priorite:'',
        demandeur:'',
        prov_de:'',
        analy_causes:'',
        categorie:'',
        desc_prob:'',
        code_origine:'',
        taux_realisation:'',
        taux_efficacite:'',
        observation:'',
        etat:'',
        date_cloture:'',
        observation_cloture:''
    };
    closeResult: string;

  constructor(protected dateService: NbDateService<Date>,private actionservice: ActionApiService,
              private spinner: NgxSpinnerService,private modalService: NgbModal) {

      this.actionservice.getActions().subscribe(res => {
          console.log(res);
          this.actions = res['data'];
          this.actionsCopy = res['data'];

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
                this.actionsCopy = res['data'];
                this.spinner.hide();
                this.add_action = !this.add_action;

            }, error => {
                console.log(error);
            });
        }, error => {
            console.log(error);
        });

    }

    searchActions(){
        this.actions = this.actions.filter( x => (this.search.code =='' || x.code == this.search.code) &&
                                          ( this.search.type =='' || x.type == this.search.type) &&
                                          ( this.search.categorie =='' || x.categorie == this.search.categorie) &&
                                          ( this.search.priorite =='' || x.priorite == this.search.priorite) &&
                                          ( this.search.demandeur =='' || x.demandeur == this.search.demandeur) &&
                                          ( this.search.code_origine =='' || x.code_origine == this.search.code_origine));
    }
    annulerSearch(){
      this.actions = this.actionsCopy;
    }

}
