
/**
 * 
 * @param file 
 * 
 * @returns boolean, whether file is an encrypted pdf
 */
export async function isEncryptedPdf(file: File) {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const bytes = new Uint8Array(arrayBuffer);
  const pdfString = generatePdfString(bytes);
  return pdfString.includes('/Encrypt');
}

function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result as ArrayBuffer);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}

function generatePdfString(bytes: Uint8Array) {
  let pdfString = '';
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.slice(i, i + chunkSize);
    pdfString += String.fromCharCode.apply(null, chunk);
  };
  return pdfString;
}