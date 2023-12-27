import { FormControl } from '@angular/forms';

export class AccountMapping {
  CompanyId: number;
  MainAccount: number;
  MainAccountDescription: string;
  selectionControl = new FormControl();
  filteredOptions: string[]; // Holds the filtered options

  constructor(companyId: number, mainAccount: number, mainAccountDescription: string, selectOptions: string[]) {
    this.CompanyId = companyId;
    this.MainAccount = mainAccount;
    this.MainAccountDescription = mainAccountDescription;
    this.filteredOptions = selectOptions;

    this.selectionControl.valueChanges.subscribe(value => {
      this.filteredOptions = this.filter(value, selectOptions);
    });
  }

  private filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
