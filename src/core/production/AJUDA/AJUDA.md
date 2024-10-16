
neste diretório tem um arquivo de importação do INSOMNIA pra testar os endpoints, já com dados para preencher

# já ta implementado (sem validação nenhuma):

- FindAll
- FindById
- Create
- Update
- Delete

# A FAZER
- validações de campos no controller - formato do request, campos que são criados dentro do controller
- validações do service
- precisa resolver problema do response, ta vindo fora da ordem, não tá fazendo orderby id

# os testes são:

# caminho feliz

- informar os dados esperados
  esperado: retorno dos objetos ou mensagem com código 200, 201 ....

# teste de tratamento de erros:

- mandar dados incompletos (faltando campos)
  esperado: mensagem informando que falta campo x ou y
- mandar dados incorretos (nome de campos errado)
  esperado: mensagem informando qual campo ou campos está errado e o que se espera na rota
- números fora do intervalo (inexistente, tipo 1600)
  esperado: mensagem informativa not found
- valores inválidos no request (no lugar do id informar um caractere string qualquer, tipo F, f1)
  esperado: mensagem informativa invalid id
