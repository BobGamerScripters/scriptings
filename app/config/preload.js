"use strict";

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  window: {
    open(name, opts) {
      return ipcRenderer.invoke("window:open", name, opts);
    },
    openModal(name, opts) {
      return ipcRenderer.invoke("window:openModal", name, opts);
    },
    close() {
      return ipcRenderer.invoke("window:close");
    },
  },
  // Armazena dados temporários entre janelas
  temp: {
    set(key, data) {
      return ipcRenderer.invoke("temp:set", key, data);
    },
    get(key) {
      return ipcRenderer.invoke("temp:get", key);
    },
  },
  colaborador: {
    insert(data) {
      return ipcRenderer.invoke("enterprise:insert", data);
    },
    find(where) {
      return ipcRenderer.invoke("enterprise:find", where);
    },
    findById(id) {
      return ipcRenderer.invoke("enterprise:findById", id);
    },
    update(id, data) {
      return ipcRenderer.invoke("enterprise:update", id, data);
    },
    delete(id) {
      return ipcRenderer.invoke("enterprise:delete", id);
    },
    onReload(callback) {
      ipcRenderer.on("enterprise:reload", () => callback());
    },
  },
  user: {
    insert(data) {
      return ipcRenderer.invoke("user:insert", data);
    },
    find(where) {
      return ipcRenderer.invoke("user:find", where);
    },
    findById(id) {
      return ipcRenderer.invoke("user:findById", id);
    },
    update(id, data) {
      return ipcRenderer.invoke("user:update", id, data);
    },
    delete(id) {
      return ipcRenderer.invoke("user:delete", id);
    },
  },
});
