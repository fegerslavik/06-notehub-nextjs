import type { AxiosResponse } from "axios";
import { notesClient, toNote, type ApiNote } from "@/lib/api/client";
import type { NewNotePayload } from "@/types/note";
import type { FetchNotesParams, FetchNotesResult } from "@/types/noteApi";

interface FetchNotesApiResponse {
  notes: ApiNote[];
  totalPages: number;
}

export async function fetchNotes(
  params: FetchNotesParams,
): Promise<FetchNotesResult> {
  const query: Record<string, string | number> = {
    page: params.page,
    perPage: params.perPage ?? 12,
    sortBy: "updated",
  };

  if (params.search.trim()) {
    query.search = params.search.trim();
  }

  const response: AxiosResponse<FetchNotesApiResponse> = await notesClient.get(
    "/notes",
    {
      params: query,
    },
  );

  return {
    notes: response.data.notes.map(toNote),
    totalPages: response.data.totalPages,
  };
}

export async function fetchNoteById(id: string) {
  const response: AxiosResponse<ApiNote> = await notesClient.get(
    `/notes/${id}`,
  );

  return toNote(response.data);
}

export async function createNote(payload: NewNotePayload) {
  const response: AxiosResponse<ApiNote> = await notesClient.post(
    "/notes",
    payload,
  );

  return toNote(response.data);
}

export async function deleteNote(noteId: string) {
  const response: AxiosResponse<ApiNote> = await notesClient.delete(
    `/notes/${noteId}`,
  );

  return toNote(response.data);
}
