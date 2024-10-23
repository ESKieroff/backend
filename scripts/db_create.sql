-- Configure for UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DEFAULT', 'ROOT', 'ADMIN', 'DEMO', 'API', 'SYSTEM');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "Person_Type" AS ENUM ('COSTUMER', 'SUPPLIER');

-- CreateEnum
CREATE TYPE "Origin" AS ENUM ('RAW_MATERIAL', 'MADE', 'CONSUMABLE', 'OTHER');

-- CreateEnum
CREATE TYPE "Unit_Measure" AS ENUM ('UN', 'PC', 'PCT', 'ML', 'L', 'GR', 'KG', 'TON');

-- CreateEnum
CREATE TYPE "Price_Type" AS ENUM ('COST', 'SALE');

-- CreateEnum
CREATE TYPE "Stock_Moviment" AS ENUM ('INPUT', 'TRANSIT', 'OUTPUT', 'RESERVED', 'BALANCE', 'ADJUST', 'INVENTORY');

-- CreateEnum
CREATE TYPE "Production_Status" AS ENUM ('CREATED', 'SCHEDULED', 'OPEN', 'IN_PROGRESS', 'FINISHED', 'STOPPED', 'CANCELED');

-- CreateEnum
CREATE TYPE "Batch_Status" AS ENUM ('PENDING', 'USED', 'CANCELED');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'DEFAULT',
    "username" VARCHAR(255),
    "first_name" VARCHAR(255),
    "last_name" VARCHAR(255),
    "gender" "Gender" DEFAULT 'OTHER',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "persons" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "type" "Person_Type" NOT NULL DEFAULT 'SUPPLIER',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "description" VARCHAR(255) NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "sku" VARCHAR(255) NOT NULL,
    "unit_measure" "Unit_Measure" NOT NULL DEFAULT 'UN',
    "category_id" UUID NOT NULL,
    "group_id" UUID,
    "supplier_id" UUID,
    "nutritional_info" JSONB,
    "photo" BYTEA[],
    "active" BOOLEAN NOT NULL DEFAULT true,
    "origin" "Origin" NOT NULL DEFAULT 'RAW_MATERIAL',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "description" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prices" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "product_id" UUID NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "type" "Price_Type" NOT NULL DEFAULT 'COST',
    "is_current" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "document_number" VARCHAR(255) NOT NULL,
    "document_date" TIMESTAMP(6) NOT NULL,
    "stock_moviment" "Stock_Moviment" NOT NULL,
    "document_type" VARCHAR(255),
    "is_balance" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_location" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "description" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "stock_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_items" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "stock_id" UUID NOT NULL,
    "sequence" INTEGER NOT NULL,
    "product_id" UUID NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "lote" TEXT,
    "expiration" TIMESTAMP(3),
    "photo" BYTEA[],
    "supplier" UUID,
    "costumer" UUID,
    "stock_location_id" UUID,
    "observation" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "stock_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "production_orders" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "number" INTEGER NOT NULL,
    "description" VARCHAR(255),
    "production_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "production_line" VARCHAR(255),
    "Production_Status" "Production_Status" NOT NULL DEFAULT 'CREATED',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "production_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "production_orders_items" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "production_order_id" UUID NOT NULL,
    "sequence" INTEGER NOT NULL,
    "final_product_id" UUID NOT NULL,
    "production_quantity_estimated" DOUBLE PRECISION NOT NULL,
    "production_quantity_real" DOUBLE PRECISION NOT NULL,
    "production_quantity_loss" DOUBLE PRECISION NOT NULL,
    "lote" VARCHAR(255),
    "lote_expiration" TIMESTAMP(3),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "production_orders_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "production_order_steps" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "description" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "production_order_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "production_steps_progress" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "production_id" UUID NOT NULL,
    "step_id" UUID NOT NULL,
    "sequence" INTEGER NOT NULL,
    "raw_product_id" UUID NOT NULL,
    "start_time" TIMESTAMP(3),
    "end_time" TIMESTAMP(3),
    "total_time" DOUBLE PRECISION,
    "initial_quantity" DOUBLE PRECISION,
    "final_quantity" DOUBLE PRECISION,
    "quantity_loss" DOUBLE PRECISION,
    "machine" TEXT,
    "production_line" TEXT,
    "photo" BYTEA[],
    "observation" TEXT,
    "operator_username" TEXT,
    "ocurrences" JSON,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "production_steps_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ocurrences_of_production_stages" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "ocurrence_id" UUID NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "observation" TEXT,
    "photo" BYTEA[],
    "stage_ocurred_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "ocurrences_of_production_stages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ocurrences" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "description" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "ocurrences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "key" VARCHAR(255) NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batchs" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "batch" VARCHAR(255) NOT NULL,
    "status" "Batch_Status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "batchs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compositions" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "product_id" UUID NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "production_steps" JSON,

    CONSTRAINT "compositions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "composition_items" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "composition_id" UUID NOT NULL,
    "sequence" INTEGER NOT NULL,
    "product_id" UUID NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT,
    "updated_by" TEXT,

    CONSTRAINT "composition_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "description" VARCHAR(255) NOT NULL,
    "father_id" UUID,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_by" INTEGER,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "products_code_key" ON "products"("code");

-- CreateIndex
CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "categories_description_key" ON "categories"("description");

-- CreateIndex
CREATE UNIQUE INDEX "stock_document_number_key" ON "stock"("document_number");

-- CreateIndex
CREATE UNIQUE INDEX "production_orders_number_key" ON "production_orders"("number");

-- CreateIndex
CREATE UNIQUE INDEX "settings_key_key" ON "settings"("key");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "persons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_items" ADD CONSTRAINT "stock_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_items" ADD CONSTRAINT "stock_items_stock_id_fkey" FOREIGN KEY ("stock_id") REFERENCES "stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_items" ADD CONSTRAINT "stock_items_stock_location_id_fkey" FOREIGN KEY ("stock_location_id") REFERENCES "stock_location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_items" ADD CONSTRAINT "stock_items_supplier_fkey" FOREIGN KEY ("supplier") REFERENCES "persons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_items" ADD CONSTRAINT "stock_items_costumer_fkey" FOREIGN KEY ("costumer") REFERENCES "persons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_orders_items" ADD CONSTRAINT "final_product_fkey" FOREIGN KEY ("final_product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_orders_items" ADD CONSTRAINT "production_orders_items_production_order_id_fkey" FOREIGN KEY ("production_order_id") REFERENCES "production_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_steps_progress" ADD CONSTRAINT "production_steps_progress_operator_username_fkey" FOREIGN KEY ("operator_username") REFERENCES "users"("username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_steps_progress" ADD CONSTRAINT "production_steps_progress_production_id_fkey" FOREIGN KEY ("production_id") REFERENCES "production_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_steps_progress" ADD CONSTRAINT "production_steps_progress_raw_product_id_fkey" FOREIGN KEY ("raw_product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "production_steps_progress" ADD CONSTRAINT "production_steps_progress_step_id_fkey" FOREIGN KEY ("step_id") REFERENCES "production_order_steps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ocurrences_of_production_stages" ADD CONSTRAINT "ocurrences_of_production_stages_ocurrence_id_fkey" FOREIGN KEY ("ocurrence_id") REFERENCES "ocurrences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ocurrences_of_production_stages" ADD CONSTRAINT "ocurrences_of_production_stages_stage_ocurred_id_fkey" FOREIGN KEY ("stage_ocurred_id") REFERENCES "production_steps_progress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compositions" ADD CONSTRAINT "compositions_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "composition_items" ADD CONSTRAINT "composition_items_composition_id_fkey" FOREIGN KEY ("composition_id") REFERENCES "compositions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "composition_items" ADD CONSTRAINT "composition_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD CONSTRAINT "groups_father_id_fkey" FOREIGN KEY ("father_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;
