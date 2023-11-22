const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

const localFilePath = 'path/to/local/file.txt'; // Local file to be uploaded
const remoteFilePath = 'path/on/remote/server/file.txt'; // Path where the file should be uploaded on the server


class SftpClient {
  constructor(sftpConfig) {
    this.host = sftpConfig.host;
    this.port = sftpConfig.port || 22;
    this.username = sftpConfig.username;
    this.password = sftpConfig.password;
    this.conn = null;
  }

  async connect() {
    this.conn = new Client();

    return new Promise((resolve, reject) => {
      const config = this.getConfig();

      this.conn.on('ready', () => {
        resolve();
      }).connect(config);

      this.conn.on('error', (err) => {
        reject(err);
      });
    });
  }

  getConfig() {
    return { host: this.host, port: this.port, username: this.username, password: this.password };
  }

  async upload(localFilePath, remoteFilePath) {
    return new Promise((resolve, reject) => {
      this.conn.sftp((err, sftp) => {
        if (err) {
          reject(err);
          return
        }
        sftp.fastPut(localFilePath, remoteFilePath, {}, (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      });
    } );
  }
}

module.exports = { SftpClient };
