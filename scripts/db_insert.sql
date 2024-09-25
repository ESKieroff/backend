INSERT INTO "Usuario" ("nome", "senha")
VALUES 
	('Cassio', 'cassio'),
	('Joao', 'joao'),
	('Joana', 'joana'),
	('Laura', 'laura'),
	('Lauro', 'lauro'),
    ('Maria', 'maria'),
    ('Mario', 'mario');
	

INSERT INTO "Categoria" ("descricao")
VALUES 
    ('Legumes'),
    ('Frutas'),
    ('Verduras');


INSERT INTO "Local" ("descricao")
VALUES
 ('Freezer 1'),
 ('Freezer 2');


INSERT INTO "ProdutoFinal" ("descricao", "unidade_medida","categoriaId")
VALUES 
('Batata cubinhos', 'Kg', 1),
('Cenoura cubinhos', 'Kg', 1),
('Mandioca descascada', 'Kg', 1),
('Mirtilos selecionados', 'Kg', 2),
('Laranja descascada', 'Kg', 2),
('Maça cubinhos', 'Kg', 2),
('Alface desfolhado', 'Kg', 3);	


INSERT INTO "MateriaPrima" ("descricao", "unidade_medida", "preco_custo", "imagem", "categoriaId", "produtoFinalId")
VALUES 
    ('Batata','Kg', 5.0,'https://images.app.goo.gl/DDnkSGBFhtAJ6LAF7', 1, 1),
    ('Maçã','Kg', 7.0,'https://images.app.goo.gl/xyXxbBfENNM2R1fM9', 2, 1),
    ('Banana', 'Kg', 4.0,'https://th.bing.com/th/id/OIP.iFm2DffdX5eMg2LjmcRovQHaEK?rs=1&pid=ImgDetMain', 2, 1),
    ('Rucula', 'Kg', 5.0,'https://th.bing.com/th/id/R.185f438e71c11e0506d11e41566f22e4?rik=lHVWNPA5HwV8Sg&pid=ImgRaw&r=0', 3, 2),
    ('Alface', 'Kg', 3.4,'https://th.bing.com/th/id/OIP.0bFqMiCtpbitfhNSc3fd9gHaFj?rs=1&pid=ImgDetMain', 3, 3);


INSERT INTO "LoteMateria" ("numero", "quantidade_inicial", "quantidade_atual", "fornecedor", "materiaPrimaId", "localId")
VALUES 
    (1, 50, 50, 'Fazenda Sol', 1, 1),
    (2, 40, 40, 'Fazenda Feliz', 1, 1),
    (3, 130, 130, 'Fazenda Magica', 2, 2),
    (4, 20, 20, 'Fazenda Luz', 2, 1),
    (5, 5, 5, 'Fazenda Verde', 2, 2),
    (6, 55, 53, 'Fazenda Lua', 1, 2);
	

INSERT INTO "Ordem" ("numero", "quantidade_esperada", "status", "produtoFinalId", "loteMateriaId")
VALUES 
('SKU001', 20,'Em Andamento', 1, 4),
('SKU002', 100,'Pendente', 2, 3),	
('SKU003', 200,'Finalizada', 3, 6),
('SKU004', 50, 'Em Andamento', 7, 5),
('SKU005', 50,'Finalizada', 6, 1);


INSERT INTO "LoteProduto" ("numero", "quantidade" , "imagem", "produtoId", "localId", "ordemId")
VALUES 
    ('1', 11,'https://th.bing.com/th/id/OIP.JRIl232pnbpA16SBAYybKAHaGR?rs=1&pid=ImgDetMain', 1, 1, 1),
	('2', 22,'https://th.bing.com/th/id/OIP.n8TrCIyMGsoJJYQqXsncvAHaE8?rs=1&pid=ImgDetMain', 2, 1, 2),
    ('3', 33,'https://th.bing.com/th/id/OIP.iFm2DffdX5eMg2LjmcRovQHaEK?rs=1&pid=ImgDetMain', 3, 1, 3),
    ('4', 44,'https://th.bing.com/th/id/OIP.pxR1WpT9QADVJm2k5KJV_gHaE8?rs=1&pid=ImgDetMain', 4, 1, 4),
    ('5', 55,'https://th.bing.com/th/id/OIP.yk1JDwcZ44Y8eQKGfMC7cAHaEo?rs=1&pid=ImgDetMain', 5, 1, 5),
    ('6', 66,'https://th.bing.com/th/id/OIP.0bFqMiCtpbitfhNSc3fd9gHaFj?rs=1&pid=ImgDetMain', 6, 1, 1),
    ('7', 77,'https://th.bing.com/th/id/R.185f438e71c11e0506d11e41566f22e4?rik=lHVWNPA5HwV8Sg&pid=ImgRaw&r=0', 7, 1, 2);


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
