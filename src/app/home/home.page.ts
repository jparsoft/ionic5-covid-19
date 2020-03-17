import { Component } from '@angular/core';
import { CovidApiService } from '../services/covid-api.service';
import { UtilService } from '../services/util.service';
import { ITotal } from '../model/total.interface';
import { environment } from 'src/environments/environment';
import { IPais } from '../model/pais.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public cargando = true;
  public casosChile: IPais;
  public casos: ITotal;
  public allCountriesNames;
  public allCountries;
  public paisFiltrado;
  constructor(private covidService: CovidApiService, private util: UtilService) {

  }

  ionViewWillEnter() {
    this.cargarDatos();
  }

  public getTotales() {
    this.covidService.get<ITotal>(environment.pathAll).subscribe((result: ITotal) => {
      this.casos = result;
    });
  }

  public getPaises() {
    this.covidService.get<any>(environment.pathCountries).subscribe((result) => {

      this.allCountriesNames = Array.from(result).map((pais: IPais) => pais.country);
      this.allCountries = Array.from(result).map((pais: IPais) => pais);

      Array.from(result).map((pais: IPais) => {
        if (pais.country === 'Chile') {
          this.casosChile = pais;
          this.cargando = false;
        }
      });
    });
  }

  public filterCountry(country: string) {
    Array.from(this.allCountries).map((pais: IPais) => { if (pais.country === country.replace(/\s/g, '')) { this.paisFiltrado = pais; } });

  }

  cargarDatos() {
    this.getPaises();
    this.getTotales();
  }
}
