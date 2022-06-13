import { Moneda } from "./moneda";

export class Pais {
    public id: number;
    public pais: string;
    public codigoAlfa2: string;
    public codigoAlfa3: string;
    public moneda: Moneda | null;
    
    constructor(
        id: number,
        pais: string,
        codigoAlfa2: string,
        codigoAlfa3: string,
        moneda?: Moneda,
    ) {
        this.id = id;
        this.pais = pais;
        this.codigoAlfa2=codigoAlfa2;
        this.codigoAlfa3=codigoAlfa3;
        this.moneda = moneda ? moneda : null;
    }


}