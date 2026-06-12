import './ConfigModal.css'
import { type ChangeEvent, type FormEvent, useRef, useEffect } from 'react';
import { type ConfigCofre } from '@/types';

interface ConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ConfigCofre;
  onConfigChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectFolder: () => void;
  onSave: (e: FormEvent<HTMLFormElement>) => void;
}

export function ConfigModal({ isOpen, onClose, config, onConfigChange, onSelectFolder, onSave }: ConfigModalProps) {
  const loginCofreInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      loginCofreInputRef.current?.focus();
    }
  }, [isOpen])

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Configurações Cofre</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={onSave}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="loginCofre">CNPJ</label>
              <input
                ref={loginCofreInputRef}
                type="text"
                id="loginCofre"
                name="loginCofre"
                value={config.loginCofre}
                onChange={onConfigChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="senhaCofre">Senha</label>
              <input
                type="password"
                id="senhaCofre"
                name="senhaCofre"
                value={config.senhaCofre}
                onChange={onConfigChange}
                required
              />
            </div>

            <div className="form-group">
              <button
                type="button"
                className="btn-search"
                onClick={onSelectFolder}
              >
                Selecionar Pasta
              </button>
              <span className="preview-caminho">
                {config.caminhoDestino || "Nenhuma pasta selecionada"}
              </span>

            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Salvar
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
