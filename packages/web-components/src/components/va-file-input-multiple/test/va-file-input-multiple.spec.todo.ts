// todo there are two issues blocking using these unit test:
//    1. upgrade node to v20. our current version of node, 18, does not support
//       the File type. We could also use a polyfill to get this support
//    2. update our i18n-setup.js files. va-file-input-multiple imports i18next
//       from core, which then imports other files, but isn't considered a module
//       which causes Jest to fail. The simple solution is to change all the files
//       in core/src/i18n to typescript, but there may be another solution

import { VaFileInputMultiple } from '../va-file-input-multiple';
import { FileDetails } from "../FileDetails";

describe('checking buildFilesArray output', ()=> {
  const fileArray = [new File(["foo"], "foo.txt"), new File(["bar"], "bar.txt")];
  it('should mark the first file as changed', async () => {
    const component = new VaFileInputMultiple();
    let filesArray = component.buildFilesArray(fileArray, false, 0);
    let expectedOutput:FileDetails[] = [ {
      file: fileArray[0],
      changed: true
    },
    {
      file: fileArray[1],
      changed: false
    }];
    expect(filesArray).toEqual(expectedOutput);
  });

  it('should mark the second file as changed', async () => {
    const component = new VaFileInputMultiple();
    let filesArray = component.buildFilesArray(fileArray, false, 1);
    let expectedOutput:FileDetails[] = [ {
      file: fileArray[0],
      changed: false
    },
    {
      file: fileArray[1],
      changed: true
    }];
    expect(filesArray).toEqual(expectedOutput);
  });

  it('should not mark anything as changed when deleted is true', async () => {
    const component = new VaFileInputMultiple();
    let filesArray = component.buildFilesArray(fileArray, true, 0);
    let expectedOutput:FileDetails[] = [ {
      file: fileArray[0],
      changed: false
    },
    {
      file: fileArray[1],
      changed: false
    }];
    expect(filesArray).toEqual(expectedOutput);
  });

  it('should filter out null files', async () => {
    const component = new VaFileInputMultiple();
    let filesArray = component.buildFilesArray([...fileArray, null], true, 0);
    let expectedOutput:FileDetails[] = [ {
      file: fileArray[0],
      changed: false
    },
    {
      file: fileArray[1],
      changed: false
    }];
    expect(filesArray).toEqual(expectedOutput);
  });

  it('should not mark anything as changed when index is out of range', async () => {
    const component = new VaFileInputMultiple();
    let filesArray = component.buildFilesArray(fileArray, false, -1);
    let expectedOutput:FileDetails[] = [ {
      file: fileArray[0],
      changed: false
    },
    {
      file: fileArray[1],
      changed: false
    }];
    expect(filesArray).toEqual(expectedOutput);
  });

  it('should not mark anything as changed when index is out of range', async () => {
    const component = new VaFileInputMultiple();
    let filesArray = component.buildFilesArray(fileArray, false, 10)
    let expectedOutput:FileDetails[] = [ {
      file: fileArray[0],
      changed: false
    },
    {
      file: fileArray[1],
      changed: false
    }];
    expect(filesArray).toEqual(expectedOutput);
  });
});