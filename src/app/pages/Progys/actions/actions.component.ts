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
    detailsAction =[];
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

    detailaction = {
        id_action:'',
        numero:'',
        type:'',
        actiontxt:'',
        observation:'',
        resp_realisation:'',
        date_debut_reel:'',
        date_debut_prevu:'',
        date_fin_reel:'',
        date_fin_prevu:'',
        realisationtxt:'',
        obser_realisation:'',
        resp_suivi:'',
        date_suivi:'',
        taux_realisation:'',
        etat_action:'',
        obser_suivi:'',
        resp_mesure_efficacite:'',
        date_mesure:'',
        taux_efficacite:'',
        etat_efficacite:'',
        obser_efficacite:'',
        cout_MO_Previs:'',
        cout_MO_Reel:'',
        cout_Materiel_Previs:'',
        cout_Materiel_Reel:''

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

    toUpdate(action){
        this.action = action;
        this.detailaction.id_action = action.id;
        this.add_action = true;
        this.update = true;
        this.spinner.show();
      this.actionservice.getDetailActionList(action.id).subscribe(rep => {
          console.log(rep);
          this.detailsAction = rep['data'];
          this.spinner.hide();
      },error => {
          console.log(error);
      });

      //console.log(action);
    }

    updateAction(){
        this.spinner.show();
         this.actionservice.updateAction(this.action).subscribe(rep => {

             this.actionservice.getActions().subscribe(res => {

                 this.actions = res['data'];
                 this.actionsCopy = res['data'];
                 this.update = false;
                 this.add_action = false;
                 this.spinner.hide();

             }, error => {
                 console.log(error);
             });
         },error => {
             console.log(error);
         })
    }


    addDetailAction(){
        this.spinner.show();
      this.actionservice.addDetailAction(this.detailaction).subscribe(res => {
          console.log(res);
          this.actionservice.getDetailActionList(this.detailaction.id_action).subscribe(r => {
              this.detailsAction = r['data'];
              this.spinner.hide();
          },error => {
              console.log(error);
              this.spinner.hide();
          });
      },error => {
          console.log(error);
          this.spinner.hide();
      })

    }

}
