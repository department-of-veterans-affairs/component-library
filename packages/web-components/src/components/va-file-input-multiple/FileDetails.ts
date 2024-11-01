/**
 * Represents the information that will be emitted on vaMultipleChange
 * Each entry contains a file and a boolean representing if it had changed
 *
 * @interface
 * @property {File | null} file - The file object managed by this entry; can be null if no file is currently selected.
 * @property {Boolean} changed - Set to true if the action that vaMultipleChange affected this file
 */

export interface FileDetails {
  file: File,
  changed: Boolean
}