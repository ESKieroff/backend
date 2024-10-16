# TAREFAS

[x] criar registro no estoque/ lote
[x] atualizar registro estoque/ lote
[ ] findOne
[ ] findAll
[ ] formatar resposta objeto com info uteis e organizadas
[ ] funcionalidade para gerar lote
[ ] função para varrer as tabelas que não possuem relacionamento e remover elas, ou não deixar criar
[ ]     // precisa converter a data que recebe no DTO para o formato Date


- de forma autonoma (function)
- pegando ultimo lote gerado (sequencial)
- manter mesma máscara
  [ ] validar campos no controller
- se são válidos (usar zod)
- se é um number onde pede id
  [ ] tratamento de erros (capturar erros e responder na rota sem quebrar aplicação)
- valor inválido (f, z16)
- valor inexistente (número fora da sequencia)
  [ ] validar no service
- registro já existe, não tem campos para atualizar, incluir campos que precisa e não vieram no request

  // ATENÇÃO: NÃO REMOVER COMENTÁRIOS - SERVEM PRA EU ME LOCALIZAR NO CÓDIGO E O QUE TEM PRA FAZER

  // criar estoque

  // se movimento for output, verifica o parametro em Settings.enableNegativeStock

  // se for false, chama função consulta estoque pra ver se é negativo

  // se for negativo, exibe mensagem informativa

  // const contador da sequencia

  // cria docto em stock e recupera dados pra inserir no item

  // verifica se já tem intens incluídos e última sequencia

  // insere dados do item, itera sequencia

  // se não tem mais itens termina e exibe ResponseStockDTo
