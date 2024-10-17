import { Settings } from '../../config/settings';
import { formatISODateToPGDate } from './utils';
// ATENÇÃO: NÃO REMOVER OS COMENTÁRIOS, POIS ELES SÃO USADOS PARA ORIENTAR SOBRE O QUE DEVE SER FEITO
// Função para gerar o próximo número de lote

const getNextLoteNumber = (): number => {
  return Settings.lastLoteNumber + 1; // Incrementa o último número de lote para gerar o próximo
};

// Função para calcular a data de validade
const calculateExpirationDate = (daysToAdd?: number): Date => {
  const expirationDate = new Date(); // Data atual
  if (daysToAdd) {
    expirationDate.setDate(expirationDate.getDate() + daysToAdd);
  }
  return expirationDate; // Retorna a data de validade
};

// Função para formatar o número do lote com zeros à esquerda para preencher o comprimento total da máscara
// os números terão todos o mesmo tamanho, preenchendo com zeros à esquerda
// isso facilita a ordenação e a busca de lotes e geração de relatórios e gráficos (fica fácil ordenar e arrumar visualmente)
const formatLoteNumber = (loteNumber: number): string => {
  return loteNumber.toString().padStart(Settings.loteNumberLength, '0'); // Garante que o número tenha o comprimento especificado
};

// Função para gerar um novo lote
export const generateLote = (prefix: string, daysToExpire?: number): string => {
  const nextLoteNumber = getNextLoteNumber();
  const expirationDate = calculateExpirationDate(daysToExpire);

  // Função para formatar o número do lote com zeros à esquerda
  const formattedExpirationDate = formatISODateToPGDate(
    expirationDate.toISOString()
  );

  // Cria o novo lote no formato desejado (prefixo + número do lote formatado)
  const newLote = `${prefix}${formatLoteNumber(nextLoteNumber)}`;

  // Atualiza o último número de lote nas configurações
  Settings.lastLoteNumber = nextLoteNumber;
  // Retorna o novo lote
  return `${newLote}-${formattedExpirationDate}`;
};
