import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog"
import { AddassociateComponent } from '../addassociate/addassociate.component';
import { Store } from '@ngrx/store';
import { Associates } from 'src/app/Store/Model/Associate.model';
import { getPagination, getassociatelist } from 'src/app/Store/Associate/Associate.Selectors';
import { changePage, deleteeassociate, getassociate, loadassociate, openpopup } from 'src/app/Store/Associate/Associate.Action';
import { MatTableDataSource } from "@angular/material/table"
import { MatPaginator } from "@angular/material/paginator"
import { MatSort } from "@angular/material/sort"

@Component({
  selector: 'app-associatelisting',
  templateUrl: './associatelisting.component.html',
  styleUrls: ['./associatelisting.component.css']
})
export class AssociatelistingComponent implements OnInit {

  Asociatelist!: Associates[];
  datasource: any;
  pageSize:number = 5;
  pageIndex:number = 0;
  length!:number
  pageSizeOptions = [5,10,15]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColums: string[] = ["code", "name", "email", "phone", "address", "type", "group", "status", "action"]
  constructor(private dialog: MatDialog, private store: Store) {

  }
  ngOnInit(): void {
    this.store.dispatch(loadassociate());
    this.store.select(getassociatelist).subscribe(item => {
      this.Asociatelist = item;
      this.datasource = new MatTableDataSource<Associates>(this.Asociatelist);
      console.log("this.datasource.paginator-->",this.datasource.paginator)
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
    this.store.select(getPagination).subscribe(paginationData => {
    this.pageSize = paginationData.pageSize;
    this.pageIndex =paginationData.pageIndex;
    this.length = paginationData.totalItem;
    this.pageSizeOptions = paginationData.pageSizeoption;
    })
  }

  FunctionAdd() {
    this.OpenPopup(0, 'Create Associate');
  }
  FunctionEdit(code:number){
    this.OpenPopup(code, 'Update Employee');
    this.store.dispatch(getassociate({id:code}))
  }

  FunctionDelete(code:number){
    if(confirm('do you want to remove?')){
      this.store.dispatch(deleteeassociate({code:code}));
    }
  }
  OpenPopup(code: number, title: string) {
    this.store.dispatch(openpopup());
    this.dialog.open(AddassociateComponent, {
      width: '50%',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: {
        code: code,
        title: title
      }
    })
  }
  handlePageEvent(event:any){
    
    console.log("event-->",event)
    const paginationData = {
      pageIndex:event.pageIndex,
      totalItem:event.length,
      pageSize:event.pageSize,
      pageSizeoption:this.pageSizeOptions
    }
    this.store.dispatch(changePage({ pagination: paginationData }))
  }
}
