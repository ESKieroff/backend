import { generateLote } from './lote.utils';
import { Settings } from '../../config/settings';

Settings.loteNumberLength = 5;
Settings.defaultLoteInputMask = 'P';

const testGenerateLote = () => {
  const newLote = generateLote(Settings.defaultLoteInputMask, 30);
  console.log('Novo lote gerado:', newLote);
};

testGenerateLote();
