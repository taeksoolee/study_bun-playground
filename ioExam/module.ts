const TEXT_FILE_NAME = "exam.txt";

export const writeExamTxt = async () => {
  const writtenBytes = await Bun.write(TEXT_FILE_NAME, "hello world")
  console.log(`written bytes :: ${writtenBytes}`);
}

export const logStdout = async () => {
  const file = Bun.file(TEXT_FILE_NAME);
  console.log(file);
  console.log(file.size);

  if(file.size === 0) {
    await writeExamTxt()
  }

  Bun.write(Bun.stdout, await file.text());
}

export const readExamTxt = async () => {
  const file = Bun.file(TEXT_FILE_NAME);
  const text = await file.text();
  console.log('read text ::: ', text);
}