const AWS = require('aws-sdk');
const fs = require('fs');
var s3 = new AWS.S3();

const backupFile = 'backup1.zip';
const filePath = 'backups/' + backupFile;
var backupPath = backupFile;
var storageClass = 'STANDARD';
var bucketName = 'massiveinfinity-atlassian-backup';

const run = async () => {

  const uploadFile = (filePath, bucketName, storageClass, backupPath) => {
    fs.readFile(filePath, (err, data) => {
      if (err) console.error(err);
 
      var params = {
        Bucket: bucketName,
        Key: backupPath,
        StorageClass: storageClass,
        Body: data
      };

      s3.upload(params, (err, data) => {
        if (err) console.error(`Upload Error ${err}`);
        console.log('Upload Completed');
      });
    });
  };
  uploadFile(filePath, bucketName, storageClass, backupPath);

};
run();
