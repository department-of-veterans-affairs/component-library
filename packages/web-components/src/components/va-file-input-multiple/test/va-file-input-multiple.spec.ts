import { VaFileInputMultiple } from '../va-file-input-multiple';
import { FileDetails } from "../FileDetails";
import { FileIndex } from '../FileIndex';

describe('checking buildFilesArray output', ()=> {
  const fileArray:FileIndex[] = [
    {file:new File(["foo"], "foo.txt"), key: 0, content:null},
    {file:new File(["bar"], "bar.txt"), key: 1, content:null}
  ];
  it('should mark the first file as changed', async () => {
    const component = new VaFileInputMultiple();
    let filesArray = component.buildFilesArray(fileArray, false, 0);
    let expectedOutput:FileDetails[] = [ {
      file: fileArray[0].file,
      changed: true
    },
    {
      file: fileArray[1].file,
      changed: false
    }];
    expect(filesArray).toEqual(expectedOutput);
  });

  it('should mark the second file as changed', async () => {
    const component = new VaFileInputMultiple();
    let filesArray = component.buildFilesArray(fileArray, false, 1);
    let expectedOutput:FileDetails[] = [ {
      file: fileArray[0].file,
      changed: false
    },
    {
      file: fileArray[1].file,
      changed: true
    }];
    expect(filesArray).toEqual(expectedOutput);
  });

  it('should not mark anything as changed when deleted is true', async () => {
    const component = new VaFileInputMultiple();
    let filesArray = component.buildFilesArray(fileArray, true, 0);
    let expectedOutput:FileDetails[] = [ {
      file: fileArray[0].file,
      changed: false
    },
    {
      file: fileArray[1].file,
      changed: false
    }];
    expect(filesArray).toEqual(expectedOutput);
  });

  it('should filter out null files', async () => {
    const component = new VaFileInputMultiple();
    let filesArray = component.buildFilesArray([...fileArray, {file:null, key: 2, content:null}], true, 0);
    let expectedOutput:FileDetails[] = [ {
      file: fileArray[0].file,
      changed: false
    },
    {
      file: fileArray[1].file,
      changed: false
    }];
    expect(filesArray).toEqual(expectedOutput);
  });

  it('should not mark anything as changed when index is out of range', async () => {
    const component = new VaFileInputMultiple();
    let filesArray = component.buildFilesArray(fileArray, false, -1);
    let expectedOutput:FileDetails[] = [ {
      file: fileArray[0].file,
      changed: false
    },
    {
      file: fileArray[1].file,
      changed: false
    }];
    expect(filesArray).toEqual(expectedOutput);
  });

  it('should not mark anything as changed when index is out of range', async () => {
    const component = new VaFileInputMultiple();
    let filesArray = component.buildFilesArray(fileArray, false, 10)
    let expectedOutput:FileDetails[] = [ {
      file: fileArray[0].file,
      changed: false
    },
    {
      file: fileArray[1].file,
      changed: false
    }];
    expect(filesArray).toEqual(expectedOutput);
  });

  it('should return password info', async () => {
    const component = new VaFileInputMultiple();
    const newFile = new File(["bat"], "bat.txt")
    let filesArray = component.buildFilesArray([...fileArray, {file:newFile, key: 2, content:null, password: 'password123'}], false, 0);
    let expectedOutput:FileDetails[] = [ {
      file: fileArray[0].file,
      changed: true,
      password: undefined
    },
    {
      file: fileArray[1].file,
      changed: false,
      password: undefined
    },
    {
      file: newFile,
      changed: false,
      password: 'password123'
    }];
    expect(filesArray).toEqual(expectedOutput);
  });
});