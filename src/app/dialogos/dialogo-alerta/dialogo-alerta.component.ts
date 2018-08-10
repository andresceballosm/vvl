import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialogo-alerta',
  templateUrl: './dialogo-alerta.component.html',
  styleUrls: ['./dialogo-alerta.component.scss']
})
export class DialogoAlertaComponent implements OnInit {

  constructor(public thisDialogRef:MatDialogRef<DialogoAlertaComponent>, @Inject(MAT_DIALOG_DATA) public data:string) { }

  ngOnInit() {
  }

  onCloseConfirm(){
    this.thisDialogRef.close('Confirm');
  }

  onCloseCancel(){  
    this.thisDialogRef.close('Cancel');
  }

}
