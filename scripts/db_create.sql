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
    "data_entrada" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    "data_ordem" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    "data_ocorrencia" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
ALTER TABLE "LoteMateria" ADD CONSTRAINT "LoteMateria_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Local"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoteMateria" ADD CONSTRAINT "LoteMateria_materiaPrimaId_fkey" FOREIGN KEY ("materiaPrimaId") REFERENCES "MateriaPrima"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoteProduto" ADD CONSTRAINT "LoteProduto_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Local"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoteProduto" ADD CONSTRAINT "LoteProduto_ordemId_fkey" FOREIGN KEY ("ordemId") REFERENCES "Ordem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoteProduto" ADD CONSTRAINT "LoteProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "ProdutoFinal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordem" ADD CONSTRAINT "Ordem_loteMateriaId_fkey" FOREIGN KEY ("loteMateriaId") REFERENCES "LoteMateria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordem" ADD CONSTRAINT "Ordem_produtoFinalId_fkey" FOREIGN KEY ("produtoFinalId") REFERENCES "ProdutoFinal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Etapa" ADD CONSTRAINT "Etapa_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "ProdutoFinal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Etapa" ADD CONSTRAINT "Etapa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtapaOrdem" ADD CONSTRAINT "EtapaOrdem_etapaId_fkey" FOREIGN KEY ("etapaId") REFERENCES "Etapa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtapaOrdem" ADD CONSTRAINT "EtapaOrdem_ordemId_fkey" FOREIGN KEY ("ordemId") REFERENCES "Ordem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EtapaOrdem" ADD CONSTRAINT "EtapaOrdem_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ocorrencia" ADD CONSTRAINT "Ocorrencia_etapaOrdemId_fkey" FOREIGN KEY ("etapaOrdemId") REFERENCES "EtapaOrdem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
