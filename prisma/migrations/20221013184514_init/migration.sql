-- CreateTable
CREATE TABLE "Planet" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(225) NOT NULL,
    "description" TEXT,
    "diameter" INTEGER NOT NULL,
    "moons" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updetedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Planet_pkey" PRIMARY KEY ("id")
);
