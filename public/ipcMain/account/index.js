import { ipcMain } from "electron";
import { getProfile } from "../../services/auth-service";
import {
  createWallet,
  saveKeyStoreJson,
  createQrCode,
  saveQrCode,
  validateKeystoreFile,
  validateQrCode,
  validatePrivateKey,
} from "../../services/wallet-services";

ipcMain.handle("get-profile", () => {
  return getProfile();
});

ipcMain.handle("create-wallet", async (_, args) => {
  const data = await createWallet(args.password);
  return data;
});

ipcMain.handle("export-key-store", async (_, args) => {
  const res = await saveKeyStoreJson(args.keyStore);
  return res;
});

ipcMain.handle("create-qr-code", async (_, args) => {
  const res = await createQrCode(args);
  return res;
});

ipcMain.handle("download-qr-code", async (_, args) => {
  const res = await saveQrCode(args.qrCode);
  return res;
});

ipcMain.handle("validate-keystore-file", async (_, args) => {
  try {
    const res = await validateKeystoreFile(args);
    return res;
  } catch (error) {
    return {
      success: false,
    };
  }
});

ipcMain.handle("validate-qr-code", async (_, args) => {
  try {
    const res = await validateQrCode(args);
    return res;
  } catch (error) {
    return {
      success: false,
    };
  }
});

ipcMain.handle("validate-private-key", async (_, args) => {
  try {
    const res = await validatePrivateKey(args);
    return res;
  } catch (error) {
    return {
      success: false,
    };
  }
});
