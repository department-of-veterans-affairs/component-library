/**
 * Represents an index entry for managing file objects within a collection.
 * Each entry contains a file and a unique key to identify it.
 * This interface is used to track files in va-file-input-multiple,
 * allowing for operations like addition, deletion, and updates of files.
 *
 * @interface
 * @property {File | null} file - The file object managed by this entry; can be null if no file is currently selected.
 * @property {number} key - A unique identifier for the file entry, used to manage updates and track the file's position in a collection.
 * @property {Node[]} content - An array of DOM nodes representing additional content associated with the file, such as labels, hints, or custom controls.
 */
export interface FileIndex {
  file: File | null;
  key: number;
  content: Node[];
}
