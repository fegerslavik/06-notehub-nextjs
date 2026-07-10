import Link from "next/link";
import type { Note } from "@/types/note";
import styles from "./NoteCard.module.css";

interface NoteCardProps {
  note: Note;
  onDelete?: (id: string) => void;
}

const colorLabels: Record<NonNullable<Note["color"]>, string> = {
  cyan: "Cyan",
  violet: "Violet",
  amber: "Amber",
  emerald: "Emerald",
};

export function NoteCard({ note, onDelete }: NoteCardProps) {
  const colorClass = note.color ? styles[note.color] : "";

  return (
    <article className={`${styles.card} ${colorClass}`}>
      <div className={styles.topline}>
        <span className={styles.badge}>{note.category}</span>
        {note.pinned ? <span className={styles.pin}>Pinned</span> : null}
      </div>

      <Link className={styles.title} href={`/notes/${note.id}`}>
        {note.title}
      </Link>

      <p className={styles.content}>{note.content}</p>

      <div className={styles.footer}>
        <span>{note.color ? colorLabels[note.color] : "Note"}</span>
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
