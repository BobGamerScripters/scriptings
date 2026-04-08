import { ipcMain, BrowserWindow } from "electron";
import Enterprise from "../controller/Colaborador.js";
import User from "../controller/User.js";

function getWin(event) {
  return BrowserWindow.fromWebContents(event.sender);
}

// Avisa todas as janelas para recarregar
function broadcastReload(channel) {
  for (const win of BrowserWindow.getAllWindows()) {
    win.webContents.send(channel);
  }
}

//  WINDOW
ipcMain.handle("window:open", (_e, name, opts = {}) => {
  const win = Template.create(name, opts);
  Template.loadView(win, name);
});

ipcMain.handle("window:openModal", (e, name, opts = {}) => {
  const parent = getWin(e);
  if (!parent) return;
  const win = Template.create(name, {
    width: 560,
    height: 420,
    resizable: false,
    minimizable: false,
    maximizable: false,
    parent: parent,
    modal: true,
    ...opts,
  });
  Template.loadView(win, name);
});

ipcMain.handle("window:close", (e) => {
  getWin(e)?.close();
});

//  TEMP STORE — dados temporários entre janelas
let tempData = {};

ipcMain.handle("temp:set", (_e, key, data) => {
  tempData[key] = data;
});

ipcMain.handle("temp:get", (_e, key) => {
  const data = tempData[key] || null;
  delete tempData[key];
  return data;
});


// Colaborador
ipcMain.handle("colaborador:find", async (_e, where = {}) => {
  return await Colaborador.find(where);
});

ipcMain.handle("colaborador:findById", async (_e, id) => {
  return await Colaborador.findById(id);
});

ipcMain.handle("colaborador:insert", async (_e, data) => {
  const result = await Colaborador.insert(data);
  if (result.status) broadcastReload("colaborador:reload");
  return result;
});

ipcMain.handle("colaborador:update", async (_e, id, data) => {
  const result = await Colaborador.update(id, data);
  if (result.status) broadcastReload("colaborador:reload");
  return result;
});

ipcMain.handle("colaborador:delete", async (_e, id) => {
  const result = await Colaborador.delete(id);
  if (result.status) broadcastReload("colaborador:reload");
  return result;
});

// User
ipcMain.handle("user:find", async (_e, where = {}) => {
  return await User.find(where);
});

ipcMain.handle("user:findById", async (_e, id) => {
  return await User.findById(id);
});

ipcMain.handle("user:insert", async (_e, data) => {
  const result = await User.insert(data);
  if (result.status) broadcastReload("user:reload");
  return result;
});

ipcMain.handle("user:update", async (_e, id, data) => {
  const result = await User.update(id, data);
  if (result.status) broadcastReload("user:reload");
  return result;
});

ipcMain.handle("user:delete", async (_e, id) => {
  const result = await User.delete(id);
  if (result.status) broadcastReload("user:reload");
  return result;
});
