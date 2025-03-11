/*import { useState } from 'react';
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
    <div>
      <FileList fileList={data} level={1} />
    </div>
  );
}

export function FileObject({
  file,
  level,
}: Readonly<{ file: FileData; level: number }>) {
  const [expanded, setExpanded] = useState(false);
  const { children: fileChildren, name: fileName } = file;
  // If the children field is present, the item is a directory.
  const isDirectory = Boolean(fileChildren);

  return (
    <li className="file-item">
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
      {fileChildren &&
        fileChildren.length > 0 &&
        expanded && (
          <FileList
            fileList={fileChildren}
            level={level + 1}
          />
        )}
    </li>
  );
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
    <ul className="file-list">
      {items.map((file) => (
        <FileObject
          key={file.id}
          file={file}
          level={level}
        />
      ))}
    </ul>
  );
}


import { useId, useState } from 'react';
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
    <div aria-label="Files Explorer" role="tree">
      <FileList fileList={data} level={1} />
    </div>
  );
}

export function FileObject({
  file,
  level,
  setSize,
  posInSet,
}: Readonly<{
  file: FileData;
  level: number;
  setSize: number;
  posInSet: number;
}>) {
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  const { children: fileChildren, name: fileName } = file;
  // If the children field is present, the item is a directory.
  const isDirectory = Boolean(fileChildren);

  return (
    <li
      aria-expanded={isDirectory ? expanded : undefined}
      aria-labelledby={id}
      aria-level={level}
      aria-posinset={posInSet}
      aria-setsize={setSize}
      className="file-item"
      role="treeitem">
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
        <span id={id}>{fileName}</span>{' '}
        {isDirectory && <>[{expanded ? '-' : '+'}]</>}
      </button>
      {fileChildren &&
        fileChildren.length > 0 &&
        expanded && (
          <FileList
            fileList={fileChildren}
            level={level + 1}
          />
        )}
    </li>
  );
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
    <ul className="file-list" role="group">
      {items.map((file, index) => (
        <FileObject
          posInSet={index + 1}
          setSize={items.length}
          key={file.id}
          file={file}
          level={level}
        />
      ))}
    </ul>
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


*/