import { useState, type ChangeEvent, type FormEvent, useEffect } from 'react';
import { FiltroNotas } from '@/components/FiltroNotas';
import { ConfigModal } from '@/components/ConfigModal';
import { type FormState, type ConfigCofre } from '@/types';
import './App.css';

function App() {
  const mesAtual = new Date().getMonth() + 1;

  const [form, setForm] = useState<FormState>({
    text: '',
    mesNota: mesAtual,
    mesPasta: mesAtual,
    tipoEmpresa: 'FILIAL',
    tipoNota: 'nfe'
  })

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [config, setConfig] = useState<ConfigCofre>({
    loginCofre: '',
    senhaCofre: ''
  });

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

  const handleSaveConfig = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Configurações salvas:', config);

    localStorage.setItem('appConfigCofre', JSON.stringify(config));

    setIsModalOpen(false);
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

      <FiltroNotas form={form} onInputChange={handleInputChange} />

      <ConfigModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        config={config}
        onConfigChange={handleConfigChange}
        onSave={handleSaveConfig}
      />

    </>
  );
}

export default App

