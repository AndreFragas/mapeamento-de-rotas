-- CreateTable
CREATE TABLE "Endereco" (
    "id" SERIAL NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "numero" INTEGER,
    "rua" TEXT,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rota" (
    "id" SERIAL NOT NULL,
    "origemId" INTEGER NOT NULL,
    "destinoId" INTEGER NOT NULL,
    "distancia" DOUBLE PRECISION NOT NULL,
    "tempo" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Rota_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rota" ADD CONSTRAINT "Rota_origemId_fkey" FOREIGN KEY ("origemId") REFERENCES "Endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rota" ADD CONSTRAINT "Rota_destinoId_fkey" FOREIGN KEY ("destinoId") REFERENCES "Endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
