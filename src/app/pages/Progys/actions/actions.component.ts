import {Component} from '@angular/core';
import {NbDateService} from '@nebular/theme';
import {ActionApiService} from '../../../services/actionModule/action-api.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {Observable} from "rxjs";
import * as firebase from 'firebase';

@Component({
    selector: 'ngx-alert',
    templateUrl: 'actions.component.html',

})
export class ActionsComponent {


    actions = [];
    actionsCopy = [];
    detailsAction = [];
    docList = [];
    docToDeleted = [];
    detailActionToDeleted = [];
    actionsTodeleted = [];
    add_action = false;
    update = false;
    isUpdateDetailAct = false;

    uploadPercent = '';

    search = {
        code: '',
        code_origine: '',
        type: '',
        categorie: '',
        priorite: '',
        demandeur: '',
        origine: '',
        etat: '',
        dateDe: '',
        dateA: '',
    };

    action = {
        code: '',
        type: '',
        priorite: '',
        demandeur: '',
        prov_de: '',
        analy_causes: '',
        categorie: '',
        desc_prob: '',
        code_origine: '',
        taux_realisation: '',
        taux_efficacite: '',
        observation: '',
        etat: '',
        date_cloture: '',
        observation_cloture: '',
    };

    detailaction = {
        id:'',
        id_action: '',
        numero: '',
        type: '',
        actiontxt: '',
        observation: '',
        resp_realisation: '',
        date_debut_reel: '',
        date_debut_prevu: '',
        date_fin_reel: '',
        date_fin_prevu: '',
        realisationtxt: '',
        obser_realisation: '',
        resp_suivi: '',
        date_suivi: '',
        taux_realisation: '',
        etat_action: '',
        obser_suivi: '',
        resp_mesure_efficacite: '',
        date_mesure: '',
        taux_efficacite: '',
        etat_efficacite: '',
        obser_efficacite: '',
        cout_MO_Previs: '',
        cout_MO_Reel: '',
        cout_Materiel_Previs: '',
        cout_Materiel_Reel: '',

    };

    closeResult: string;

    constructor(protected dateService: NbDateService<Date>, private actionservice: ActionApiService,
                private spinner: NgxSpinnerService, private modalService: NgbModal) {

        this.actionservice.getActions().subscribe(res => {
            console.log(res);
            this.actions = res['data'];
            this.actionsCopy = res['data'];

        }, error => {
            console.log(error);
        });


    }

    open(content) {
        this.isUpdateDetailAct =false;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    openDetailActForUpdate(content,dc){

        this.detailaction = dc;
        this.isUpdateDetailAct = true;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

    }

    showHideAddAction() {

        this.action = {
            code: '',
            type: '',
            priorite: '',
            demandeur: '',
            prov_de: '',
            analy_causes: '',
            categorie: '',
            desc_prob: '',
            code_origine: '',
            taux_realisation: '',
            taux_efficacite: '',
            observation: '',
            etat: '',
            date_cloture: '',
            observation_cloture: '',
        };

        this.update = false;
        this.add_action = !this.add_action;
    }


    addAction() {
        this.spinner.show();
        this.actionservice.addAction(this.action).subscribe(res => {

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

    searchActions() {
        this.actions = this.actions.filter(x => (this.search.code == '' || x.code == this.search.code) &&
            (this.search.type == '' || x.type == this.search.type) &&
            (this.search.categorie == '' || x.categorie == this.search.categorie) &&
            (this.search.priorite == '' || x.priorite == this.search.priorite) &&
            (this.search.demandeur == '' || x.demandeur == this.search.demandeur) &&
            (this.search.code_origine == '' || x.code_origine == this.search.code_origine) &&
            (this.search.etat == '' || x.etat == this.search.etat) &&
            (this.search.dateDe == '' || Date.parse(moment(x.date_creation).format('YYYY-MM-DD')) >= Date.parse(this.search.dateDe)) &&
            (this.search.dateA == '' || Date.parse(moment(x.date_creation).format('YYYY-MM-DD')) <= Date.parse(this.search.dateA)));
    }

    annulerSearch() {
        this.actions = this.actionsCopy;
    }

    toUpdate(action) {
        this.action = action;
        this.action.date_cloture = moment(this.action.date_cloture).format('YYYY-MM-DD');
        this.detailaction.id_action = action.id;
        this.add_action = true;
        this.update = true;
        this.spinner.show();

        this.actionservice.getDetailActionList(action.id).subscribe(rep => {
            this.detailsAction = rep['data'];
            this.actionservice.getDocList(action.id).subscribe(r => {
                this.docList = r['data'];
                this.spinner.hide();
            }, error => {
                console.log(error);
            });
        }, error => {
            console.log(error);
        });

    }

    updateAction() {
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
        }, error => {
            console.log(error);
        });
    }


    addDetailAction() {
        this.spinner.show();
        this.actionservice.addDetailAction(this.detailaction).subscribe(res => {

            this.actionservice.getDetailActionList(this.detailaction.id_action).subscribe(r => {
                this.detailsAction = r['data'];
                this.modalService.dismissAll();
                this.spinner.hide();
            }, error => {
                console.log(error);
                this.spinner.hide();
            });
        }, error => {
            console.log(error);
            this.spinner.hide();
        });

    }

    updateDetailAction() {
        this.spinner.show();
        this.actionservice.updateDetailAction(this.detailaction).subscribe(rep => {
            console.log(rep);
            this.actionservice.getDetailActionList(this.detailaction.id_action).subscribe(r => {
                this.detailsAction = r['data'];
                this.modalService.dismissAll();
                this.spinner.hide();
            }, error => {
                console.log(error);
                this.spinner.hide();
            });
        }, error => {
            console.log(error);
        });
    }


    addDocument(event) {

        this.spinner.show();
        if (event.target.files.length == 0) {
            console.log('No file selected!');
            return;
        }

        var storageRef = firebase.storage().ref().child('/actionDocs/'+event.target.files[0].name);
        var file = event.target.files[0];
        var uploadTask = storageRef.put(file);


        uploadTask.on('state_changed', snapshot =>{

            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadPercent = progress.toFixed(2) + ' %';
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, error => {
             console.log(error);
        }, () => {

            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                console.log('File available at', downloadURL);

                this.actionservice.uploadDoc({doc_action: file, id_action: this.detailaction.id_action, path: downloadURL}).subscribe(rep => {
                    console.log(rep);
                    this.actionservice.getDocList(this.detailaction.id_action).subscribe(r => {
                        console.log(r);
                        this.docList = r['data'];
                        this.spinner.hide();
                    }, error => {
                        console.log(error);
                    });
                }, error => {
                    console.log(error);
                });

            });
        });

    }
    addDocTodelete(index){
        this.docToDeleted.push(index);
    }

    deleteDocs(){
        this.spinner.show();
           this.actionservice.deleteDocs({docList:JSON.stringify(this.docToDeleted)}).subscribe(res=>{

               this.actionservice.getDocList(this.detailaction.id_action).subscribe(r => {
                   this.docList = r['data'];
                   this.docToDeleted = [];
                   this.spinner.hide();
               }, error => {
                   console.log(error);
               });

           },error => {
               console.log(error);
           })
    }

    addDetailActionToDelete(index){
        this.detailActionToDeleted.push(index);
    }

    deletedetailsAction(){
        this.spinner.show();
        this.actionservice.deleteDetailsAction({detailActionList:JSON.stringify(this.detailActionToDeleted)}).subscribe(res=>{

            this.actionservice.getDetailActionList(this.detailaction.id_action).subscribe(r => {
                this.detailsAction = r['data'];
                this.detailActionToDeleted = [];
                this.spinner.hide();
            }, error => {
                console.log(error);
                this.spinner.hide();
            });

        },error => {
            console.log(error);
        })
    }

    addActionToDelete(index){
        this.actionsTodeleted.push(index);
    }


    deleteActions(){

        this.spinner.show();
        this.actionservice.deleteActions({actionsList:JSON.stringify(this.actionsTodeleted)}).subscribe(res=>{

            this.actionservice.getActions().subscribe(res => {
                //console.log(res);
                this.actions = res['data'];
                this.actionsCopy = res['data'];
                this.actionsTodeleted = [];
                this.spinner.hide();
            }, error => {
                console.log(error);
            });
        },error => {
            console.log(error);
        })

    }

}
