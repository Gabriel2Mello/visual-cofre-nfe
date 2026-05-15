import { useState, type ChangeEvent } from 'react';
import './App.css';

type TipoEmpresa = 'MATRIZ' | 'FILIAL';
type TipoNota = 'nfe' | 'cte';

interface FormState {
  text: string;
  mesNota: number;
  mesPasta: number;
  tipoEmpresa: TipoEmpresa;
  tipoNota: TipoNota;
}

const meses = [
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

function App() {
  const mesAtual = new Date().getMonth() + 1;

  const [form, setForm] = useState<FormState>({
    text: '',
    mesNota: mesAtual,
    mesPasta: mesAtual,
    tipoEmpresa: 'FILIAL',
    tipoNota: 'nfe'
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: name.startsWith('mes') ? parseInt(value) : value
    }));
  };

  const nomeMesPasta = meses.find(m => m.valor === form.mesPasta)?.nome;
  const mesNotaFormatado = form.mesNota.toString().padStart(2, '0');

  const siglaNota = form.tipoNota === 'nfe' ? 'NF-e' : 'CT-e';
  const mensagemSelecionado = `Selecionado: (${form.tipoEmpresa}) ${siglaNota} do mês ${mesNotaFormatado} para salvar na pasta de ${nomeMesPasta}`;

  return (
    <>
      <section id="center">
        <div>
          <h1>Visual Cofre</h1>

          <div className="input-container-search">
            <input
              type="text"
              name="text"
              value={form.text}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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

    </>
  )
}

export default App

