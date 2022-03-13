import express from "express";
import Prisma, { PrismaClient } from "@prisma/client";

const functions = {
    isExpressDefined: function () {
        return express();
    },
    isPrismaDefined: function () {
        return new PrismaClient();
    }
}

module.exports = functions;