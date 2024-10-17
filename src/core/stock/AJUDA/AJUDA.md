# TAREFAS

## prioridade
[x] POST create criar registro no estoque/ lote
[-] PATH update atualizar registro estoque/ lote
[x] GET findOne
[x] GET findAll
[x] DELETE delete (exclusão física com cascade - remove docto e itens)
[x] UPDATE update registro campos que ficaram null ou podem atualizar
[ ] endpoint para lote validade com totais
[-] funcionalidade para gerar lote
[x] calcular totais de estoque atual disponível
[ ] funcionalidade para controlar data validade lote  (pegar de algum lugar o valor ou qtde dias)
[ ] funcionalidade para gerar número docto - document_number
[ ] precisa converter a data que recebe no DTO para o formato Date
[ ] validar campos no controller
- se são válidos (usar zod)
- se é um number onde pede id
[ ] tratamento de erros (capturar erros e responder na rota sem quebrar aplicação)
- valor inválido (f, z16)
- valor inexistente (número fora da sequencia)
[ ] validar no service
- registro já existe, não tem campos para atualizar, incluir campos que precisa e não vieram no request


## outras
[ ] formatar resposta objeto com info uteis e organizadas
[ ] processo de reserva de produto estoque lote validade
[ ] balance 
[ ] busca usuário e insere no dto updated_by
[ ] preço = request / buscar o preço no banco/ zero
[ ] função para varrer as tabelas que não possuem relacionamento e remover elas, ou não deixar criar
