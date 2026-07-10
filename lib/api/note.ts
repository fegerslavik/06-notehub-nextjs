import type { AxiosResponse } from "axios";
import { notesClient, toNote, type ApiNote } from "@/lib/api/client";

export async function fetchNoteById(id: string) {
  const response: AxiosResponse<ApiNote> = await notesClient.get(
    `/notes/${id}`,
  );

  return toNote(response.data);
}

export async function deleteNote(noteId: string) {
  const response: AxiosResponse<ApiNote> = await notesClient.delete(
    `/notes/${noteId}`,
  );

  return toNote(response.data);
}
