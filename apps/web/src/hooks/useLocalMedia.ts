"use client";

import { useState, useCallback, useEffect } from "react";
import { LocalMediaItem } from "../types";

export function useLocalMedia() {
  const [items, setItems] = useState<LocalMediaItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addFiles = useCallback((files: FileList | File[]) => {
    const newItems: LocalMediaItem[] = [];

    Array.from(files).forEach((file) => {
      const isVideo = file.type.startsWith("video/");
      const isImage = file.type.startsWith("image/");
      if (!isVideo && !isImage) return;

      const objectUrl = URL.createObjectURL(file);
      const id = `local_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

      newItems.push({
        id,
        file,
        kind: isVideo ? "video" : "image",
        filename: file.name,
        sizeBytes: file.size,
        objectUrl,
      });
    });

    if (newItems.length > 0) {
      setItems((prev) => [...prev, ...newItems]);
      setSelectedId(newItems[0].id);
    }
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) {
        URL.revokeObjectURL(item.objectUrl);
      }
      return prev.filter((i) => i.id !== id);
    });
    setSelectedId((current) => (current === id ? null : current));
  }, []);

  const clearAll = useCallback(() => {
    items.forEach((item) => URL.revokeObjectURL(item.objectUrl));
    setItems([]);
    setSelectedId(null);
  }, [items]);

  const downloadItem = useCallback((item: LocalMediaItem) => {
    const a = document.createElement("a");
    a.href = item.objectUrl;
    a.download = `re-saved_${item.filename}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, []);

  useEffect(() => {
    return () => {
      items.forEach((item) => URL.revokeObjectURL(item.objectUrl));
    };
  }, [items]);

  return {
    items,
    selectedId,
    setSelectedId,
    addFiles,
    removeItem,
    clearAll,
    downloadItem,
  };
}
