import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { DataService } from '../data.service';
import { AccountMapping } from '../models/accountmapping.model';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
//filter and sort
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-mapping-table',
  templateUrl: './mapping-table.component.html',
  styleUrls: ['./mapping-table.component.css'],
})
export class MappingTableComponent implements OnInit {
  dataSource: MatTableDataSource<AccountMapping>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChildren('inputField') inputFields!: QueryList<ElementRef>;
  //dataSource: AccountMapping[] = [];
  displayedColumns: string[] = [
    'CompanyId',
    'MainAccount',
    'MainAccountDescription',
    'select',
  ];
  selectOptions = [
    'Anlagevermögen',
    'Baustoffe',
    'Chrombad',
    'Durchlaufposten',
    'Eigenkapital',
  ];
  searchControl = new FormControl();
  filteredOptions!: Observable<string[]>;

  constructor(private dataService: DataService) {
    this.dataSource = new MatTableDataSource(this.dataService.getData());
  }

  ngOnInit() {
    const accountMappings = this.dataService.getData();
    this.dataSource = new MatTableDataSource(accountMappings);
    this.dataSource.sort = this.sort;

    //this.dataSource.sort = this.sort;
    //this.dataSource = this.dataService.getData().map(item => new AccountMapping(item.CompanyId, item.MainAccount, item.MainAccountDescription, this.selectOptions));
    //console.log(this.dataSource.length); // Corrected console log

    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
  // filter function that filter the displayed table according to the input
  // TODO: von bis filter. preload all values then select the corrrect ones (siehe Napta)
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // filters the values of the input for each row selection
  private _filter(value: string): string[] {
    console.log('Filter Value:', value);
    const filterValue = value.toLowerCase();
    const filteredOptions = this.selectOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
    console.log('Filtered Options:', filteredOptions);
    return filteredOptions;
  }
/** 
  copyDownSelection(rowIndex: number) {
    const currentSelection =
      this.dataSource.data[rowIndex].selectionControl.value;

    if (currentSelection) {
      //for (let i = rowIndex + 1; i < this.dataSource.data.length; i++) {
      this.dataSource.data[rowIndex + 1].selectionControl.setValue(
        currentSelection
      );
      const nextRowIndex = rowIndex + 1;
      setTimeout(() => {
        if (nextRowIndex < this.dataSource.data.length) {
          console.log(this.inputFields.toArray().length);
          const inputFieldsArray = this.inputFields.toArray();
          if (inputFieldsArray[nextRowIndex]) {
            const nextInputField = inputFieldsArray[nextRowIndex].nativeElement;
            nextInputField.focus();
          }
        }
      });
      //}
    }
  }*/
}
