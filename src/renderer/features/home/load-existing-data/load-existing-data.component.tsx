import { Button, Pane } from "evergreen-ui";
import * as React from 'react';
import { database } from "../../../database/database";

export const LoadExistingData = () => {
  const load = () => {
    const ElectronStore = require('electron-store');
    const storage = new ElectronStore({ name: 'appState' });
    database.loadExistingData(storage.get('state'));
  };

  return (
    <Pane>
      <Button onClick={load}>Load</Button>
    </Pane>
  );
};