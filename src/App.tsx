import React from 'react';
import { Pagination } from './components/Pagination';
import { useSearchParams } from 'react-router-dom';

const TOTAL = 42;

export const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get('page')) || 1;
  const perPageFromUrl = Number(searchParams.get('perPage')) || 5;

  const [currentPage, setCurrentPage] = React.useState(pageFromUrl);
  const [perPage, setPerPage] = React.useState(perPageFromUrl);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: String(page), perPage: String(perPage) });
  };

  const handlePerPageChange = (value: number) => {
    setPerPage(value);
    setCurrentPage(1);
    setSearchParams({ page: '1', perPage: String(value) });
  };

  // ---------- ITEMS ----------
  const items = Array.from({ length: TOTAL }, (_, i) => `Item ${i + 1}`);

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const visibleItems = items.slice(start, end);

  return (
    <div className="App">
      {/* PER PAGE SELECTOR */}
      <select
        data-cy="perPageSelector"
        value={perPage}
        onChange={e => handlePerPageChange(Number(e.target.value))}
      >
        {[3, 5, 10, 20].map(n => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>

      {/* ITEMS LIST */}
      <ul>
        {visibleItems.map(item => (
          <li key={item} data-cy="item">
            {item}
          </li>
        ))}
      </ul>

      {/* PAGINATION */}
      <Pagination
        total={TOTAL}
        perPage={perPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
