-- insert into users 
-- o password dos usuários é "cpplanta"
INSERT INTO "users" ("username", "email", "password", "first_name", "last_name", "role", "gender", "created_by", "updated_by")
VALUES 
	  ('root', 'root@cpplanta.com', '$2b$10$R6pcILCI6LhYW4wd3UjDNOjOD9Rg5nCxp4ZZmMUrfRD0UGb4rrViC', 'Root', 'CP Planta', 'ROOT', 'OTHER', 'system', 'system'),
    ('system', 'system@cpplanta.com', '$2b$10$R6pcILCI6LhYW4wd3UjDNOjOD9Rg5nCxp4ZZmMUrfRD0UGb4rrViC', 'System', 'CP Planta', 'SYSTEM', 'OTHER', 'system', 'system'),
	  ('cassio', 'cassio@gmail.com', '$2b$10$R6pcILCI6LhYW4wd3UjDNOjOD9Rg5nCxp4ZZmMUrfRD0UGb4rrViC', 'Cassio', 'Santos', 'ROOT', 'MALE', 'system', 'system'),
    ('roberto', 'fulano@gmail.com', '$2b$10$R6pcILCI6LhYW4wd3UjDNOjOD9Rg5nCxp4ZZmMUrfRD0UGb4rrViC', 'Roberto', 'Da Silva', 'DEMO', 'MALE', 'system', 'system'),
    ('ana', 'ana@gmail.com', '$2b$10$R6pcILCI6LhYW4wd3UjDNOjOD9Rg5nCxp4ZZmMUrfRD0UGb4rrViC', 'Ana', 'Oliveira', 'DEMO', 'FEMALE', 'system', 'system'),
    ('maria', 'maria@gmail.com', '$2b$10$R6pcILCI6LhYW4wd3UjDNOjOD9Rg5nCxp4ZZmMUrfRD0UGb4rrViC', 'Maria', 'Silva', 'DEMO', 'FEMALE', 'system', 'system');
	
-- Insert into settings
INSERT INTO "settings" ("key", "value", "description", "created_by", "updated_by") 
VALUES
('enableNegativeStock', 'true', 'Serve para habilitar ou desabilitar o controle de estoque negativo','root','root'),
('defaultStockLocation', '1', 'Serve para definir o local de estoque padrão','root','root'),
('defaultRoleForNewUser', 'DEFAULT', 'Serve para definir o papel padrão para novos usuários','root','root'),
('defaultLoteInputMask', 'P', 'Define o padrão de máscara para lote de entrada','root','root'),
('defaultLoteOutputMask', 'PD', 'Define o padrão de máscara para lote de saída','root','root'),
('lastDocumentNumber', '3000', 'Serve para guardar o último número de documento criado para incrementar a partir dele','root','root'),
('lastLoteNumber', '1000', 'Serve para guardar o último número de lote criado para incrementar a partir dele','root','root'),
('loteNumberLength', '5', 'Define o tamanho do número do lote para preenchimento com zeros à esquerda (ex: 00001)','root','root');

-- Insert into persons
INSERT INTO "persons" ("name")
VALUES 
    ('Pedro Cabral'),
    ('Machado Assis'),
    ('Clarice Lispector'),
    ('Sebastião Costa'),	
    ('Produtor Rural'),
    ('Ecologia na Veia');	
	
-- Insert into categories
INSERT INTO "categories" ("description")
VALUES 
    ('Premium'),
    ('Importado'),
    ('Nacional'),
    ('Top Demais'),
    ('Promoção');
	
	
-- Insert into stock_location
INSERT INTO "stock_location" ("description")
VALUES 
    ('Câmara Fria A'),
    ('Depósito'),
    ('Pátio'),
    ('Câmara Fria B');
	

-- Insert into occurrences
INSERT INTO "occurrences" ("description")
VALUES 
    ('Problema na Linha de Produção'),
    ('Manutenção Necessária'),
    ('Falha na Verificação de Qualidade'),
    ('Novo Equipamento Instalado'),
    ('Incidente de Segurança'),
    ('Corpo estranho'),
    ('Mau odor'),
    ('Falta de energia'),
    ('Defeito no equipamento'),
    ('Impróprio para consumo'),
    ('Não especificado'),
    ('Controle de qualidade');

INSERT INTO "production_order_steps" ("description")
VALUES 
    ('Corte'),
    ('Descascamento'),
    ('Seleção'),
    ('Desfolhamento'),
    ('Embalagem'),
    ('Seleção de Qualidade'),
    ('Higienização'),
    ('Lavagem'),
    ('Seleção de Tamanho'),
    ('Seleção de Cor'),
    ('Seleção de Maturidade'),
    ('Seleção de Peso'),
    ('Seleção de Textura'),
    ('Seleção de Sabor'),
    ('Seleção de Aroma');   

  -- Insert into groups
INSERT INTO "groups" ("description", "father_id" )
VALUES 
  ('Batata', Null),
	('Tomate', Null),
	('Cebola', Null),
	('Couve', Null),
  ('Melancia', Null),
	('Batata Branca',1),
	('Tomate Cereja',2),
	('Cebola Roxa',3),
	('Couve Mirim',4),
  ('Melancia Gigante',5);
	    
-- Insert into products
INSERT INTO "products" ("description", "code", "sku", "origin", "unit_measure","category_id", "group_id", "supplier_id", "nutritional_info")
VALUES 
('batata branca', 'CODE001', 'SKU001', 'RAW_MATERIAL', 'KG',1, 1, 1,
'{
    "calories": 200,
    "fat": {
      "total": 8,
      "saturated": 3,
      "trans": 0
    },
    "carbohydrates": {
      "total": 30,
      "fiber": 5,
      "sugars": 12
    },
    "protein": 10,
    "sodium": 150,
    "vitamins": {
      "vitamin_a": 20,
      "vitamin_c": 15,
      "calcium": 30,
      "iron": 10
    }
  }'),
('cenoura', 'CODE002', 'SKU015', 'RAW_MATERIAL', 'KG',1, 1, 1, 
'{
    "calories": 200,
    "fat": {
      "total": 8,
      "saturated": 3,
      "trans": 0
    },
    "carbohydrates": {
      "total": 30,
      "fiber": 5,
      "sugars": 12
    },
    "protein": 10,
    "sodium": 150,
    "vitamins": {
      "vitamin_a": 20,
      "vitamin_c": 15,
      "calcium": 30,
      "iron": 10
    }
  }'),
('aipim', 'CODE003', 'SKU002', 'RAW_MATERIAL', 'KG',1, 1, 1, 
'{
    "calories": 200,
    "fat": {
      "total": 8,
      "saturated": 3,
      "trans": 0
    },
    "carbohydrates": {
      "total": 30,
      "fiber": 5,
      "sugars": 12
    },
    "protein": 10,
    "sodium": 150,
    "vitamins": {
      "vitamin_a": 20,
      "vitamin_c": 15,
      "calcium": 30,
      "iron": 10
    }
  }'),
('mirtilo', 'CODE004', 'SKU003', 'RAW_MATERIAL', 'KG',1, 1, 1,
   '{
    "calories": 200,
    "fat": {
      "total": 8,
      "saturated": 3,
      "trans": 0
    },
    "carbohydrates": {
      "total": 30,
      "fiber": 5,
      "sugars": 12
    },
    "protein": 10,
    "sodium": 150,
    "vitamins": {
      "vitamin_a": 20,
      "vitamin_c": 15,
      "calcium": 30,
      "iron": 10
    }
  }'
 ),
('laranja', 'CODE005', 'SKU004', 'RAW_MATERIAL', 'KG',1, 1, 1,
   '{
    "calories": 200,
    "fat": {
      "total": 8,
      "saturated": 3,
      "trans": 0
    },
    "carbohydrates": {
      "total": 30,
      "fiber": 5,
      "sugars": 12
    },
    "protein": 10,
    "sodium": 150,
    "vitamins": {
      "vitamin_a": 20,
      "vitamin_c": 15,
      "calcium": 30,
      "iron": 10
    }
  }'
  ),
('couve', 'CODE006', 'SKU005', 'RAW_MATERIAL', 'KG',1, 1, 1,
   '{
    "calories": 200,
    "fat": {
      "total": 8,
      "saturated": 3,
      "trans": 0
    },
    "carbohydrates": {
      "total": 30,
      "fiber": 5,
      "sugars": 12
    },
    "protein": 10,
    "sodium": 150,
    "vitamins": {
      "vitamin_a": 20,
      "vitamin_c": 15,
      "calcium": 30,
      "iron": 10
    }
  }'
  ),
('uva', 'CODE007', 'SKU006', 'RAW_MATERIAL', 'KG',1, 1, 1, Null),
('Batata cubinhos', 'CODE016', 'SKU007', 'MADE', 'KG',2, 2, 2, Null),
('cenoura cubinhos', 'CODE008', 'SKU008', 'MADE', 'KG',2, 2, 2, Null),
('Mandioca descascada', 'CODE009', 'SKU009', 'MADE', 'KG',2, 2, 2, Null),
('mirtilos selecionados', 'CODE010', 'SKU010', 'MADE', 'KG',2, 2, 2, Null),
('laranja descascada', 'CODE011', 'SKU011', 'MADE', 'KG',2, 2, 2, Null),
('mix de verduras', 'CODE012', 'SKU012', 'MADE', 'KG',2, 2, 2, Null),
('suco natural de uva', 'CODE013', 'SKU013', 'MADE', 'KG',2, 2, 2, Null);	

-- Insert into prices
INSERT INTO "prices" ("product_id", "price", "type", "is_current")
VALUES 
    (1, 1.0, 'COST',FALSE),
    (1, 1.5, 'COST',FALSE),
    (1, 2.0, 'COST',FALSE),
    (1, 3.0, 'COST',FALSE),
    (1, 4.0, 'COST',TRUE),
    (2, 2.0, 'COST',FALSE),
    (2, 10.0, 'COST',TRUE),
    (3, 13.0, 'COST',FALSE),
    (3, 15.0, 'COST',TRUE),
    (4, 21.0, 'COST',FALSE),
    (4, 20.0, 'COST',TRUE),
    (5, 18.0, 'COST',TRUE),
    (6, 14.0, 'COST',TRUE),
    (7, 11.0, 'COST',TRUE),
    (8, 7.0, 'COST',TRUE),	 
    (9, 9.0, 'COST',TRUE),
    (10, 8.0, 'COST',TRUE),
    (11, 12.0, 'COST',TRUE),
    (12, 3.0, 'COST',TRUE),
    (13, 4.0, 'COST',TRUE),
    (14, 5.0, 'COST',TRUE),
    (8, 7.0,'SALE',TRUE),
    (9, 9.0,'SALE',TRUE),
    (10, 8.0,'SALE',TRUE),
    (11, 12.0,'SALE',TRUE),
    (12, 3.0,'SALE',TRUE),
    (13, 4.0,'SALE',TRUE),
    (14, 5.0,'SALE',TRUE);


-- Insert into stock
INSERT INTO "stock" ("document_number", "document_date", "stock_moviment","document_type")
VALUES 
    ('NFE123', '2024-09-01 09:00:00', 'INPUT','nota entrada'),
    ('OP124', '2024-09-02 10:00:00', 'INPUT', 'ordem de produção'),
    ('DOC123', '2024-09-01 09:00:00', 'OUTPUT','documento entrada'),
    ('NFE124', '2024-09-02 10:00:00', 'OUTPUT','documento saida'),
    ('1001','2024-09-02 10:00:00', 'RESERVED','reserva producao');


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
    (4, 6, 14, 20.0, 20.0, 4000.0, 'LoteWW456', '2024-12-15 23:59:59', 3),
    (5, 5, 13, 10.0, 10.0, 1000.0, 'LOTE-TESTE', '2024-12-31 23:59:59', 1),
    (5, 6, 14, 20.0, 20.0, 4000.0, 'LOTE-TESTE', '2024-12-15 23:59:59', 3);
	
-- Insert into production_orders
INSERT INTO "production_orders" ("number","description", "production_date","Production_Status")
VALUES 
    (1,'Production A','2024-12-31 23:59:59', 'CREATED'),
    (2,'Production B','2024-12-15 23:59:59','SCHEDULED'),
    (3,'Production C','2024-12-31 23:59:59', 'IN_PROGRESS'),
    (4,'Production D','2024-12-15 23:59:59','SCHEDULED'),
    (5,'Production E','2024-12-31 23:59:59', 'OPEN');

-- Insert into production_orders_items
INSERT INTO "production_orders_items" ("production_order_id", "sequence", "final_product_id", "production_quantity_estimated", "production_quantity_real","production_quantity_loss", "lote", "lote_expiration")
VALUES
	(1, 1, 10, 1000.0, 950.0, 50.0, 'LoteTY123', '2024-12-31 23:59:59'),
    (2, 2, 11, 2000.0, 1900.0, 100.0, 'LoteER56', '2024-12-15 23:59:59'),
    (3, 3, 12, 1000.0, 950.0, 50.0,'LoteOI123', '2024-12-31 23:59:59'),
    (4, 4, 13, 2000.0, 1900.0, 100.0, 'LoteB456', '2024-12-15 23:59:59'),
    (5, 5, 14, 2000.0, 1900.0, 100.0, 'LoteABC123', '2024-12-15 23:59:59');

-- INSERT INTO "production_steps_progress"
INSERT INTO "production_steps_progress" (
    "production_id",
    "step_id",
    "raw_product_id",
    "sequence",	
    "start_time",
    "end_time",
    "total_time",
    "initial_quantity",
    "final_quantity",
    "quantity_loss",
    "machine",
    "observation",	
    "production_line")	
VALUES 
	(1, 1, 10, 1, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine A', 'No issues', 'esteira 1'),
    (1, 2, 10, 2, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine B', 'Minor issues', 'esteira 1'),
    (1, 3, 10, 3, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine C', 'No issues', 'esteira 1'),
    (1, 4, 10, 4, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine D', 'Minor issues', 'esteira 1'),
    (1, 5, 10, 5, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine E', 'No issues', 'esteira 1'),
    (1, 6, 10, 6, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine F', 'Minor issues', 'esteira 1'),
    (1, 1, 10, 1, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine A', 'No issues', 'esteira 1'),
    (1, 2, 10, 2, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine B', 'Minor issues', 'esteira 1'),
    (1, 3, 10, 3, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine C', 'No issues', 'esteira 1'),
    (1, 4, 10, 4, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine D', 'Minor issues', 'esteira 1'),
    (1, 5, 10, 5, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine E', 'No issues', 'esteira 1'),
    (1, 6, 10, 6, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine F', 'Minor issues', 'esteira 1'),
    (2, 1, 11, 1, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine A', 'No issues', 'esteira 2'),
    (2, 2, 11, 2, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine B', 'Minor issues', 'esteira 2'),
    (2, 3, 11, 3, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine C', 'No issues', 'esteira 2'),
    (2, 4, 11, 4, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine D', 'Minor issues', 'esteira 2'),
    (2, 5, 11, 5, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine E', 'No issues', 'esteira 2'),
    (2, 6, 11, 6, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine F', 'Minor issues', 'esteira 2'),	
    (3, 1, 12, 1, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine A', 'No issues', 'esteira 2'),
    (3, 2, 12, 2, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine B', 'Minor issues', 'esteira 2'),
    (3, 3, 12, 3, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine C', 'No issues', 'esteira 2'),
    (3, 4, 12, 4, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine D', 'Minor issues', 'esteira 2'),
    (3, 5, 12, 5, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine E', 'No issues', 'esteira 2'),
    (3, 6, 12, 6, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine F', 'Minor issues', 'esteira 2');

-- insert into occurrences_of_production_stages	
INSERT INTO "occurrences_of_production_stages" ("occurrence_id", "description", "observation", "stage_occurred_id")
VALUES 
    (1, 'Problema na Linha de Produção', 'Houve um problema na linha de produção que causou um atraso.',  1),
    (2, 'Manutenção Necessária', 'Manutenção programada é necessária para o equipamento.', 2),
    (3, 'Falha na Verificação de Qualidade', 'A verificação de qualidade falhou para o lote #123.', 3),
    (4, 'Novo Equipamento Instalado', 'Novo equipamento foi instalado na linha de produção.', 4),
    (5, 'Incidente de Segurança', 'Ocorreu um incidente de segurança no armazém.', 5);

-- Insert into compositions
INSERT INTO "compositions" ("final_product", "description")
VALUES 
(8,'batata frita'),
(9,'cenoura cubinhos'),
(10,'aipim descascado'),
(11,'mirtilos selecionados'),
(12,'laranja fatiada'),
(13,'mix de verduras'),
(14,'suco natural de uva');	

-- Insert into compositions_items
INSERT INTO "composition_items" ("composition_id", "sequence", "raw_product", "quantity")
values
(1,1,1,20),
(2,1,2,20),
(3,1,3,20),
(4,1,4,20),
(5,1,5,20),
(6,1,6,20),
(7,1,7,20);
