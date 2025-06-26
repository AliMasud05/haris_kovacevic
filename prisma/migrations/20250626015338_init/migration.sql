/*
  Warnings:

  - Added the required column `classes` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseType` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `demoVideo` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitle` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumnail` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SkillLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('PAID', 'FREE');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "classes" TEXT NOT NULL,
ADD COLUMN     "courseType" "CourseType" NOT NULL,
ADD COLUMN     "demoVideo" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "level" "SkillLevel" NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "subtitle" TEXT NOT NULL,
ADD COLUMN     "thumnail" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);
