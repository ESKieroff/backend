// Outro exemplo com diversas expressões e lógica condicional

const processarDados = (
  nome: string,
  idade: number,
  ativo: boolean,
): string[] => {
  return nome !== '' && idade > 18 && ativo
    ? ['Nome:', nome, 'Idade:', idade.toString()]
    : ['Dados incompletos'];
};
processarDados('Fulano', 20, true);

const calcularPreco = (
  preco: number,
  desconto: number = 0.1,
  taxa: number = 0.2,
): number => {
  const precoFinal = preco - preco * desconto;
  const precoComTaxa = precoFinal + precoFinal * taxa;
  return precoComTaxa;
};
calcularPreco(100);
