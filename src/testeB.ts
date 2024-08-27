// Outro exemplo com diversas expressões e lógica condicional

const processarDados2 = (
  nome: string,
  idade: number,
  ativo: boolean
): string[] => {
  return nome !== '' && idade > 18 && ativo
    ? ['Nome:', nome, 'Idade:', idade.toString()]
    : ['Dados incompletos'];
};

processarDados2('Fulano', 20, true);

const calcularPrecos = (preco: number, desconto: number): number => {
  return preco - preco * desconto;
};

calcularPrecos(100, 0.1);

const calcularpeso = (peso: number, altura: number): string => {
  const imc = peso / (altura * altura);
  if (imc < 18.5) {
    return 'Abaixo do peso';
  } else if (imc >= 18.5 && imc < 24.9) {
    return 'Peso normal';
  } else if (imc >= 25 && imc < 29.9) {
    return 'Sobrepeso';
  } else if (imc >= 30 && imc < 34.9) {
    return 'Obesidade grau 1';
  } else if (imc >= 35 && imc < 39.9) {
    return 'Obesidade grau 2';
  } else {
    return 'Obesidade grau 3';
  }
};

calcularpeso(80, 1.8);

const calcularPreco2 = (
  preco: number,
  desconto: number = 0.1,
  taxa: number = 0.2
): number => {
  const precoFinal = preco - preco * desconto;
  const precoComTaxa = precoFinal + precoFinal * taxa;
  return precoComTaxa;
};
calcularPreco2(100);
