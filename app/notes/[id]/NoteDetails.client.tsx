"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api/note";
import css from "./page.module.css";

export function NoteDetailsClient() {
  const params = useParams<{ id: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const noteQuery = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
    refetchOnMount: false,
  });

  if (noteQuery.isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (noteQuery.isError || !noteQuery.data) {
    return <p>Something went wrong.</p>;
  }

  const note = noteQuery.data;

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>
            Created date: {new Date(note.createdAt).toLocaleString("en-US")}
          </p>
        </div>
      </div>
    </main>
  );
}
