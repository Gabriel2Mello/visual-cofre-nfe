import './FiltroNotas.css'
import { type ChangeEvent } from 'react';
import { type FormState, meses } from '@/types'

interface FiltroNotasProps {
  form: FormState;
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export function FiltroNotas({ form, onInputChange}: FiltroNotasProps) {
  const nomeMesPasta = meses.find(m => m.valor === form.mesPasta)?.nome;
  const mesNotaFormatado = form.mesNota.toString().padStart(2, '0');
  const siglaNota = form.tipoNota === 'nfe' ? 'NF-e' : 'CT-e';

  const mensagemSelecionado = `Selecionado: (${form.tipoEmpresa}) ${siglaNota} do mês ${mesNotaFormatado} para salvar na pasta de ${nomeMesPasta}`;

  return (
    <section id="center">
      <div>
        <h1>Visual Cofre</h1>

        <div className="input-container-search">
          <input
            type="text"
            name="text"
            value={form.text}
            onChange={onInputChange}
            placeholder="Digite a nota..."
          />

          <button type="button" className="input-button">
            Buscar
          </button>
        </div>

        <div className="select-container">
          <label htmlFor="mesNota">Mês da Nota:</label>
          <select
            id="mesNota"
            name="mesNota"
            value={form.mesNota}
            onChange={onInputChange}
          >
            {meses.map((mes) => (
              <option key={mes.valor} value={mes.valor}>
                {mes.nome}
              </option>
            ))}
          </select>

          <label htmlFor="mesPasta">Pasta:</label>
          <select
            id="mesPasta"
            name="mesPasta"
            value={form.mesPasta}
            onChange={onInputChange}
          >
            {meses.map((mes) => (
              <option key={mes.valor} value={mes.valor}>
                {mes.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="radio-container">
          <div className="radio-group">
            <label className="custom-checkbox">
              <input
                type="radio"
                name="tipoEmpresa"
                value="MATRIZ"
                checked={form.tipoEmpresa === 'MATRIZ'}
                onChange={onInputChange}
              />
              <span className="checkmark"></span>
              Matriz
            </label>

            <label className="custom-checkbox">
              <input
                type="radio"
                name="tipoEmpresa"
                value="FILIAL"
                checked={form.tipoEmpresa === 'FILIAL'}
                onChange={onInputChange}
              />
              <span className="checkmark"></span>
              Filial
            </label>
          </div>

          <div className="radio-group">
            <label className="custom-checkbox">
              <input
                type="radio"
                name="tipoNota"
                value="nfe"
                checked={form.tipoNota === 'nfe'}
                onChange={onInputChange}
              />
              <span className="checkmark"></span>
              NF-e
            </label>

            <label className="custom-checkbox">
              <input
                type="radio"
                name="tipoNota"
                value="cte"
                checked={form.tipoNota === 'cte'}
                onChange={onInputChange}
              />
              <span className="checkmark"></span>
              CT-e
            </label>
          </div>
        </div>

        <div id="spacer"></div>

        <p>{mensagemSelecionado}</p>
      </div>
    </section>
  );
}
