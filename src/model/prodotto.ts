import {Unita} from "./unita";
import {Categoria} from "./categoria";

export class Prodotto {

  id: number;
  nome: string;
  marca: string;
  datadiScadenza: string;
  categoria: Categoria;
  quantitaDisponibile: number;
  quantitaDaAcquistare: number;
  unita: Unita;
  prezzoUnitario: number;
  prezzoSenzaIva: number;
  prezzoIvato: number;
  img: string;
  offerta: number;
  imgOfferta :string;

}
