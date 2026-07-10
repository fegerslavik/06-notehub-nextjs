"use client";

import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import NoteForm from "@/components/NoteForm/NoteForm";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { fetchNotes } from "@/lib/api";
import styles from "./Notes.client.module.css";

export function NotesClient() {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN?.trim() ?? "";
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const canWorkWithNotes = token.trim().length > 0;
  const perPage = 12;

  const debouncedSearch = useDebouncedCallback((nextValue: string) => {
    setPage(1);
    setSearch(nextValue.trim());
  }, 400);

  const notesQuery = useQuery({
    queryKey: ["notes", page, perPage, search],
    queryFn: () => fetchNotes({ page, perPage, search }),
    enabled: canWorkWithNotes,
    placeholderData: keepPreviousData,
  });

  const notes = notesQuery.data?.notes ?? [];
  const totalPages = notesQuery.data?.totalPages ?? 0;

  function handleSearchChange(value: string) {
    setSearchInput(value);
    debouncedSearch(value);
  }

  let errorMessage = "";
  if (notesQuery.error) {
    if (axios.isAxiosError<{ message?: string }>(notesQuery.error)) {
      errorMessage =
        notesQuery.error.response?.data?.message ?? notesQuery.error.message;
    } else {
      errorMessage = "Failed to load notes";
    }
  }

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox value={searchInput} onChange={handleSearchChange} />

        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}

        <button
          type="button"
          className={styles.button}
          onClick={() => setIsModalOpen(true)}
          disabled={!canWorkWithNotes}
        >
          Create note +
        </button>
      </header>

      {!canWorkWithNotes && (
        <p className={styles.status}>
          Set NEXT_PUBLIC_NOTEHUB_TOKEN to load notes.
        </p>
      )}

      {notesQuery.isPending && canWorkWithNotes && (
        <p className={styles.status}>Loading notes...</p>
      )}

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      {notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className={styles.modalTitle}>Create note</h2>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
