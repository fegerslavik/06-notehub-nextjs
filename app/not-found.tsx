import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-not-found">
      <h1>Note not found</h1>
      <p>The requested note was removed or never existed.</p>
      <Link href="/notes">Return to notes</Link>
    </main>
  );
}
