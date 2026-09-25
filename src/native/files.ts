import { Capacitor } from "@capacitor/core";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";

function blobBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

function encodeBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let index = 0; index < bytes.length; index += chunk) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunk));
  }
  return btoa(binary);
}

function triggerDownload(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/** Web uses a download link. Android shares a real file, because a blob link does not save. */
export async function saveFile(filename: string, body: Uint8Array | string, mime: string): Promise<void> {
  const bytes = typeof body === "string" ? new TextEncoder().encode(body) : body;
  if (!Capacitor.isNativePlatform()) {
    triggerDownload(filename, new Blob([blobBuffer(bytes)], { type: mime }));
    return;
  }
  const safe = filename.replace(/[^\w.\-]+/g, "_");
  const written = await Filesystem.writeFile({
    path: safe,
    data: encodeBase64(bytes),
    directory: Directory.Cache,
  });
  await Share.share({ title: filename, files: [written.uri], dialogTitle: filename });
}
