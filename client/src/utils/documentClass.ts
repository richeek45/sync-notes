import { HocuspocusProvider, StatesArray } from "@hocuspocus/provider";
import { awarenessStatesToArray } from "@hocuspocus/common";
import * as Y from "yjs";


export class DocumentRoom {
  doc = new Y.Doc();
  name = '';
  status = 'disconnected';
  users = 0;
  states : StatesArray = [];
  provider: HocuspocusProvider;

  constructor(name: string) {
    this.name = name;


    this.provider = new HocuspocusProvider({
      url: "ws://127.0.0.1:8080",
      name: this.name,
      document: this.doc,
      preserveConnection: false,
      onStatus: ({ status }) => {
        this.status = status;
      },
      onOpen: () => {
        console.log('websocket connection is created!!')
      },
      onAwarenessUpdate: ({ states }) => {
        this.states = states
        // @ts-expect-error error
        this.users = awarenessStatesToArray(this.provider.awareness.getStates()).filter((state => 'user' in state)).length
      },
      onDisconnect: () => {
        this.users = 0;
      }
    });
  }

  connect() {
    this.provider.setAwarenessField('user', { name: `Jon @ ${this.name}` });
    this.provider.connect();
  }

  disconnect() {
    this.provider.disconnect();
  }

  destroy() {
    this.provider.destroy()
  }

}