/*
body {
  font-family: sans-serif;
}

.file-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.file-item {
  padding: 0;
}

.file-item-button {
  background-color: transparent;
  border: none;
  line-height: 1.5;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
}

.file-item-button--directory {
  display: flex;
  gap: 4px;
  font-weight: bold;
}

import FileExplorer from './FileExplorer';

export default function App() {
  const data = [
    {
      id: 1,
      name: 'README.md',
    },
    {
      id: 2,
      name: 'Documents',
      children: [
        {
          id: 3,
          name: 'Word.doc',
        },
        {
          id: 4,
          name: 'Powerpoint.ppt',
        },
      ],
    },
    {
      id: 5,
      name: 'Downloads',
      children: [
        {
          id: 6,
          name: 'unnamed.txt',
        },
        {
          id: 7,
          name: 'Misc',
          children: [
            {
              id: 8,
              name: 'foo.txt',
            },
            {
              id: 9,
              name: 'bar.txt',
            },
          ],
        },
      ],
    },
  ];

  return <FileExplorer data={data} />;
}

import { FileObject, FileData } from './FileExplorer';

export default function FileList({
  fileList,
  level,
}: Readonly<{
  fileList: ReadonlyArray<FileData>;
  level: number;
}>) {
  const directories = fileList.filter(
    (fileItem) => fileItem.children,
  );
  directories.sort((a, b) => a.name.localeCompare(b.name));

  const nonDirectories = fileList.filter(
    (fileItem) => !fileItem.children,
  );
  nonDirectories.sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const items = [...directories, ...nonDirectories];

  return (
    <>
      {items.map((file) => (
        <FileObject
          key={file.id}
          file={file}
          level={level}
        />
      ))}
    </>
  );
}

import { useState } from 'react';
import FileList from './FileList';

export type FileData = Readonly<{
  id: number;
  name: string;
  children?: ReadonlyArray<FileData>;
}>;

export default function FileExplorer({
  data,
}: Readonly<{ data: ReadonlyArray<FileData> }>) {
  return (
    <ul className="file-list">
      <FileList fileList={data} level={1} />
    </ul>
  );
}

export function FileObject({
  file,
  level,
}: Readonly<{
  file: FileData;
  level: number;
}>) {
  const [expanded, setExpanded] = useState(false);
  const { children: fileChildren, name: fileName } = file;
  // If the children field is present, the item is a directory.
  const isDirectory = Boolean(fileChildren);

  return (
    <>
      <li
        className="file-item"
        style={{
          paddingLeft: (level - 1) * 16,
        }}>
        <button
          className={[
            'file-item-button',
            isDirectory && 'file-item-button--directory',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => {
            if (!isDirectory) {
              return;
            }

            setExpanded(!expanded);
          }}>
          <span>{fileName}</span>{' '}
          {isDirectory && <>[{expanded ? '-' : '+'}]</>}
        </button>
      </li>
      {fileChildren &&
        fileChildren.length > 0 &&
        expanded && (
          <FileList
            fileList={fileChildren}
            level={level + 1}
          />
        )}
    </>
  );
}

*/