import {
  formatFileSize,
  getAriaLabelsForInputAndButtons,
  isAcceptedFileType,
  getFileTypeErrorMessage,
  normalizeAcceptProp,
} from '../utils';

const accept = '.pdf,.txt';
const uploadedFile = {
  name: 'test.jpg',
  size: 7000,
  type: 'JPG',
};
const file = new File(['file content'], 'test.jpg', { type: 'image/jpg' });
const label = 'Select a file to upload';
const required = true;
const displayError = 'The file you selected is empty. Files must be larger than 0B.';
const initialUploadAttemptHasTakenPlace = true;

describe('VaFileInput utils', () => {
  it('formatFileSize formats the file size correctly', async () => {
    const formattedSize = formatFileSize(uploadedFile.size);
    expect(formattedSize).toBe('7\xa0KB');
  });

  it('getAriaLabelsForInputAndButtons returns labels to reflect errors', async () => {
    const {
      inputAriaLabel,
      deleteFileAriaLabel,
      changeFileAriaLabel,
    } = getAriaLabelsForInputAndButtons(
      label,
      required,
      displayError,
      initialUploadAttemptHasTakenPlace,
      null,
      uploadedFile,
    );

    expect(inputAriaLabel).toBe(`Error: The file you selected is empty. Files must be larger than 0B. Select a file to upload (*Required). Drag a file here or choose from folder`);
    expect(deleteFileAriaLabel).toBe(`delete file. Error. The file you selected is empty. Files must be larger than 0B.`);
    expect(changeFileAriaLabel).toBe(`change file. Error. The file you selected is empty. Files must be larger than 0B.`);
  });

  it('getAriaLabelsForInputAndButtons returns labels when there are no errors', async () => {
    const {
      inputAriaLabel,
      deleteFileAriaLabel,
      changeFileAriaLabel,
    } = getAriaLabelsForInputAndButtons(
      label,
      required,
      null,
      initialUploadAttemptHasTakenPlace,
      file,
      uploadedFile,
    );

    expect(inputAriaLabel).toBe(`You have selected the file: test.jpg.`);
    expect(deleteFileAriaLabel).toBe(`delete file test.jpg`);
    expect(changeFileAriaLabel).toBe(`change file test.jpg`);
  });

  it('getAriaLabelsForInputAndButtons returns label for input when a file has been deleted', async () => {
    const {
      inputAriaLabel,
    } = getAriaLabelsForInputAndButtons(
      label,
      required,
      null,
      initialUploadAttemptHasTakenPlace,
      null,
      null,
    );

    expect(inputAriaLabel).toBe(`File deleted. No file selected. Select a file to upload (*Required). Drag a file here or choose from folder`);
  });

  it('normalizeAcceptProp normalizes accept prop correctly', async () => {
    const normalized = normalizeAcceptProp(accept);
    expect(normalized).toEqual(['application/pdf', 'text/plain']);
  });

  it('isAcceptedFileType returns true for accepted file types', async () => {
    const normalizedAccept = normalizeAcceptProp(accept);

    expect(isAcceptedFileType('application/pdf', normalizedAccept)).toBe(true);
    expect(isAcceptedFileType('text/plain', normalizedAccept)).toBe(true);
  });

  it('isAcceptedFileType returns false for unaccepted file types', async () => {
    const normalized = normalizeAcceptProp(accept);

    expect(isAcceptedFileType('image/jpg', normalized)).toBe(false);
    expect(isAcceptedFileType('text/csv', normalized)).toBe(false);
  });

  it('getFileTypeErrorMessage returns correct error message for unaccepted file types', async () => {
    const errorMessage = getFileTypeErrorMessage(uploadedFile as File);
    expect(errorMessage).toBe('We do not accept .jpg files. Choose a new file.')
  });
});
