import axios from "axios";
import type { Note, NoteTag } from "@/types/note";

const API_BASE_URL = "https://notehub-public.goit.study/api";

export interface ApiNote {
  id?: string;
  _id?: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export const notesClient = axios.create({
  baseURL: API_BASE_URL,
});

notesClient.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN?.trim() ?? "";

  if (!token) {
    throw new Error("NEXT_PUBLIC_NOTEHUB_TOKEN is not defined");
  }

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export function toNote(apiNote: ApiNote): Note {
  return {
    id: apiNote.id ?? apiNote._id ?? "",
    title: apiNote.title,
    content: apiNote.content,
    tag: apiNote.tag,
    createdAt: apiNote.createdAt,
    updatedAt: apiNote.updatedAt,
  };
}
