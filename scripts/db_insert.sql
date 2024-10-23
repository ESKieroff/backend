-- insert into users 
-- o password dos usuários é "cpplanta"
INSERT INTO "users" ("username", "email", "password", "first_name", "last_name", "role", "gender")
VALUES 
	('root', 'cp.planta@gmail.com', '$2b$10$R6pcILCI6LhYW4wd3UjDNOjOD9Rg5nCxp4ZZmMUrfRD0UGb4rrViC', 'CP', 'Planta', 'ROOT', 'MALE'),
	('Cassio', 'cassio@gmail.com', '$2b$10$R6pcILCI6LhYW4wd3UjDNOjOD9Rg5nCxp4ZZmMUrfRD0UGb4rrViC', 'Cassio', 'Santos', 'ROOT', 'MALE'),
	('Roberto', 'fulano@gmail.com', '$2b$10$R6pcILCI6LhYW4wd3UjDNOjOD9Rg5nCxp4ZZmMUrfRD0UGb4rrViC', 'Roberto', 'Da Silva', 'DEMO', 'MALE'),
	('Ana', 'ana@gmail.com', '$2b$10$R6pcILCI6LhYW4wd3UjDNOjOD9Rg5nCxp4ZZmMUrfRD0UGb4rrViC', 'Ana', 'Oliveira', 'DEMO', 'FEMALE'),
	('Maria', 'maria@gmail.com', '$2b$10$R6pcILCI6LhYW4wd3UjDNOjOD9Rg5nCxp4ZZmMUrfRD0UGb4rrViC', 'Maria', 'Silva', 'DEMO', 'FEMALE');


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
INSERT INTO "persons" ("name", "type")
VALUES 
	('CP-Planta', 'SUPPLIER'),
	('Machado Assis', 'SUPPLIER'),
	('Clarice Lispector', 'SUPPLIER'),
	('Restaurante Sebastião Costa', 'COSTUMER'),	
	('Fruteirão do Tio Mário', 'COSTUMER'),
	('Restaurante e Lancheria Milano', 'COSTUMER');
	
-- Insert into categories
INSERT INTO "categories" ("description")
VALUES 
    ('CP-Planta'),
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

-- insert into production_order_steps
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


-- Primeiro, insira os grupos sem dependências
INSERT INTO "groups" ("description", "father_id")
VALUES 
	('Grupo A', NULL),
	('Grupo B', NULL),
	('Grupo C', NULL),
	('Grupo D', NULL),
	('Grupo E', NULL);

-- Agora, insira os grupos com referência ao father_id já existente
INSERT INTO "groups" ("description", "father_id")
VALUES 
	('Batata Branca', (SELECT id FROM "groups" WHERE description = 'Grupo A')),
	('Tomate Cereja', (SELECT id FROM "groups" WHERE description = 'Grupo A')),
	('Cebola Roxa', (SELECT id FROM "groups" WHERE description = 'Grupo A')),
	('Couve Mirim', (SELECT id FROM "groups" WHERE description = 'Grupo A')),
	('Melancia Gigante', (SELECT id FROM "groups" WHERE description = 'Grupo A'));

-- produtos
do $$
	DECLARE
	category UUID;
	group_var UUID;
	supplier UUID;
BEGIN
	select id into category from categories where description = 'CP-Planta';
	select id into group_var from groups where description = 'CP-Planta';
    select id into supplier from persons where name = 'CP-Planta';

	-- Insert into products
	INSERT INTO "products" ("description", "code", "sku", "origin", "unit_measure", "category_id", "group_id", "supplier_id", "nutritional_info")
	VALUES 
	('batata branca', 'CODE001', 'SKU001', 'RAW_MATERIAL', 'KG', category, group_var, supplier,
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
	('cenoura', 'CODE002', 'SKU015', 'RAW_MATERIAL', 'KG', category, group_var, supplier,
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
	('aipim', 'CODE003', 'SKU002', 'RAW_MATERIAL', 'KG', category, group_var, supplier, 
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
	('mirtilo', 'CODE004', 'SKU003', 'RAW_MATERIAL', 'KG', category, group_var, supplier,
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
	('laranja', 'CODE005', 'SKU004', 'RAW_MATERIAL', 'KG', category, group_var, supplier,
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
	('couve', 'CODE006', 'SKU005', 'RAW_MATERIAL', 'KG', category, group_var, supplier,
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
	('uva', 'CODE007', 'SKU006', 'RAW_MATERIAL', 'KG', category, group_var, supplier, Null),
	('Batata cubinhos', 'CODE016', 'SKU007', 'MADE', 'KG', category, group_var, supplier, Null),
	('cenoura cubinhos', 'CODE008', 'SKU008', 'MADE', 'KG', category, group_var, supplier, Null),
	('Mandioca descascada', 'CODE009', 'SKU009', 'MADE', 'KG', category, group_var, supplier, Null),
	('mirtilos selecionados', 'CODE010', 'SKU010', 'MADE', 'KG', category, group_var, supplier, Null),
	('laranja descascada', 'CODE011', 'SKU011', 'MADE', 'KG', category, group_var, supplier, Null),
	('mix de verduras', 'CODE012', 'SKU012', 'MADE', 'KG', category, group_var, supplier, Null),
	('suco natural de uva', 'CODE013', 'SKU013', 'MADE', 'KG', category, group_var, supplier, Null);
END $$;

do $$
	DECLARE
	product1 UUID;
	product2 UUID;
	product3 UUID;
	product4 UUID;
	product5 UUID;
	product6 UUID;
	product7 UUID;
	product8 UUID;
	product9 UUID;
	product10 UUID;
	product11 UUID;
	product12 UUID;
	product13 UUID;	
BEGIN

	select id into product1 from products where code = 'CODE001';
	select id into product2 from products where code = 'CODE002';
	select id into product3 from products where code = 'CODE003';
	select id into product4 from products where code = 'CODE004';
	select id into product5 from products where code = 'CODE005';
	select id into product6 from products where code = 'CODE006';
	select id into product7 from products where code = 'CODE007';
	select id into product8 from products where code = 'CODE008';
	select id into product9 from products where code = 'CODE009';
	select id into product10 from products where code = 'CODE010';
	select id into product11 from products where code = 'CODE011';
	select id into product12 from products where code = 'CODE012';
	select id into product13 from products where code = 'CODE013';		
	
-- Insert into prices
INSERT INTO "prices" ("product_id", "price", "type", "is_current")
VALUES 
    (product1, 1.0, 'COST',FALSE),
    (product1, 1.5, 'COST',FALSE),
    (product1, 2.0, 'COST',FALSE),
    (product1, 3.0, 'COST',FALSE),
    (product1, 4.0, 'COST',TRUE),
    (product2, 2.0, 'COST',FALSE),
    (product2, 10.0, 'COST',TRUE),
    (product2, 13.0, 'COST',FALSE),
    (product2, 15.0, 'COST',TRUE),
    (product4, 21.0, 'COST',FALSE),
    (product4, 20.0, 'COST',TRUE),
    (product5, 18.0, 'COST',TRUE),
    (product6, 14.0, 'COST',TRUE),
    (product7, 11.0, 'COST',TRUE),
    (product8, 7.0, 'COST',TRUE),	 
    (product9, 9.0, 'COST',TRUE),
    (product10, 8.0, 'COST',TRUE),
    (product11, 12.0, 'COST',TRUE),
    (product12, 3.0, 'COST',TRUE),
    (product13, 4.0, 'COST',TRUE),
    (product8, 7.0,'SALE',TRUE),
    (product9, 9.0,'SALE',TRUE),
    (product10, 8.0,'SALE',TRUE),
    (product11, 12.0,'SALE',TRUE),
    (product12, 3.0,'SALE',TRUE),
    (product13, 4.0,'SALE',TRUE);
END $$;

-- Insert into stock
INSERT INTO "stock" ("document_number", "document_date", "stock_moviment","document_type")
VALUES 
    ('NFE123', '2024-09-01 09:00:00', 'INPUT','nota entrada'),
    ('OP124', '2024-09-02 10:00:00', 'INPUT', 'ordem de produção'),
    ('DOC123', '2024-09-01 09:00:00', 'OUTPUT','documento entrada'),
    ('NFE124', '2024-09-02 10:00:00', 'OUTPUT','documento saida'),
    ('1001','2024-09-02 10:00:00', 'RESERVED','reserva producao');

do $$
DECLARE
	NFE123 UUID;
	OP124 UUID;
	DOC123 UUID;
	NFE124 UUID;
	NF1001 UUID;
	product1 UUID;
	product2 UUID;
	product3 UUID;
	product4 UUID;
	product5 UUID;
	product6 UUID;
	product7 UUID;
	product8 UUID;
	product9 UUID;
	product10 UUID;
	product11 UUID;
	product12 UUID;
	product13 UUID;	
	localization UUID;
BEGIN
	-- Selecionando os IDs de documentos e produtos
	SELECT id INTO NFE123 FROM stock WHERE document_number = 'NFE123';
	SELECT id INTO OP124 FROM stock WHERE document_number = 'OP124';
	SELECT id INTO DOC123 FROM stock WHERE document_number = 'DOC123';
	SELECT id INTO NFE124 FROM stock WHERE document_number = 'NFE124';
	SELECT id INTO NF1001 FROM stock WHERE document_number = '1001';
	SELECT id INTO product1 FROM products WHERE code = 'CODE001';
	SELECT id INTO product2 FROM products WHERE code = 'CODE002';
	SELECT id INTO product3 FROM products WHERE code = 'CODE003';
	SELECT id INTO product4 FROM products WHERE code = 'CODE004';
	SELECT id INTO product5 FROM products WHERE code = 'CODE005';
	SELECT id INTO product6 FROM products WHERE code = 'CODE006';
	SELECT id INTO product7 FROM products WHERE code = 'CODE007';
	SELECT id INTO product8 FROM products WHERE code = 'CODE008';
	SELECT id INTO product9 FROM products WHERE code = 'CODE009';
	SELECT id INTO product10 FROM products WHERE code = 'CODE010';
	SELECT id INTO product11 FROM products WHERE code = 'CODE011';
	SELECT id INTO product12 FROM products WHERE code = 'CODE012';
	SELECT id INTO product13 FROM products WHERE code = 'CODE013';
	SELECT id INTO localization FROM stock_location WHERE description = 'Câmara Fria A';

	-- Inserindo os itens no estoque
	INSERT INTO stock_items (stock_id, sequence, product_id, quantity, unit_price, total_price, lote, expiration, stock_location_id)
	VALUES 
		(NFE123, 1, product1, 100.0, 10.0, 1000.0, 'LoteA123', '2024-12-31 23:59:59', localization),
		(NFE123, 2, product2, 100.0, 10.0, 1000.0, 'LoteC123', '2024-12-31 23:59:59', localization),
		(NFE123, 3, product3, 200.0, 20.0, 4000.0, 'LoteD456', '2024-12-15 23:59:59', localization),
		(NFE123, 4, product4, 100.0, 10.0, 1000.0, 'LoteE123', '2024-12-31 23:59:59', localization),
		(NFE123, 5, product5, 100.0, 10.0, 1000.0, 'LoteF123', '2024-12-31 23:59:59', localization),
		(NFE123, 6, product6, 200.0, 20.0, 4000.0, 'LoteG456', '2024-12-15 23:59:59', localization),
		(NFE123, 7, product7, 100.0, 10.0, 1000.0, 'LoteA123', '2024-12-31 23:59:59', localization),
		(NFE123, 8, product8, 100.0, 10.0, 1000.0, 'LoteC123', '2024-12-31 23:59:59', localization),
		(DOC123, 1, product1, 20.0, 10.0, 1000.0, 'LoteA123', '2024-12-31 23:59:59', localization),
		(DOC123, 2, product2, 20.0, 10.0, 1000.0, 'LoteC123', '2024-12-31 23:59:59', localization),
		(DOC123, 3, product3, 20.0, 20.0, 4000.0, 'LoteD456', '2024-12-15 23:59:59', localization),
		(DOC123, 4, product4, 10.0, 10.0, 1000.0, 'LoteE123', '2024-12-31 23:59:59', localization),
		(DOC123, 5, product5, 10.0, 10.0, 1000.0, 'LoteF123', '2024-12-31 23:59:59', localization),
		(DOC123, 6, product6, 20.0, 20.0, 4000.0, 'LoteG456', '2024-12-15 23:59:59', localization),
		(DOC123, 7, product7, 10.0, 10.0, 1000.0, 'LoteA123', '2024-12-31 23:59:59', localization),
		(DOC123, 8, product8, 10.0, 10.0, 1000.0, 'LoteC123', '2024-12-31 23:59:59', localization),
		(OP124, 1, product9, 100.0, 10.0, 1000.0, 'LoteKK123', '2024-12-31 23:59:59', localization),
		(OP124, 2, product10, 100.0, 10.0, 1000.0, 'LoteTY123', '2024-12-31 23:59:59', localization),
		(OP124, 3, product11, 200.0, 20.0, 4000.0, 'LoteER56', '2024-12-15 23:59:59', localization),
		(OP124, 4, product12, 100.0, 10.0, 1000.0, 'LoteOI123', '2024-12-31 23:59:59', localization),
		(OP124, 5, product13, 100.0, 10.0, 1000.0, 'LoteABC123', '2024-12-31 23:59:59', localization),
		(NFE124, 1, product9, 10.0, 10.0, 1000.0, 'LoteKK123', '2024-12-31 23:59:59', localization),
		(NFE124, 2, product10, 10.0, 10.0, 1000.0, 'LoteTY123', '2024-12-31 23:59:59', localization),
		(NFE124, 3, product11, 20.0, 20.0, 4000.0, 'LoteER56', '2024-12-15 23:59:59', localization),
		(NFE124, 4, product12, 10.0, 10.0, 1000.0, 'LoteOI123', '2024-12-31 23:59:59', localization),
		(NFE124, 5, product13, 10.0, 10.0, 1000.0, 'LoteABC123', '2024-12-31 23:59:59', localization),
		(NF1001, 1, product13, 10.0, 10.0, 1000.0, 'LOTE-TESTE', '2024-12-31 23:59:59', localization);
END $$;

-- Insert into compositions
DO $$
    DECLARE
    product8 UUID;
    product9 UUID;
    product10 UUID;
    product11 UUID;
    product12 UUID;
    product13 UUID;
BEGIN
        SELECT id INTO product8 FROM products WHERE code = 'CODE008';
        SELECT id INTO product9 FROM products WHERE code = 'CODE009';
        SELECT id INTO product10 FROM products WHERE code = 'CODE010';
        SELECT id INTO product11 FROM products WHERE code = 'CODE011';
        SELECT id INTO product12 FROM products WHERE code = 'CODE012';
        SELECT id INTO product13 FROM products WHERE code = 'CODE013';

-- Insert into compositions
INSERT INTO "compositions" ("product_id", "description")
VALUES 
    (product8,'batata frita'),
    (product9,'cenoura cubinhos'),
    (product10,'aipim descascado'),
    (product11,'mirtilos selecionados'),
    (product12,'laranja fatiada'),
    (product13,'mix de verduras');
END $$;

-- Insert into composition_items
DO $$
    DECLARE
        composition1 UUID;
        composition2 UUID;
        composition3 UUID;
        composition4 UUID;
        composition5 UUID;
        composition6 UUID;
        raw_product_1 UUID;
        raw_product_2 UUID;
        raw_product_3 UUID;
        raw_product_4 UUID;
        raw_product_5 UUID;
        raw_product_6 UUID;

BEGIN
        -- Seleciona os IDs das composições
        SELECT id INTO composition1 FROM compositions WHERE description = 'batata frita' LIMIT 1;
        SELECT id INTO composition2 FROM compositions WHERE description = 'cenoura cubinhos' LIMIT 1;
        SELECT id INTO composition3 FROM compositions WHERE description = 'aipim descascado' LIMIT 1;
        SELECT id INTO composition4 FROM compositions WHERE description = 'mirtilos selecionados' LIMIT 1;
        SELECT id INTO composition5 FROM compositions WHERE description = 'laranja fatiada' LIMIT 1;
        SELECT id INTO composition6 FROM compositions WHERE description = 'mix de verduras' LIMIT 1;

        -- Seleciona os IDs dos produtos brutos
        SELECT id INTO raw_product_1 FROM products WHERE code = 'CODE001' LIMIT 1;
        SELECT id INTO raw_product_2 FROM products WHERE code = 'CODE002' LIMIT 1;
        SELECT id INTO raw_product_3 FROM products WHERE code = 'CODE003' LIMIT 1;
        SELECT id INTO raw_product_4 FROM products WHERE code = 'CODE004' LIMIT 1;
        SELECT id INTO raw_product_5 FROM products WHERE code = 'CODE005' LIMIT 1;
        SELECT id INTO raw_product_6 FROM products WHERE code = 'CODE006' LIMIT 1;

        -- Insere os itens de composição na tabela composition_items
        INSERT INTO "composition_items" ("composition_id", "sequence", "product_id", "quantity")
        VALUES 
            (composition1, 1, raw_product_1, 20),
            (composition2, 1, raw_product_2, 20),
            (composition3, 1, raw_product_3, 20),
            (composition4, 1, raw_product_4, 20),
            (composition5, 1, raw_product_5, 20),
            (composition6, 1, raw_product_6, 20);
END $$;


-- Insert into production_orders
INSERT INTO "production_orders" ("number","description", "production_date","Production_Status")
VALUES 
    (1,'Production A','2024-12-31 23:59:59', 'CREATED'),
    (2,'Production B','2024-12-15 23:59:59','SCHEDULED'),
    (3,'Production C','2024-12-31 23:59:59', 'IN_PROGRESS'),
    (4,'Production D','2024-12-15 23:59:59','SCHEDULED'),
    (5,'Production E','2024-12-31 23:59:59', 'OPEN');

-- Insert into production_orders_items
DO $$
    DECLARE
        prod_1 UUID;
        prod_2 UUID;
        prod_3 UUID;
        prod_4 UUID;
        prod_5 UUID;
        product_9 UUID;
        product_10 UUID;
        product_11 UUID;
        product_12 UUID;
        product_13 UUID;

    BEGIN
        -- Seleciona os IDs das produções
        SELECT id INTO prod_1 FROM production_orders WHERE description = 'Production A' LIMIT 1;
        SELECT id INTO prod_2 FROM production_orders WHERE description = 'Production B' LIMIT 1;
        SELECT id INTO prod_3 FROM production_orders WHERE description = 'Production C' LIMIT 1;
        SELECT id INTO prod_4 FROM production_orders WHERE description = 'Production D' LIMIT 1;
        SELECT id INTO prod_5 FROM production_orders WHERE description = 'Production E' LIMIT 1;

        -- Seleciona os IDs dos produtos
        SELECT id INTO product_9 FROM products WHERE code = 'CODE009' LIMIT 1;
        SELECT id INTO product_10 FROM products WHERE code = 'CODE010' LIMIT 1;
        SELECT id INTO product_11 FROM products WHERE code = 'CODE011' LIMIT 1;
        SELECT id INTO product_12 FROM products WHERE code = 'CODE012' LIMIT 1;
        SELECT id INTO product_13 FROM products WHERE code = 'CODE013' LIMIT 1;

        -- Insere os itens da ordem de produção
        INSERT INTO "production_orders_items" (
			"production_order_id", 
			"sequence", 
			"final_product_id", 
			"production_quantity_estimated", 
			"production_quantity_real", 
			"production_quantity_loss", 
			"lote", 
			"lote_expiration"
			)
        VALUES
            (prod_5, 5, product_9, 2000.0, 1900.0, 100.0, 'LoteABC123', '2024-12-15 23:59:59'),
            (prod_1, 1, product_10, 1000.0, 950.0, 50.0, 'LoteTY123', '2024-12-31 23:59:59'),
            (prod_2, 2, product_11, 2000.0, 1900.0, 100.0, 'LoteER56', '2024-12-15 23:59:59'),
            (prod_3, 3, product_12, 1000.0, 950.0, 50.0, 'LoteOI123', '2024-12-31 23:59:59'),
            (prod_4, 4, product_13, 2000.0, 1900.0, 100.0, 'LoteB456', '2024-12-15 23:59:59');
    END $$;

-- Insert into production_order_steps
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
    
 

-- Insert into production_steps_progress
DO $$
    DECLARE
    production_1 UUID;
    production_2 UUID;
    production_3 UUID;
    step_1 UUID;
    step_2 UUID;
    step_3 UUID;
    step_4 UUID;
    step_5 UUID;
    step_6 UUID;
    step_7 UUID;
    step_8 UUID;
    step_9 UUID;
    raw_1 UUID;
    raw_2 UUID;
    raw_3 UUID;

BEGIN
    select id into production_1 from production_orders where number = 1;
    select id into production_2 from production_orders where number = 2; 
    select id into production_3 from production_orders where number = 3;
    select id into raw_1 from products where code = 'CODE001';
    select id into raw_2 from products where code = 'CODE002';
    select id into raw_3 from products where code = 'CODE003';
    select id into step_1 from production_order_steps where description = 'Descascamento';
    select id into step_2 from production_order_steps where description = 'Seleção';
    select id into step_3 from production_order_steps where description = 'Desfolhamento';
    select id into step_4 from production_order_steps where description = 'Embalagem';
    select id into step_5 from production_order_steps where description = 'Seleção de Qualidade';
    select id into step_6 from production_order_steps where description = 'Higienização';
    select id into step_7 from production_order_steps where description = 'Lavagem';
    select id into step_8 from production_order_steps where description = 'Seleção de Tamanho';
    select id into step_9 from production_order_steps where description = 'Corte';
END $$;


do $$
DECLARE
    production_1 UUID;
    production_2 UUID;
    production_3 UUID;
    step_1 UUID;
    step_2 UUID;
    step_3 UUID;
    step_4 UUID;
    step_5 UUID;
    step_6 UUID;
    raw_1 UUID;
    raw_2 UUID;
    raw_3 UUID;
BEGIN
    select id into production_1 from production_orders where number = 1;
    select id into production_2 from production_orders where number = 2;
    select id into production_3 from production_orders where number = 3;    
    select id into raw_1 from products where code = 'CODE001';
    select id into raw_2 from products where code = 'CODE002';
    select id into raw_3 from products where code = 'CODE003';
    select id into step_1 from production_order_steps where description = 'Descascamento';
    select id into step_2 from production_order_steps where description = 'Seleção';
    select id into step_3 from production_order_steps where description = 'Desfolhamento';
    select id into step_4 from production_order_steps where description = 'Embalagem';
    select id into step_5 from production_order_steps where description = 'Seleção de Qualidade';
    select id into step_6 from production_order_steps where description = 'Higienização';


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
	(production_1, step_1, raw_1, 1, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine A', 'No issues', '1'),
    (production_1, step_2, raw_1, 2, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine B', 'Minor issues', '1'),
    (production_1, step_3, raw_1, 3, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine C', 'No issues', '1'),
    (production_1, step_4, raw_1, 4, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine D', 'Minor issues', '1'),
    (production_1, step_5, raw_1, 5, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine E', 'No issues', '1'),
    (production_1, step_6, raw_1, 6, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine F', 'Minor issues', '1'),
    (production_1, step_1, raw_1, 1, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine A', 'No issues', '1'),
    (production_1, step_2, raw_1, 2, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine B', 'Minor issues', '1'),
    (production_1, step_3, raw_1, 3, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine C', 'No issues', '1'),
    (production_1, step_4, raw_1, 4, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine D', 'Minor issues', '1'),
    (production_1, step_5, raw_1, 5, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine E', 'No issues', '1'),
    (production_1, step_6, raw_1, 6, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine F', 'Minor issues', '1'),
    (production_2, step_1, raw_2, 1, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine A', 'No issues', '2'),
    (production_2, step_2, raw_2, 2, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine B', 'Minor issues', '2'),
    (production_2, step_3, raw_2, 3, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine C', 'No issues', '2'),
    (production_2, step_4, raw_2, 4, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine D', 'Minor issues', '2'),
    (production_2, step_5, raw_2, 5, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine E', 'No issues', '2'),
    (production_2, step_6, raw_2, 6, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine F', 'Minor issues', '2'),	
    (production_3, step_1, raw_3, 1, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine A', 'No issues', '2'),
    (production_3, step_2, raw_3, 2, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine B', 'Minor issues', '2'),
    (production_3, step_3, raw_3, 3, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine C', 'No issues', '2'),
    (production_3, step_4, raw_3, 4, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine D', 'Minor issues', '2'),
    (production_3, step_5, raw_3, 5, '2024-09-01 08:00:00', '2024-09-01 10:00:00', 120.0, 1000.0, 950.0, 50.0, 'Machine E', 'No issues', '2'),
    (production_3, step_6, raw_3, 6, '2024-09-02 08:00:00', '2024-09-02 12:00:00', 240.0, 2000.0, 1900.0, 100.0, 'Machine F', 'Minor issues', '2');
END $$;

-- Insert into ocurrences
INSERT INTO "ocurrences" ("description")
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

-- insert into ocurrences_of_production_stages
DO $$
    DECLARE
	ocurr_1 UUID;
	ocurr_2 UUID;
	ocurr_3 UUID;
	ocurr_4 UUID;
	ocurr_5 UUID;
	stage_1 UUID;
	stage_2 UUID;
	stage_3 UUID;
	stage_4 UUID;

BEGIN
    select id into ocurr_1 from ocurrences where description = 'Problema na Linha de Produção';
    select id into ocurr_2 from ocurrences where description = 'Manutenção Necessária';
    select id into ocurr_3 from ocurrences where description = 'Falha na Verificação de Qualidade';
    select id into ocurr_4 from ocurrences where description = 'Novo Equipamento Instalado';
    select id into ocurr_5 from ocurrences where description = 'Incidente de Segurança';
    select distinct(id) into stage_1 from production_steps_progress where sequence = 1 LIMIT 1 OFFSET 0;
    select distinct(id) into stage_2 from production_steps_progress where sequence = 1 LIMIT 1 OFFSET 1;
    select distinct(id) into stage_3 from production_steps_progress where sequence = 1 LIMIT 1 OFFSET 2;
    select distinct(id) into stage_4 from production_steps_progress where sequence = 1 LIMIT 1 OFFSET 3;
-- insert into ocurrences_of_production_stages	
INSERT INTO "ocurrences_of_production_stages" ("ocurrence_id", "description", "observation", "stage_ocurred_id")
VALUES 
    (ocurr_1, 'Problema na Linha de Produção', 'Houve um problema na linha de produção que causou um atraso.', stage_1),
    (ocurr_2, 'Manutenção Necessária', 'Manutenção programada é necessária para o equipamento.', stage_2),
    (ocurr_3, 'Falha na Verificação de Qualidade', 'A verificação de qualidade falhou para o lote #123.', stage_3),
    (ocurr_4, 'Novo Equipamento Instalado', 'Novo equipamento foi instalado na linha de produção.', stage_4),
    (ocurr_5, 'Incidente de Segurança', 'Ocorreu um incidente de segurança no armazém.', stage_4);
END $$;
