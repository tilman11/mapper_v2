// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { AccountMapping } from './models/accountmapping.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private rawData = [
    {
      CompanyId: 1,
      MainAccount: 20234,
      MainAccountDescription: 'vermögen',
    },
    {
      CompanyId: 1,
      MainAccount: 20235,
      MainAccountDescription: 'etc',
    },
    {
      CompanyId: 1,
      MainAccount: 20236,
      MainAccountDescription: 'sonstige',
    },
    {
      CompanyId: 1,
      MainAccount: 20237,
      MainAccountDescription: 'imma vermögen',
    },
    {
      CompanyId: 2,
      MainAccount: 30231,
      MainAccountDescription: 'vebrbindlichkeiten',
    },
    {
      CompanyId: 2,
      MainAccount: 30232,
      MainAccountDescription: 'ic topics',
    },
    {
      CompanyId: 2,
      MainAccount: 30233,
      MainAccountDescription: 'storno',
    },
    {
      CompanyId: 33,
      MainAccount: 20234,
      MainAccountDescription: 'eigenkapital',
    },
    {
      CompanyId: 33,
      MainAccount: 10235,
      MainAccountDescription: 'verbindlichkeiten lul',
    },
    {
      CompanyId: 44,
      MainAccount: 23600,
      MainAccountDescription: 'perfekt',
    },
  ];

  constructor() {}

  getData(): AccountMapping[] {
    return this.rawData.map(
      (item) =>
        new AccountMapping(
          item.CompanyId,
          item.MainAccount,
          item.MainAccountDescription,
          []
        )
    );
  }

  // Add more methods as needed for data manipulation
}
