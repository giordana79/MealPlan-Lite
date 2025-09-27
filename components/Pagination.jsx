"use client";
export default function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="pagination">
      <button className="btn ghost" onClick={onPrev} disabled={page <= 1}>
        Prev
      </button>
      <div>
        Pagina {page} / {totalPages}
      </div>
      <button
        className="btn ghost"
        onClick={onNext}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
}
