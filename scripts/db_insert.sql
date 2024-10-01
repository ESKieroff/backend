INSERT INTO "Categoria" ("descricao")
VALUES 
    ('Legumes'),
    ('Frutas'),
    ('Verduras');


INSERT INTO "Local" ("descricao")
VALUES
 ('Freezer 1'),
 ('Freezer 2');


INSERT INTO "Usuario" ("nome", "senha")
VALUES 
	('Cassio', 'cassio'),
	('Joao', 'joao'),
	('Joana', 'joana'),
	('Laura', 'laura'),
	('Lauro', 'lauro'),
    ('Maria', 'maria'),
    ('Mario', 'mario');
	

INSERT INTO "ProdutoFinal" ("descricao", "categoriaId")
VALUES 
    ('Batata cubinhos', 1),
    ('Cenoura cubinhos', 1),
    ('Mandioca descascada', 1),
    ('Mirtilos selecionados', 2),
    ('Laranja descascada', 2),
    ('Maça cubinhos', 2),
    ('Alface desfolhado',  3);	


INSERT INTO "MateriaPrima" ("descricao", "imagem", "categoriaId", "produtoFinalId")
VALUES 
    ('Batata', 'https://images.app.goo.gl/DDnkSGBFhtAJ6LAF7', 1, 1),
    ('Maçã', 'https://images.app.goo.gl/xyXxbBfENNM2R1fM9', 2, 6),
    ('Banana', 'https://th.bing.com/th/id/OIP.iFm2DffdX5eMg2LjmcRovQHaEK?rs=1&pid=ImgDetMain', 2, 2),
    ('Rucula', 'https://th.bing.com/th/id/R.185f438e71c11e0506d11e41566f22e4?rik=lHVWNPA5HwV8Sg&pid=ImgRaw&r=0', 3, 6),
    ('Alface', 'https://th.bing.com/th/id/OIP.0bFqMiCtpbitfhNSc3fd9gHaFj?rs=1&pid=ImgDetMain', 3, 6);


INSERT INTO "LoteMateria" ("sku", "preco_custo", "quantidade_inicial", "quantidade_atual", "unidade_medida", "fornecedor", "materiaPrimaId", "localId")
VALUES 
    ('SKU001', 1234.0, 50, 50, 'kg','Fazenda Sol', 1, 1),
    ('SKU002', 2221.50, 40, 40, 'kg','Fazenda Feliz', 2, 1),
    ('SKU003', 777.75, 130, 130, 'kg','Fazenda Magica', 3, 2),
    ('SKU004', 241.25, 20, 20, 'kg', 'Fazenda Luz', 4, 1),
    ('SKU005', 250.0, 5, 5, 'kg', 'Fazenda Verde', 2, 2),
    ('SKU006', 450.0, 55, 53, 'kg', 'Fazenda Lua', 1, 2);
	

INSERT INTO "Ordem" ("numero", "quantidade_esperada", "status", "produtoFinalId", "loteMateriaId")
VALUES 
    (1, 20, 'Em Andamento', 1, 4),
    (2, 100, 'Pendente', 2, 3),	
    (3, 200, 'Finalizada', 3, 6),
    (4, 50, 'Em Andamento', 7, 5),
    (5, 50, 'Finalizada', 6, 1);


INSERT INTO "LoteProduto" ("sku", "quantidade", "unidade_medida", "imagem", "produtoId", "localId", "ordemId")
VALUES 
    ('SKU001', 11, 'kg', 'https://th.bing.com/th/id/OIP.JRIl232pnbpA16SBAYybKAHaGR?rs=1&pid=ImgDetMain', 1, 1, 1),
	('SKU002', 22, 'kg', 'https://th.bing.com/th/id/OIP.n8TrCIyMGsoJJYQqXsncvAHaE8?rs=1&pid=ImgDetMain', 2, 1, 2),
    ('SKU003', 33, 'kg', 'https://th.bing.com/th/id/OIP.iFm2DffdX5eMg2LjmcRovQHaEK?rs=1&pid=ImgDetMain', 3, 1, 3),
    ('SKU004', 44, 'kg', 'https://th.bing.com/th/id/OIP.pxR1WpT9QADVJm2k5KJV_gHaE8?rs=1&pid=ImgDetMain', 4, 1, 4),
    ('SKU005', 55, 'kg', 'https://th.bing.com/th/id/OIP.yk1JDwcZ44Y8eQKGfMC7cAHaEo?rs=1&pid=ImgDetMain', 5, 1, 5),
    ('SKU006', 66, 'kg', 'https://th.bing.com/th/id/OIP.0bFqMiCtpbitfhNSc3fd9gHaFj?rs=1&pid=ImgDetMain', 6, 1, 1),
    ('SKU007', 77, 'kg', 'https://th.bing.com/th/id/R.185f438e71c11e0506d11e41566f22e4?rik=lHVWNPA5HwV8Sg&pid=ImgRaw&r=0', 7, 1, 2);


INSERT INTO "Etapa" ("descricao", "produtoId", "usuarioId")
VALUES 
    ('Corte de Batata', 1, 1),
    ('Corte de Cenoura', 2, 2),
    ('Descascamento de Mandioca', 3, 1),
    ('Seleção de Mirtilos', 4, 3),
    ('Descascamento de Laranja', 5, 4),
    ('Corte de Maça', 6, 5),
    ('Desfolhamento de Alface', 7, 3);


INSERT INTO "EtapaOrdem" ("status", "quantidade_inicial", "quantidade_final", "ordemId", "etapaId", "usuarioId")
VALUES 
    ('Em andamento', 30.0, 20.0, 1, 1, 1),
    ('Pendente', 120.0, 100.0, 2, 2, 2),
    ('Finalizado', 250.0, 200.0, 3, 3, 3),
    ('Em andamento', 70.0, 50, 4, 4, 4),
    ('Finalizado', 60.0, 50.0, 5, 5, 5);
    

INSERT INTO "Ocorrencia" ("titulo", "texto", "data_ocorrencia", "imagem", "etapaOrdemId")
VALUES 
    ('Problema na Linha de Produção', 'Houve um problema na linha de produção que causou um atraso.', '2023-10-01 10:00:00', 'https://images.app.goo.gl/DDnkSGBFhtAJ6LAF7', 1),
    ('Manutenção Necessária', 'Manutenção programada é necessária para o equipamento.', '2023-10-02 14:30:00', 'https://th.bing.com/th/id/R.185f438e71c11e0506d11e41566f22e4?rik=lHVWNPA5HwV8Sg&pid=ImgRaw&r=0', 2),
    ('Falha na Verificação de Qualidade', 'A verificação de qualidade falhou para o lote #123.', '2023-10-03 09:15:00', 'https://images.app.goo.gl/xyXxbBfENNM2R1fM9', 3),
    ('Novo Equipamento Instalado', 'Novo equipamento foi instalado na linha de produção.', '2023-10-04 11:45:00', 'https://th.bing.com/th/id/R.185f438e71c11e0506d11e41566f22e4?rik=lHVWNPA5HwV8Sg&pid=ImgRaw&r=0', 4),
    ('Incidente de Segurança', 'Ocorreu um incidente de segurança no armazém.', '2023-10-05 08:20:00', 'https://th.bing.com/th/id/OIP.iFm2DffdX5eMg2LjmcRovQHaEK?rs=1&pid=ImgDetMain', 5);
