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

.filter-input {
  margin-top: 4px;
}

.filter-input input {
  width: 100px;
}

.filter-input--range {
  display: flex;
  gap: 8px;
}

.filter-input--range input {
  width: 40px;
}

.filter__debug {
  background-color: #eaeaea;
  padding: 8px;
  font-family: monospace;
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
    filterType: null,
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
    filterType: 'string',
  },
  {
    label: 'Age',
    key: 'age',
    renderCell: (user: User) => user.age,
    comparator: (
      a: User,
      b: User,
      direction: SortDirection,
    ) =>
      direction === 'asc' ? a.age - b.age : b.age - a.age,
    filterType: 'range',
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
    filterType: 'string',
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
    filterType: null,
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
    filterType: 'string',
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
    filterType: 'string',
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
    filterType: 'string',
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
    filterType: 'range',
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

export type FilterPayloadRange = {
  type: 'range';
  max?: number | null;
  min?: number | null;
};
export type FilterPayloadString = {
  type: 'string';
  value: string | null;
};
export type Filters = Record<
  string,
  FilterPayloadRange | FilterPayloadString
>;

export default function HeaderFilterInput({
  field,
  filterType,
  filters,
  onFilterChange,
}: Readonly<{
  field: string;
  filterType: 'range' | 'string';
  filters: Filters;
  onFilterChange: (newFilters: Filters) => void;
}>) {
  return (
    <div className="filter-input">
      {(() => {
        switch (filterType) {
          case 'string': {
            const filterData = filters[
              field
            ] as FilterPayloadString | null;
            return (
              <input
                placeholder="Search..."
                type="search"
                value={filterData?.value || ''}
                onChange={(event) => {
                  const newFilters: Filters = {
                    ...filters,
                    [field]: {
                      type: 'string',
                      value: event.target.value,
                    },
                  };

                  onFilterChange(newFilters);
                }}
              />
            );
          }
          case 'range': {
            const filterData = filters[
              field
            ] as FilterPayloadRange | null;

            return (
              <div className="filter-input--range">
                <input
                  placeholder="Min"
                  type="number"
                  value={filterData?.min || ''}
                  onChange={(event) => {
                    const newFilters: Filters = {
                      ...filters,
                      [field]: {
                        ...filterData,
                        type: 'range',
                        min:
                          event.target.value !== ''
                            ? Number(event.target.value)
                            : null,
                      },
                    };

                    onFilterChange(newFilters);
                  }}
                />
                <input
                  placeholder="Max"
                  type="number"
                  value={filterData?.max || ''}
                  onChange={(event) => {
                    const newFilters: Filters = {
                      ...filters,
                      [field]: {
                        ...filterData,
                        type: 'range',
                        max:
                          event.target.value !== ''
                            ? Number(event.target.value)
                            : null,
                      },
                    };

                    onFilterChange(newFilters);
                  }}
                />
              </div>
            );
          }
        }
      })()}
    </div>
  );
}

import { useState } from 'react';
import HeaderFilterInput, {
  Filters,
} from './HeaderFilterInput';

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
  filterType: 'string' | 'range' | null;
}>;
export type Columns<T> = ReadonlyArray<ColumnDef<T>>;

function filterData<T>(data: Array<T>, filters: Filters) {
  return data.filter((row) =>
    Object.entries(filters)
      .map(([key, filterPayload]) => {
        // Note: Admittedly this is not-typesafe.
        const value = (row as any)[key];

        switch (filterPayload.type) {
          case 'string': {
            if (
              filterPayload.value == null ||
              filterPayload.value === ''
            ) {
              return true;
            }

            return (
              (value as string)
                .toLocaleLowerCase()
                .indexOf(
                  filterPayload.value.toLocaleLowerCase(),
                ) !== -1
            );
          }
          case 'range': {
            // Smaller than min value.
            if (
              filterPayload.min != null &&
              value < filterPayload.min
            ) {
              return false;
            }

            // Larger than max value.
            if (
              filterPayload.max != null &&
              value > filterPayload.max
            ) {
              return false;
            }

            return true;
          }
        }
      })
      .every((result) => result),
  );
}

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
  const [filters, setFilters] = useState<Filters>({});

  // Processing of data.
  const filteredData = filterData(data, filters);
  const sortedData = sortData(
    filteredData,
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
            {columns.map(({ label, key, filterType }) => (
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
                //* Filter inputs 
                {filterType && (
                  <HeaderFilterInput
                    field={key}
                    filterType={filterType}
                    filters={filters}
                    onFilterChange={(newFilters) => {
                      setFilters(newFilters);
                      setPage(1);
                    }}
                  />
                )}
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
      //* Filters state to help visualize 
      <pre className="filter__debug">
        {JSON.stringify(filters, null, 2)}
      </pre>
    </div>
  );
}
*/