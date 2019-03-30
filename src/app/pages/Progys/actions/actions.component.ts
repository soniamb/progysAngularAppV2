import {Component} from '@angular/core';
import { NbDateService } from '@nebular/theme';
import {ActionApiService} from "../../../services/actionModule/action-api.service";
import { NgxSpinnerService } from 'ngx-spinner';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

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

        /*console.log(Date.parse(moment(this.actions[0].date_creation).format('YYYY-MM-DD')));
        console.log(Date.parse(this.search.dateDe));
        console.log(Date.parse(moment(this.actions[0].date_creation).format('DD MM YYYY')));*/

        this.actions = this.actions.filter( x => (this.search.code =='' || x.code == this.search.code) &&
                                          ( this.search.type =='' || x.type == this.search.type) &&
                                          ( this.search.categorie =='' || x.categorie == this.search.categorie) &&
                                          ( this.search.priorite =='' || x.priorite == this.search.priorite) &&
                                          ( this.search.demandeur =='' || x.demandeur == this.search.demandeur) &&
                                          ( this.search.code_origine =='' || x.code_origine == this.search.code_origine) &&
                                          ( this.search.etat =='' || x.etat == this.search.etat) &&
            ( this.search.dateDe =='' || Date.parse(moment(x.date_creation).format('YYYY-MM-DD')) >= Date.parse(this.search.dateDe)) &&
            ( this.search.dateA =='' || Date.parse(moment(x.date_creation).format('YYYY-MM-DD')) <= Date.parse(this.search.dateA)));
    }
    annulerSearch(){
      this.actions = this.actionsCopy;
    }

}
