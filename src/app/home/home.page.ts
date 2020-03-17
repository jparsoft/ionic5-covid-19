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

  public muertes;
  public recuperados;
  public cargando = true;
  public casosChile: IPais;
  private casos: ITotal;
  constructor(private covidService: CovidApiService, private util: UtilService) {
    this.util.sleep(60000).then(() => {
      this.cargando = true;
      this.cargarDatos();
    });
  }

  ionViewWillEnter() {
    this.cargarDatos();
  }

  public getTotales() {
    this.covidService.get<ITotal>(environment.pathAll).subscribe((result) => {
      this.casos = result;
    });
  }

  public getPaises() {
    this.covidService.get<any>(environment.pathCountries).subscribe((result) => {
      console.log(result);

      Array.from(result).map((pais: IPais) => {
        if (pais.country === 'Chile') {
          this.casosChile = pais;
        }
      });
    });
    console.log(this.casosChile);
    this.cargando = false;
  }

  cargarDatos() {
    this.getPaises();
    this.getTotales();
  }
}
