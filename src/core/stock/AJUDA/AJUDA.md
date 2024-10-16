
# TAREFAS
[x] criar registro no estoque/ lote
[x] atualizar registro estoque/ lote
[ ] findOne
[ ] findAll
[ ] formatar resposta objeto com info uteis e organizadas
[ ] funcionalidade para gerar lote
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
