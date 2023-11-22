const { SftpClient } = require("../lib/sftp-client");
const fs = require("fs");

const sftpConfig = {
  host: process.env.SFTP_HOST,
  port: process.env.SFTP_PORT,
  username: process.env.SFTP_USERNAME,
  password: process.env.SFTP_PASSWORD,
}

let sftpClient;

async function work() {
  if (!sftpClient) {
    sftpClient = new SftpClient(sftpConfig);
    await sftpClient.connect();
  }
  const data = await fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => response.text())
    .then((text) => Buffer.from(text))
  fs.writeFileSync("tmp/test.txt", data);
  sftpClient.upload("tmp/test.txt", `uploads/denis-test-${Date.now()}.txt`);
}

setTimeout(work, 1000);
