/*
  Warnings:

  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `composition_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `compositions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ocurrences` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `persons` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `production` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `production_item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `production_steps` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `production_work` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stock_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stock_location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "composition_items" DROP CONSTRAINT "composition_items_composition_id_fkey";

-- DropForeignKey
ALTER TABLE "composition_items" DROP CONSTRAINT "composition_items_product_id_fkey";

-- DropForeignKey
ALTER TABLE "compositions" DROP CONSTRAINT "compositions_product_id_fkey";

-- DropForeignKey
ALTER TABLE "groups" DROP CONSTRAINT "groups_father_id_fkey";

-- DropForeignKey
ALTER TABLE "prices" DROP CONSTRAINT "prices_product_id_fkey";

-- DropForeignKey
ALTER TABLE "production" DROP CONSTRAINT "final_product_fkey";

-- DropForeignKey
ALTER TABLE "production_item" DROP CONSTRAINT "production_item_product_id_fkey";

-- DropForeignKey
ALTER TABLE "production_item" DROP CONSTRAINT "production_item_production_id_fkey";

-- DropForeignKey
ALTER TABLE "production_work" DROP CONSTRAINT "production_work_production_id_fkey";

-- DropForeignKey
ALTER TABLE "production_work" DROP CONSTRAINT "production_work_raw_product_id_fkey";

-- DropForeignKey
ALTER TABLE "production_work" DROP CONSTRAINT "production_work_step_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_group_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "stock_items" DROP CONSTRAINT "stock_items_costumers_fkey";

-- DropForeignKey
ALTER TABLE "stock_items" DROP CONSTRAINT "stock_items_persons_fkey";

-- DropForeignKey
ALTER TABLE "stock_items" DROP CONSTRAINT "stock_items_product_id_fkey";

-- DropForeignKey
ALTER TABLE "stock_items" DROP CONSTRAINT "stock_items_stock_id_fkey";

-- DropForeignKey
ALTER TABLE "stock_items" DROP CONSTRAINT "stock_items_stock_location_id_fkey";

-- DropTable
DROP TABLE "categories";

-- DropTable
DROP TABLE "composition_items";

-- DropTable
DROP TABLE "compositions";

-- DropTable
DROP TABLE "groups";

-- DropTable
DROP TABLE "ocurrences";

-- DropTable
DROP TABLE "persons";

-- DropTable
DROP TABLE "prices";

-- DropTable
DROP TABLE "production";

-- DropTable
DROP TABLE "production_item";

-- DropTable
DROP TABLE "production_steps";

-- DropTable
DROP TABLE "production_work";

-- DropTable
DROP TABLE "products";

-- DropTable
DROP TABLE "stock";

-- DropTable
DROP TABLE "stock_items";

-- DropTable
DROP TABLE "stock_location";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "Origin";

-- DropEnum
DROP TYPE "Person_Type";

-- DropEnum
DROP TYPE "Price_Type";

-- DropEnum
DROP TYPE "Production_Status";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "Stock_Moviment";

-- DropEnum
DROP TYPE "Unit_Measure";

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProdutoFinal" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "unidade_medida" TEXT NOT NULL,
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "ProdutoFinal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MateriaPrima" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "unidade_medida" TEXT NOT NULL,
    "preco_custo" DOUBLE PRECISION NOT NULL,
    "imagem" TEXT,
    "categoriaId" INTEGER NOT NULL,
    "produtoFinalId" INTEGER NOT NULL,

    CONSTRAINT "MateriaPrima_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoteMateria" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "quantidade_inicial" DOUBLE PRECISION NOT NULL,
    "quantidade_atual" DOUBLE PRECISION NOT NULL,
    "data_entrada" TIMESTAMP(3) NOT NULL,
    "fornecedor" TEXT NOT NULL,
    "materiaPrimaId" INTEGER NOT NULL,
    "localId" INTEGER NOT NULL,

    CONSTRAINT "LoteMateria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Local" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Local_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoteProduto" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "imagem" TEXT,
    "produtoId" INTEGER NOT NULL,
    "localId" INTEGER NOT NULL,
    "ordemId" INTEGER,

    CONSTRAINT "LoteProduto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ordem" (
    "id" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "data_ordem" TIMESTAMP(3) NOT NULL,
    "quantidade_esperada" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "produtoFinalId" INTEGER NOT NULL,
    "loteMateriaId" INTEGER NOT NULL,

    CONSTRAINT "Ordem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Etapa" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "usuarioId" INTEGER,

    CONSTRAINT "Etapa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EtapaOrdem" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "quantidade_inicial" DOUBLE PRECISION NOT NULL,
    "quantidade_final" DOUBLE PRECISION NOT NULL,
    "ordemId" INTEGER NOT NULL,
    "etapaId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "EtapaOrdem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ocorrencia" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "data_ocorrencia" TIMESTAMP(3) NOT NULL,
    "imagem" TEXT,
    "etapaOrdemId" INTEGER NOT NULL,

    CONSTRAINT "Ocorrencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProdutoFinal" ADD CONSTRAINT "ProdutoFinal_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaPrima" ADD CONSTRAINT "MateriaPrima_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaPrima" ADD CONSTRAINT "MateriaPrima_produtoFinalId_fkey" FOREIGN KEY ("produtoFinalId") REFERENCES "ProdutoFinal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoteMateria" ADD CONSTRAINT "LoteMateria_materiaPrimaId_fkey" FOREIGN KEY ("materiaPrimaId") REFERENCES "MateriaPrima"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoteMateria" ADD CONSTRAINT "LoteMateria_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Local"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoteProduto" ADD CONSTRAINT "LoteProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "ProdutoFinal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoteProduto" ADD CONSTRAINT "LoteProduto_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Local"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoteProduto" ADD CONSTRAINT "LoteProduto_ordemId_fkey" FOREIGN KEY ("ordemId") REFERENCES "Ordem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordem" ADD CONSTRAINT "Ordem_produtoFinalId_fkey" FOREIGN KEY ("produtoFinalId") REFERENCES "ProdutoFinal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordem" ADD CONSTRAINT "Ordem_loteMateriaId_fkey" FOREIGN KEY ("loteMateriaId") REFERENCES "LoteMateria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Etapa" ADD CONSTRAINT "Etapa_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "ProdutoFinal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Etapa" ADD CONSTRAINT "Etapa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtapaOrdem" ADD CONSTRAINT "EtapaOrdem_ordemId_fkey" FOREIGN KEY ("ordemId") REFERENCES "Ordem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtapaOrdem" ADD CONSTRAINT "EtapaOrdem_etapaId_fkey" FOREIGN KEY ("etapaId") REFERENCES "Etapa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtapaOrdem" ADD CONSTRAINT "EtapaOrdem_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ocorrencia" ADD CONSTRAINT "Ocorrencia_etapaOrdemId_fkey" FOREIGN KEY ("etapaOrdemId") REFERENCES "EtapaOrdem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
