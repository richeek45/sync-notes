import express, { Express, Request, Response } from "express";
import { Server } from "@hocuspocus/server";
import expressWebsockets from "express-ws";
import dotenv from "dotenv";
import { Database } from "@hocuspocus/extension-database";
import { PrismaClient } from '@prisma/client'
import cors from 'cors';
import { Doc } from "yjs";

export const prisma = new PrismaClient();

dotenv.config();

const ydoc = new Doc();
const wsServer = Server.configure({
  port: 8080,
  extensions: [
    new Database({
      fetch: async ({ documentName }) : Promise<Uint8Array | null> => {
        console.log(documentName, 'fetch')
        try {
          // fetch the exact document with the document name
          const data = await prisma.document.findFirst({
            where: {
              title: documentName
            }
          })
          const documents = (new Uint8Array(data?.document as ArrayBuffer))
          if (documents.byteLength > 0) {
            return (documents);
          }
          return null;
        } catch(error) {
          console.log('an error has occured!!')
          return null;
        }
      },
      
      store: async ({ documentName, state, context }) => {
        console.log(documentName, context, 'store')
        const createDocument = await prisma.document.upsert({
          where: { 
            title: documentName 
          },
          create: {
            title: documentName,
            document: state
          },
          update: {
            title: documentName,
            document: state
          }
        })

        console.log(createDocument, "document created!!!!")
      }
    })
  ],
});

const { app } = expressWebsockets(express());
const port = process.env.PORT || 8080;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server is working");
})

app.get("/allDocs", async (req: Request, res: Response) => {
  const allDocs = await prisma.document.findMany({});
  res.json(allDocs);
})

app.ws("/", (websocket, request) => {
  const context = {
    user: {
      id: 1234,
      name: "Jane",
    },
  };

  console.log('new websocket connection')
  wsServer.handleConnection(websocket, request, context);
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
