import { S3 } from "aws-sdk";
import { Logger, Injectable } from "@nestjs/common";

@Injectable()
export class FileUploadService {
  async upload(file, fileMetaData?) {
    const { originalname } = file;
    const bucketS3 = process.env.S3_BUCKET_NAME;
    await this.uploadS3(file.buffer, bucketS3, originalname);
  }

  async uploadUserPic(file) {
    const { originalname } = file;
    const bucketS3 = process.env.AWS_USERIMAGES_BUCKET_NAME;
    await this.uploadS3(file.buffer, bucketS3, originalname);
  }

  async uploadPDF(file) {
    const { originalname } = file;
    const bucketS3 = process.env.S3_BUCKET_NAME;
    await this.uploadPdftoS3(file.buffer, bucketS3, originalname);
  }

  async uploadPdftoS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: "application/pdf",
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: "image/jpeg",
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }
  async uploadToS3Folder(file, folder) {
    const s3 = this.getS3();
    const params = {
      Bucket: process.env.S3_BUCKET_NAME + `/${folder}`,
      Key: String(file.originalname),
      Body: file.buffer,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: file.mimetype,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  async uploadToS3(file) {
    const s3 = this.getS3();
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: Date.now() + file.originalname,
      ACL: "public-read",
      Body: file,
      ContentEncoding: "base64",
      ContentType: "image/jpeg",
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, function (err, data) {
        if (err) {
          return reject(err);
        }

        return resolve(data);
      });
    });
  }

  async deleteFromS3(objects, bucketS3) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucketS3,
      Key: objects,
    };
    return new Promise((resolve, reject) => {
      s3.deleteObject(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  async deleteUserPicFromS3(objects) {
    const s3 = this.getS3();
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: objects,
    };
    return new Promise((resolve, reject) => {
      s3.deleteObject(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }
}
