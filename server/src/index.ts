import express, { Express, Request, Response } from "express";
import { Server } from "@hocuspocus/server";
import expressWebsockets from "express-ws";
import dotenv from "dotenv";
import { Database } from "@hocuspocus/extension-database";
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient();

dotenv.config();

const wsServer = Server.configure({
  port: 8080,
  extensions: [
    new Database({
      fetch: async ({ documentName }) : Promise<Uint8Array | null> => {
        try {
          // fetch the exact document with the document name
          const data = await prisma.document.findFirst({
            where: {
              // id: 'clwi3uc4v0000za6g8m2drvpa'
              // id: 'clwjhfuqs0000kt8iv5n6upq9'
              // id: 'clwiyqxk70000i9vzilpu11it'
             id: 'clwjiy9hv000072y1i9v0rxx7'
            }
          })
          console.log(data, "documents");
          const documents = (new Uint8Array(data?.document as ArrayBuffer))
          return documents;
        } catch(error) {
          console.log('an error has occured!!')
          return null;
        }
      },
      
      store: async ({ documentName, state }) => {
        console.log(state)
        const createDocument = await prisma.document.upsert({
          // where: { id: 'clwi3uc4v0000za6g8m2drvpa' },
          where: { id: 'clwjiy9hv000072y1i9v0rxx7' },

          create: {
            document: state
          },
          update: {
            document: state
          }
        })
        // const createDocument = await prisma.document.create({
        //   data: {
        //     document: state
        //   }
        // })
        console.log(createDocument, "document created!!!!")
      }
    })
  ],
});

const { app } = expressWebsockets(express());
const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server is working");
})

app.ws("/", (websocket, request) => {
  const context = {
    user: {
      id: 1234,
      name: "Jane",
    },
  };

  console.log(request)
  wsServer.handleConnection(websocket, request, context);
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});