-- Insert into usuario
INSERT INTO "Usuario" ("nome", "senha")
VALUES 
	('Cassio', 'cassio'),
	('Joao', 'joao'),
	('Joana', 'joana'),
	('Laura', 'laura'),
	('Lauro', 'lauro'),
    ('Maria', 'maria');

	
-- Insert into lote_produto
INSERT INTO "Lote_Produto" ("numero", "quantidade" , "imagem")
VALUES 
    ('1', '11','https://th.bing.com/th/id/OIP.JRIl232pnbpA16SBAYybKAHaGR?rs=1&pid=ImgDetMain'),
	('2', '22','https://th.bing.com/th/id/OIP.n8TrCIyMGsoJJYQqXsncvAHaE8?rs=1&pid=ImgDetMain'),
    ('3', '33','https://th.bing.com/th/id/OIP.iFm2DffdX5eMg2LjmcRovQHaEK?rs=1&pid=ImgDetMain'),
    ('4', '44','https://th.bing.com/th/id/OIP.pxR1WpT9QADVJm2k5KJV_gHaE8?rs=1&pid=ImgDetMain'),
    ('5', '55','https://th.bing.com/th/id/OIP.yk1JDwcZ44Y8eQKGfMC7cAHaEo?rs=1&pid=ImgDetMain'),
    ('6', '66','https://th.bing.com/th/id/OIP.0bFqMiCtpbitfhNSc3fd9gHaFj?rs=1&pid=ImgDetMain'),
    ('7', '77','https://th.bing.com/th/id/R.185f438e71c11e0506d11e41566f22e4?rik=lHVWNPA5HwV8Sg&pid=ImgRaw&r=0');


	
-- Insert into categoria
INSERT INTO "Categoria" ("descricao")
VALUES 
    ('Legumes'),
    ('Frutas'),
    ('Liquidos'),
    ('Detergentes'),
    ('Verduras');

	
-- Insert into produto_final
INSERT INTO "Produto_Final" ("descricao", "unidade_medida", "categoriaID", "categoria")
VALUES 
    ('Batata','Kg', 1),
    ('Cenoura', 'Kg', 1),
    ('Maca', 'Kg', 2),
    ('Alface', 'Kg', 5),	
    ('Beterraba', 'Kg', 1);
	
-- Insert into materia_prima
INSERT INTO "Materia_Prima" ("descricao","unidade_medida","preco_custo","images","categoriaID","categoria")
VALUES 
    ('Batata','Kg','50','https://images.app.goo.gl/DDnkSGBFhtAJ6LAF7','1','Legumes'),
    ('Maca','kg','70','https://images.app.goo.gl/xyXxbBfENNM2R1fM9','2','Frutas'),
    ('Agua','L','999','https://images.app.goo.gl/PJxhiX1Nub5G2cJa7','3','Liquidos'),
    ('XPTO Ozonio','L','70','https://images.app.goo.gl/6tqJ1jj3RryHMPgN8','4','Detergentes');
	
-- Insert into lote_materia
INSERT INTO "Lote_Materia" ("numero", "quantidade_inicial", "quantidade_atual", "forcenedor", "materiaPrimaId", "localId")
VALUES 
    (1, 50, 50, 'Fazenda Sol', 1, 1),
    (2, 40, 40, 'Fazenda Feliz', 1, 1),
    (3, 130, 130, 'Fazenda Magica', 2, 2),
    (4, 20, 20, 'Fazenda Luz', 2, 1),
    (5, 5, 5, 'Fazenda Verde', 2, 2),
    (6, 55, 53, 'Fazenda Lua', 1, 2);

-- Insert into local 
INSERT INTO "Local" ("descricao")
VALUES
 ('Freezer 1'),
 ('Freezer 2');

-- Insert into ordem
INSERT INTO "Ordem" ("numero","quantidade_esperada","status","produtoFinalId","produtoFinal","loteMateriaId","loteMateria")
VALUES 
('SKU001','20','Em Andamento','1','Batata cubinhos','4','4'),
('SKU002','100','Pausada','2','Cenoura cubinhos','3','3'),	
('SKU003','50','Finalizada','3','Madioca descascada','6','6'),
('SKU004','5', 'Em Andamento','7','Alface desfolhado','5','5'),
('SKU005','50','Finalizada','6','Maca cubinhos','1','1');


-- Insert into produto_final
INSERT INTO "Produto_Final" ("descricao", "unidadeMedida","categoriaId",)
VALUES 
('Batata cubinhos', 'Kg', 1),
('Cenoura cubinhos', 'Kg', 1),
('Mandioca descascada', 'Kg', 1),
('Mirtilos selecionados', 'Kg', 2),
('Laranja descascada', 'Kg', 2),
('Maca cubinhos', 'Kg', 2)
('Alface desfolhado', 'Kg', 5);	


-- Insert into etapa
INSERT INTO "Etapa" ("descricao","produtoId","produto","usuarioId","usuario")
VALUES 
    (''),



-- Insert into stock
INSERT INTO "stock" ("document_number", "document_date", "stock_moviment")
VALUES 
    ('NFE123', '2024-09-01 09:00:00', 'INPUT'),
    ('OP124', '2024-09-02 10:00:00', 'INPUT'),
    ('DOC123', '2024-09-01 09:00:00', 'OUTPUT'),
    ('NFE124', '2024-09-02 10:00:00', 'OUTPUT');


-- Insert into stock_items
INSERT INTO "stock_items" ("stock_id", "sequence", "product_id", "quantity", "unit_price", "total_price", "lote", "expiration", "stock_location_id")
VALUES 
	(1, 1, 1, 100.0, 10.0, 1000.0, 'LoteA123', '2024-12-31 23:59:59', 1),
    (1, 2, 2, 100.0, 10.0, 1000.0, 'LoteC123', '2024-12-31 23:59:59', 1),
    (1, 3, 3, 200.0, 20.0, 4000.0, 'LoteD456', '2024-12-15 23:59:59', 3),
	(1, 4, 4, 100.0, 10.0, 1000.0, 'LoteE123', '2024-12-31 23:59:59', 1),
    (1, 5, 5, 100.0, 10.0, 1000.0, 'LoteF123', '2024-12-31 23:59:59', 1),
    (1, 6, 6, 200.0, 20.0, 4000.0, 'LoteG456', '2024-12-15 23:59:59', 3),
	(1, 1, 7, 100.0, 10.0, 1000.0, 'LoteA123', '2024-12-31 23:59:59', 1),
    (1, 2, 8, 100.0, 10.0, 1000.0, 'LoteC123', '2024-12-31 23:59:59', 1),
	(3, 1, 1, 20.0, 10.0, 1000.0, 'LoteA123', '2024-12-31 23:59:59', 1),
    (3, 2, 2, 20.0, 10.0, 1000.0, 'LoteC123', '2024-12-31 23:59:59', 1),
    (3, 3, 3, 20.0, 20.0, 4000.0, 'LoteD456', '2024-12-15 23:59:59', 3),
	(3, 4, 4, 10.0, 10.0, 1000.0, 'LoteE123', '2024-12-31 23:59:59', 1),
    (3, 5, 5, 10.0, 10.0, 1000.0, 'LoteF123', '2024-12-31 23:59:59', 1),
    (3, 6, 6, 20.0, 20.0, 4000.0, 'LoteG456', '2024-12-15 23:59:59', 3),
	(3, 1, 7, 10.0, 10.0, 1000.0, 'LoteA123', '2024-12-31 23:59:59', 1),
    (3, 2, 8, 10.0, 10.0, 1000.0, 'LoteC123', '2024-12-31 23:59:59', 1),
	(2, 1, 9, 100.0, 10.0, 1000.0, 'LoteKK123', '2024-12-31 23:59:59', 1),
    (2, 2, 10, 100.0, 10.0, 1000.0, 'LoteTY123', '2024-12-31 23:59:59', 1),
    (2, 3, 11, 200.0, 20.0, 4000.0, 'LoteER56', '2024-12-15 23:59:59', 3),
	(2, 4, 12, 100.0, 10.0, 1000.0, 'LoteOI123', '2024-12-31 23:59:59', 1),
    (2, 5, 13, 100.0, 10.0, 1000.0, 'LoteABC123', '2024-12-31 23:59:59', 1),
    (2, 6, 14, 200.0, 20.0, 4000.0, 'LoteWW456', '2024-12-15 23:59:59', 3),
	(4, 1, 9, 10.0, 10.0, 1000.0, 'LoteKK123', '2024-12-31 23:59:59', 1),
    (4, 2, 10, 10.0, 10.0, 1000.0, 'LoteTY123', '2024-12-31 23:59:59', 1),
    (4, 3, 11, 20.0, 20.0, 4000.0, 'LoteER56', '2024-12-15 23:59:59', 3),
	(4, 4, 12, 10.0, 10.0, 1000.0, 'LoteOI123', '2024-12-31 23:59:59', 1),
    (4, 5, 13, 10.0, 10.0, 1000.0, 'LoteABC123', '2024-12-31 23:59:59', 1),
    (4, 6, 14, 20.0, 20.0, 4000.0, 'LoteWW456', '2024-12-15 23:59:59', 3);
	
	
-- Insert into production_steps
INSERT INTO "production_steps" ("description")
VALUES 
    ('SEPARAÇÃO'),
    ('SELEÇÃO'),
    ('LAVAGEM'),
    ('HIGIENIZAÇÃO'),
    ('CORTE'),
    ('FATIAMENTO'),
    ('EMPACOTAMENTO'),
    ('INSPEÇÃO DE QUALIDADE'),
    ('LIMPEZA'),
    ('TRITURAÇÃO'),
    ('MOAGEM'),
    ('FRITURA'),
    ('AQUECIMENTO');

-- Insert into production
INSERT INTO "production" ("description","final_product","prodution_quantity_estimated", "production_quantity_real", "lote", "expiration", "Production_Status")
VALUES 
    ('Production A', 10,1000.0, 950.0, 'LoteTY123', '2024-12-31 23:59:59', 'CREATED'),
    ('Production B', 11,2000.0, 1900.0, 'LoteER56', '2024-12-15 23:59:59','SCHEDULED'),
    ('Production C', 12,1000.0, 950.0, 'LoteOI123', '2024-12-31 23:59:59', 'IN_PROGRESS'),
    ('Production D', 13,2000.0, 1900.0, 'LoteB456', '2024-12-15 23:59:59','SCHEDULED'),
    ('Production E', 14,1000.0, 950.0, 'LoteABC123', '2024-12-31 23:59:59', 'OPEN');


-- Insert into production_work
INSERT INTO "production_work" ("production_id", "step_id", "raw_product_id", "sequence", "start_time", "end_time", "total_time", "initial_weight", "final_weight", "weight_loss", "machine", "observation")
VALUES 
    (1, 1, 10, 1, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine A', 'No issues'),
    (1, 2, 10, 2, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine B', 'Minor issues'),
    (1, 3, 10, 3, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine C', 'No issues'),
    (1, 4, 10, 4, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine D', 'Minor issues'),
    (1, 5, 10, 5, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine E', 'No issues'),
    (1, 6, 10, 6, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine F', 'Minor issues'),
    (1, 1, 10, 1, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine A', 'No issues'),
    (1, 2, 10, 2, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine B', 'Minor issues'),
    (1, 3, 10, 3, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine C', 'No issues'),
    (1, 4, 10, 4, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine D', 'Minor issues'),
    (1, 5, 10, 5, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine E', 'No issues'),
    (1, 6, 10, 6, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine F', 'Minor issues'),
    (2, 1, 11, 1, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine A', 'No issues'),
    (2, 2, 11, 2, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine B', 'Minor issues'),
    (2, 3, 11, 3, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine C', 'No issues'),
    (2, 4, 11, 4, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine D', 'Minor issues'),
    (2, 5, 11, 5, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine E', 'No issues'),
    (2, 6, 11, 6, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine F', 'Minor issues'),	
    (3, 1, 12, 1, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine A', 'No issues'),
    (3, 2, 12, 2, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine B', 'Minor issues'),
    (3, 3, 12, 3, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine C', 'No issues'),
    (3, 4, 12, 4, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine D', 'Minor issues'),
    (3, 5, 12, 5, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine E', 'No issues'),
    (3, 6, 12, 6, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine F', 'Minor issues');
