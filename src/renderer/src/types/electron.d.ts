export interface IElectronAPI {
  selectFolder: () => Promise<string | undefined>;
  saveFile: (data: { folderPath: string; fileName: string; content: string }) => Promise<boolean>;
  showAlert: (message: string) => Promise<boolean>;
}


declare global {
  interface Window {
    electron: IElectronAPI;
  }

  interface Window {
    electron: {
      ipcRenderer: {
        invoke: (channel: string, ...args: any[]) => Promise<any>;
      };
    };
  }
}

export {};
