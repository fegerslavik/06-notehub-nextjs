import Link from "next/link";
import type { Note } from "@/types/note";
import styles from "./NoteCard.module.css";

interface NoteCardProps {
  note: Note;
  onDelete?: (id: string) => void;
}

export function NoteCard({ note, onDelete }: NoteCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.topline}>
        <span className={styles.badge}>{note.tag}</span>
      </div>

      <Link className={styles.title} href={`/notes/${note.id}`}>
        {note.title}
      </Link>

      <p className={styles.content}>{note.content}</p>

      <div className={styles.footer}>
        <span>{note.tag}</span>
        <span>{new Date(note.updatedAt).toLocaleDateString("uk-UA")}</span>
      </div>

      {onDelete ? (
        <button
          className={styles.delete}
          type="button"
          onClick={() => onDelete(note.id)}
        >
          Видалити
        </button>
      ) : null}
    </article>
  );
}
