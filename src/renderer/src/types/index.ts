export type TipoEmpresa = 'MATRIZ' | 'FILIAL';
export type TipoNota = 'nfe' | 'cte';

export interface FormState {
  text: string;
  mesNota: number;
  mesPasta: number;
  tipoEmpresa: TipoEmpresa;
  tipoNota: TipoNota;
}

export interface ConfigCofre {
  loginCofre: string;
  senhaCofre: string;
  caminhoSalvamento: string;
}

export const meses = [
  { valor: 1,  nome: 'Janeiro' },
  { valor: 2,  nome: 'Fevereiro' },
  { valor: 3,  nome: 'Março' },
  { valor: 4,  nome: 'Abril' },
  { valor: 5,  nome: 'Maio' },
  { valor: 6,  nome: 'Junho' },
  { valor: 7,  nome: 'Julho' },
  { valor: 8,  nome: 'Agosto' },
  { valor: 9,  nome: 'Setembro' },
  { valor: 10, nome: 'Outubro' },
  { valor: 11, nome: 'Novembro' },
  { valor: 12, nome: 'Dezembro' }
];
