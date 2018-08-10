import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from '../servicios/crud.service';
import * as _ from "lodash";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-listhoteles',
  templateUrl: './listhoteles.component.html',
  styleUrls: ['./listhoteles.component.scss']
})
export class ListhotelesComponent implements OnInit {
  getHoteles:any;
  offset = 2;
  nextKey: any; // for next button
  prevKeys: any[] = []; // for prev button
  subscription: any;
  hoteles:any;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.getHotelesList()
  }
  nextPage() {
    console.log(this.hoteles.key)
    this.prevKeys.push(_.first(this.hoteles)['$key'])
    console.log(this.nextKey); // set current key as pointer for previous page
    this.getHotelesList(this.nextKey)
  }
  prevPage() {
    const prevKey = _.last(this.prevKeys) // use last key in array
    this.prevKeys = _.dropRight(this.prevKeys) // then remove the last key in the array

    this.getHotelesList(prevKey)
  }
  private getHotelesList(key?) {
    console.log(key);
    this.getHoteles = this.crudService.getHotelesList2(this.offset, key).snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }).subscribe(hoteles => {
        this.hoteles = _.slice(hoteles, 0, this.offset)
        console.log(this.hoteles)
        this.nextKey =_.get(hoteles[this.offset-1], 'key')
        console.log(this.nextKey);
    })
    
  }

}
