export const NEW_FILES_SELECTED = 'NEW_FILES_SELECTED';

export function NewFilesSelected(files) {
  return {
    type: NEW_FILES_SELECTED,
    files
  };
}
