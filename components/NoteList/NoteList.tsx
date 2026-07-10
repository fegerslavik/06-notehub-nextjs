import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { deleteNote } from "@/lib/api";
import type { Note } from "@/types/note";
import styles from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  function handleDeleteNote(noteId: string) {
    deleteNoteMutation.mutate(noteId);
  }

  return (
    <ul className={styles.list}>
      {notes.map((note, index) => (
        <li
          key={`${note.id || "note"}-${note.updatedAt}-${note.title}-${index}`}
          className={styles.listItem}
        >
          <h2 className={styles.title}>{note.title}</h2>
          <p className={styles.content}>{note.content}</p>
          <div className={styles.footer}>
            <span className={styles.tag}>{note.tag}</span>
            <Link className={styles.link} href={`/notes/${note.id}`}>
              View details
            </Link>
            <button
              className={styles.button}
              type="button"
              onClick={() => handleDeleteNote(note.id)}
              disabled={deleteNoteMutation.isPending}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
