
export const readStdin = () => {
  const chunkSize = 1024;
  const inputChunks = [];
  let totalBytes = 0;

  while (1) {
    const buffer = new Uint8Array(chunkSize);
    // Stdin file descriptor
    const fd = 0;
    const bytesRead = Javy.IO.readSync(fd, buffer);

    totalBytes += bytesRead;
    if (bytesRead === 0) {
      break;
    }
    inputChunks.push(buffer.subarray(0, bytesRead));
  }

  // Assemble input into a single Uint8Array
  const { finalBuffer } = inputChunks.reduce((context, chunk) => {
    context.finalBuffer.set(chunk, context.bufferOffset);
    context.bufferOffset += chunk.length;
    return context;
  }, { bufferOffset: 0, finalBuffer: new Uint8Array(totalBytes) });

  return new TextDecoder().decode(finalBuffer);
}

export const writeStdout = (output) => () => {
  const encodedOutput = new TextEncoder().encode(output);
  const buffer = new Uint8Array(encodedOutput);
  // Stdout file descriptor
  const fd = 1;
  Javy.IO.writeSync(fd, buffer);
}
