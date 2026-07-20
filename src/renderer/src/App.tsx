import { useState, type ChangeEvent, type FormEvent, useEffect } from 'react';
import { FiltroNotas } from '@/components/FiltroNotas';
import { ConfigModal } from '@/components/ConfigModal';
import { type FormState, type ConfigCofre } from '@/types';
import Swal from 'sweetalert2';
import './App.css';

function App() {
  const mesAtual = new Date().getMonth() + 1;

  const [form, setForm] = useState<FormState>({
    text: '',
    mesNota: mesAtual,
    mesPasta: mesAtual,
    tipoEmpresa: 'FILIAL',
    tipoNota: 'nfe',
  })

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [config, setConfig] = useState<ConfigCofre>({
    loginCofre: '',
    senhaCofre: '',
    caminhoDestino: '',
  });

  useEffect(() => {
    const conectarWS = () => {
      const socket = new WebSocket('ws://127.0.0.1:8000/ws');

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.action === 'SOLICITAR_EMITENTE') {
          const emitenteDesconhecido = data.payload.emitente;

          const nomeDigitado = prompt(`Emitente não reconhecido: ${emitenteDesconhecido}.\nDigite o nome:`);

          socket.send(JSON.stringify({
            nome_identificado: nomeDigitado || emitenteDesconhecido
          }));
        }
      };

      socket.onerror = () => {
        console.log("Aguardando API Python iniciar para conectar o WebSocket...");
      };

      socket.onclose = () => {
        setTimeout(conectarWS, 3000);
      };
    };

    conectarWS();
  }, []);


  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('appConfigCofre');
      if (savedConfig) {
        setConfig(JSON.parse(savedConfig));
      }
    } catch (error) {
      console.error('Fail to load config from local:', error);
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: name.startsWith('mes') ? parseInt(value) : value
    }));
  };

  const handleConfigChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectFolder = async () => {
    const api = window.electronAPI;

    if (api && typeof api.selectFolder === 'function') {
      const folderPath = await api.selectFolder();

      if (folderPath) {
        setConfig(prev => ({ ...prev, caminhoDestino: folderPath}));
      }

    } else {
      Swal.fire({
        text: 'A seleção de pastas só funciona rodando dentro do aplicativo Electron!',
        icon: 'warning',
        confirmButtonText: 'Legal',
      });
    }
  };

  const handleSaveConfig = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Configurações salvas:', config);

    localStorage.setItem('appConfigCofre', JSON.stringify(config));

    setIsModalOpen(false);
  };
 
  const handleBuscarNotas = async () => {
    if (!config.loginCofre || !config.senhaCofre || !config.caminhoDestino) {
      const api = window.electronAPI;
        await api.showAlert('Configure o CNPJ, Senha e a Pasta de Destino.');
      setIsModalOpen(true);
      return;
    }

    const arrayNotas = form.text.split(',').map(n => n.trim()).filter(n => n.length > 0);
    if (arrayNotas.length === 0) {
      Swal.fire({
        text: 'Nenhuma nota informada.',
      })
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/executar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notas: arrayNotas,
          empresa: form.tipoEmpresa,
          mes_nota: form.mesNota,
          mes_pasta: form.mesPasta,
          tipo: form.tipoNota,
          caminho_destino: config.caminhoDestino,
          cnpj_matriz: config.loginCofre,
          senha_cofre: config.senhaCofre,
        })
      });

      const resultado = await response.json();
      alert(resultado.mensagem);

    } catch (error) {
      console.error('Erro ao buscar notas:', error);
      alert("Erro na comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="settings-button"
        onClick={() => setIsModalOpen(true)}
        aria-label="Configurações Cofre"
      >
        ⚙️
      </button>

      {loading && (
        <div className="loading-overlay">
          <div className="loading-box">
            <span className="spinner">⏳</span>
            <p>
              O robô está processando as notas no painel...Aguarde.
            </p>
          </div>
        </div>
      )}

      <FiltroNotas form={form} onInputChange={handleInputChange} onBuscar={handleBuscarNotas} />

      <ConfigModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        config={config}
        onConfigChange={handleConfigChange}
        onSelectFolder={handleSelectFolder}
        onSave={handleSaveConfig}
      />

    </>
  );
}

export default App

