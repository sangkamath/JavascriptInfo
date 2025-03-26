/*
body {
  font-family: sans-serif;
}

table {
  border-collapse: collapse;
  font-size: 14px;
}

td,
th {
  padding: 4px;
  border-bottom: 1px solid #ddd;
  text-align: start;
}

th {
  vertical-align: top;
}

th button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.pagination {
  display: flex;
  font-size: 14px;
  gap: 12px;
}

.pages {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import './styles.css';

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import DataTable, {
  Columns,
  SortDirection,
} from './DataTable';
import users from './data/users.json';
import houses from './data/houses.json';

type User = (typeof users)[number];
const userColumns: Columns<User> = [
  {
    label: 'ID',
    key: 'id',
    renderCell: (user: User) => user.id,
    comparator: (
      a: User,
      b: User,
      direction: SortDirection,
    ) => (direction === 'asc' ? a.id - b.id : b.id - a.id),
  },
  {
    label: 'Name',
    key: 'name',
    renderCell: (user: User) => user.name,
    comparator: (
      a: User,
      b: User,
      direction: SortDirection,
    ) =>
      direction === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
  },
  {
    label: 'Age',
    key: 'age',
    renderCell: (user: User) => user.age,
    comparator: (
      a: User,
      b: User,
      direction: SortDirection,
    ) => (direction === 'asc' ? a.id - b.id : b.id - a.id),
  },
  {
    label: 'Occupation',
    key: 'occupation',
    renderCell: (user: User) => user.occupation,
    comparator: (
      a: User,
      b: User,
      direction: SortDirection,
    ) =>
      direction === 'asc'
        ? a.occupation.localeCompare(b.occupation)
        : b.occupation.localeCompare(a.occupation),
  },
];

type House = (typeof houses)[number];
const houseColumns: Columns<House> = [
  {
    label: 'ID',
    key: 'id',
    renderCell: (house: House) => house.id,
    comparator: (
      a: House,
      b: House,
      direction: SortDirection,
    ) => (direction === 'asc' ? a.id - b.id : b.id - a.id),
  },
  {
    label: 'Street',
    key: 'street',
    renderCell: (house: House) => house.street,
    comparator: (
      a: House,
      b: House,
      direction: SortDirection,
    ) =>
      direction === 'asc'
        ? a.street.localeCompare(b.street)
        : b.street.localeCompare(a.street),
  },
  {
    label: 'City',
    key: 'city',
    renderCell: (house: House) => house.city,
    comparator: (
      a: House,
      b: House,
      direction: SortDirection,
    ) =>
      direction === 'asc'
        ? a.city.localeCompare(b.city)
        : b.city.localeCompare(a.city),
  },
  {
    label: 'State',
    key: 'state',
    renderCell: (house: House) => house.state,
    comparator: (
      a: House,
      b: House,
      direction: SortDirection,
    ) =>
      direction === 'asc'
        ? a.state.localeCompare(b.state)
        : b.state.localeCompare(a.state),
  },
  {
    label: 'Built Year',
    key: 'built_year',
    renderCell: (house: House) => house.built_year,
    comparator: (
      a: House,
      b: House,
      direction: SortDirection,
    ) =>
      direction === 'asc'
        ? a.built_year - b.built_year
        : b.built_year - a.built_year,
  },
];

export default function App() {
  return (
    <div>
      <h2>Users</h2>
      <DataTable data={users} columns={userColumns} />
      <br />
      <h2>Houses</h2>
      <DataTable data={houses} columns={houseColumns} />
    </div>
  );
}

import { useState } from 'react';

export type SortDirection = 'asc' | 'desc';
type ColumnDef<T> = Readonly<{
  label: string;
  key: string;
  renderCell: (row: T) => React.ReactNode;
  comparator: (
    a: T,
    b: T,
    sortDirection: SortDirection,
  ) => number;
}>;
export type Columns<T> = ReadonlyArray<ColumnDef<T>>;

function sortData<T>(
  data: Array<T>,
  columns: Columns<T>,
  field: string | null,
  direction: SortDirection,
) {
  const dataClone = data.slice();
  const comparator = columns.find(
    (column) => column.key === field,
  )?.comparator;

  if (comparator == null) {
    return dataClone;
  }

  return dataClone.sort((a, b) =>
    comparator(a, b, direction),
  );
}

function paginateData<T>(
  data: Array<T>,
  page: number,
  pageSize: number,
) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const pageData = data.slice(start, end);
  const maxPages = Math.ceil(data.length / pageSize);
  return { pageData, maxPages };
}

export default function DataTable<
  T extends { id: number },
>({
  data,
  columns,
}: Readonly<{
  data: Array<T>;
  columns: Columns<T>;
}>) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState<string | null>(
    null,
  );
  const [sortDirection, setSortDirection] =
    useState<SortDirection>('asc');

  // Processing of data.
  const sortedData = sortData(
    data,
    columns,
    sortField,
    sortDirection,
  );
  const { maxPages, pageData } = paginateData(
    sortedData,
    page,
    pageSize,
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map(({ label, key }) => (
              <th key={key}>
                <button
                  onClick={() => {
                    if (sortField !== key) {
                      setSortField(key);
                      setSortDirection('asc');
                    } else {
                      setSortDirection(
                        sortDirection === 'asc'
                          ? 'desc'
                          : 'asc',
                      );
                    }
                    setPage(1);
                  }}>
                  {label}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageData.map((item) => (
            <tr key={item.id}>
              {columns.map(({ key, renderCell }) => (
                <td key={key}>{renderCell(item)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <div className="pagination">
        <select
          aria-label="Page size"
          onChange={(event) => {
            setPageSize(Number(event.target.value));
            setPage(1);
          }}>
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
        <div className="pages">
          <button
            disabled={page === 1}
            onClick={() => {
              setPage(page - 1);
            }}>
            Prev
          </button>
          {maxPages === 0 ? (
            <span>0 pages</span>
          ) : (
            <span aria-label="Page number">
              Page {page} of {maxPages}
            </span>
          )}
          <button
            disabled={page === maxPages}
            onClick={() => {
              setPage(page + 1);
            }}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

*/