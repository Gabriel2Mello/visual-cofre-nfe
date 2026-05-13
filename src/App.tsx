import { useState, type ChangeEvent } from 'react'
import './App.css'

const meses = [
  { valor: 1, nome: "Janeiro" },
  { valor: 2, nome: "Fevereiro" },
  { valor: 3, nome: "Março" },
  { valor: 4, nome: "Abril" },
  { valor: 5, nome: "Maio" },
  { valor: 6, nome: "Junho" },
  { valor: 7, nome: "Julho" },
  { valor: 8, nome: "Agosto" },
  { valor: 9, nome: "Setembro" },
  { valor: 10, nome: "Outubro" },
  { valor: 11, nome: "Novembro" },
  { valor: 12, nome: "Dezembro" }
]

function App() {
  const mesAtual = new Date().getMonth() + 1;

  const [text, setText] = useState<string>("");
  const [mesNota, setMesNota] = useState<number>(mesAtual);
  const [mesPasta, setMesPasta] = useState<number>(mesAtual);
  const [tipoEmpresa, setTipoEmpresa] = useState<string>("Filial")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const handleEmpresaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTipoEmpresa(e.target.value)
  }

  return (
    <>
      <section id="center">
        <div>
          <h1>Visual Cofre</h1>

          <div className="input-container">
            <input
              type="text"
              value={text}
              onChange={handleChange}
              placeholder="Digite a nota..."
            />
          </div>

          <div className="select-container">
            <label>Mês da Nota:</label>
            <select
              value={mesNota}
              onChange={(e) => setMesNota(parseInt(e.target.value))}
            >
              {meses.map((mes) => (
                <option key={mes.valor} value={mes.valor}>
                  {mes.nome}
                </option>
              ))}
            </select>

            <label>Pasta:</label>
            <select
              value={mesPasta}
              onChange={(e) => setMesPasta(parseInt(e.target.value))}
            >
              {meses.map((mes) => (
                <option key={mes.valor} value={mes.valor}>
                  {mes.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="radio-container">
            <label className="custom-checkbox">
              <input
                type="radio"
                value="Matriz"
                checked={tipoEmpresa === "Matriz"}
                onChange={handleEmpresaChange}
              />
              <span className="checkmark"></span>
              Matriz
            </label>

            <label className="custom-checkbox">
              <input
                type="radio"
                value="Filial"
                checked={tipoEmpresa === "Filial"}
                onChange={handleEmpresaChange}
              />
              <span className="checkmark"></span>
              Filial
            </label>
          </div>

          <p>
            Selecionado: {tipoEmpresa} -
            Nota do mês {mesNota.toString().padStart(2, "0")} para
            salvar na pasta de {meses.find(m => m.valor === mesPasta)?.nome}
          </p>
        </div>
      </section>

    </>
  )
}

export default App
