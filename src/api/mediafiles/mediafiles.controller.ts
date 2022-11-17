import { Controller, Post, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MediafilesService } from './mediafiles.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
const crypto = require("crypto");
const path = require('path');

@Controller('mediafiles')
export class MediafilesController {
  constructor(private readonly mediafilesService: MediafilesService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('patient_id', {
    storage: diskStorage({
      destination: './uploads/patients',
      filename: function (req, file, cb) {
        cb(null, crypto.randomBytes(16).toString("hex") + path.extname(file.originalname))
      }
    })
  }))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe(
        {
          validators: [
            new MaxFileSizeValidator({ maxSize: 10000000 }),
            new FileTypeValidator({ fileType: 'image' }),
          ]
        }
      )
    )
    file: Express.Multer.File,
  ) {

    const data = {
      "fieldname": file.fieldname,
      "mimetype": file.mimetype,
      "destination": file.destination,
      "filename": file.filename,
      "path": "patients/" + file.filename,
      "size": file.size
    };

    const response = this.mediafilesService.create(data);

    return response;

  }


  @Post('image')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/image',
      filename: function (req, file, cb) {
        cb(null, crypto.randomBytes(16).toString("hex") + path.extname(file.originalname))
      }
    })
  }))
  uploadImage(
    @UploadedFile(
      new ParseFilePipe(
        {
          validators: [
            new MaxFileSizeValidator({ maxSize: 10000000 }),
            new FileTypeValidator({ fileType: 'image' }),
          ]
        }
      )
    )
    file: Express.Multer.File,
  ) {

    const data = {
      "fieldname": file.fieldname,
      "mimetype": file.mimetype,
      "destination": file.destination,
      "filename": file.filename,
      "path": "image/" + file.filename,
      "size": file.size
    };

    const response = this.mediafilesService.create(data);

    return response;

  }

  @Post('pdf')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/pdf',
      filename: function (req, file, cb) {
        cb(null, crypto.randomBytes(16).toString("hex") + path.extname(file.originalname))
      }
    })
  }))
  uploadPDF(
    @UploadedFile(
      new ParseFilePipe(
        {
          validators: [
            new MaxFileSizeValidator({ maxSize: 10000000 }),
            new FileTypeValidator({ fileType: 'pdf' }),
          ]
        }
      )
    )
    file: Express.Multer.File,
  ) {

    const data = {
      "fieldname": file.fieldname,
      "mimetype": file.mimetype,
      "destination": file.destination,
      "filename": file.filename,
      "path": "pdf/" + file.filename,
      "size": file.size
    };

    const response = this.mediafilesService.create(data);

    return response;

  }

}
