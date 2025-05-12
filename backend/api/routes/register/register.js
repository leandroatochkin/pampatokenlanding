import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../db/db.js';
import { uploadToDrive } from '../../../storage/googleDriveApi.js';
import os from 'os';
import dayjs from 'dayjs';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Example: 5MB file size limit
});

// Middleware to handle Multer errors
const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ 
      success: false, 
      error: 'File upload error', 
      message: err.message 
    });
  } else if (err) {
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error', 
      message: err.message 
    });
  }
  next();
};

router.post(
  '/',
  upload.fields([
    { name: 'frontIdImage', maxCount: 1 },
    { name: 'backIdImage', maxCount: 1 },
    { name: 'selfieImage', maxCount: 1 }
  ]),



  
  handleMulterErrors, 
  async (req, res) => {






    try {
      console.log('Request received. Checking for user data...');
      if (!req.body.user) {
        return res.status(400).json({ 
          success: false, 
          error: "MISSING_USER_DATA" 
        });
      }
      const user = JSON.parse(req.body.user);
      const email = user.email;

      const userSummary = `
      Email: ${user.email}
      Nombre: ${user.firstName} ${user.lastName}
      Estado Civil: ${user.maritalStatus || 'N/A'}
      Teléfono: ${user.phoneNumber || 'N/A'}
      País: ${user.country || 'N/A'}
      Provincia: ${user.province || 'N/A'}
      Ciudad: ${user.city || 'N/A'}
      Código Postal: ${user.postalCode || 'N/A'}
      Dirección: ${user.address || 'N/A'}
      CUIT: ${user.CUIT || 'N/A'}
      Banco: ${user.bank || 'N/A'}
      CBU: ${user.CBU || 'N/A'}
      Persona expuesta politicamente: ${user.politicallyExposed ? 'SI' : 'NO'}
      Persona alcanzada por UIF: ${user.UIFRequired ? 'SI' : 'NO'}
      Residente fiscal fuera de Argentina: ${user.fiscalResident_outside_argentina ? 'SI' : 'NO'}
      Terms Accepted: ${user.termsAndConditions_read ? 'SI' : 'NO'}
      Verified: ${user.isVerified ? 'SI' : 'NO'}
      `;

      const tempSummaryPath = path.join(os.tmpdir(), `Sumario-${user.CUIT}(${user.firstName}, ${user.firstName}).txt`);
      fs.writeFileSync(tempSummaryPath, userSummary);

      console.log(`Uploading Sumario-${user.CUIT}(${user.firstName}, ${user.firstName}).txt`);

      const { fileId: summaryFileId, publicUrl: summaryUrl } = await uploadToDrive(tempSummaryPath, `${user.lastName}-${user.firstName}-${user.CUIT}-Sumario.txt`);

      console.log(`Sumario-${user.CUIT}(${user.firstName}, ${user.firstName}).txt uploaded correctly`);

      fs.unlinkSync(tempSummaryPath);

      const uploadBufferToDrive = async (file, namePrefix) => {

        const translateNamePrefix = (namePrefix) => {
          switch(namePrefix){
            case 'frontIdImage':
              return 'DNI-FRENTE'
            case 'backIdImage':
              return 'DNI-DORSO'
            case 'selfieImage':
              return 'ROSTRO'
          }
        }


        const fileName = `${user.lastName}-${user.firstName}-${user.CUIT}${translateNamePrefix(namePrefix)}-${dayjs(Date.now()).format('DD-MM-YYYY')}-${file.originalname}`;
        const tempPath = path.join(os.tmpdir(), fileName);
        fs.writeFileSync(tempPath, file.buffer);
        
        const { fileId, publicUrl } = await uploadToDrive(tempPath, fileName,);
        
        fs.unlinkSync(tempPath);
        return { fileId, publicUrl };
      };

      const imageDriveIds = {};

      imageDriveIds['userSummary'] = { driveFileId: summaryFileId, publicUrl: summaryUrl };
      console.log('Summary URL:', summaryUrl);

      const filesToUpload = [
        {
          filePath: tempSummaryPath,  
          fileName: `Sumario-${user.CUIT}(${user.firstName}, ${user.lastName}).txt`, 
        },
      ];


      for (const fieldName of ['frontIdImage', 'backIdImage', 'selfieImage']) {
        if (req.files[fieldName]?.[0]) {
          console.log(`Processing ${fieldName}...`);
          const file = req.files[fieldName][0];
          const { fileId, publicUrl } = await uploadBufferToDrive(file, fieldName);
          imageDriveIds[fieldName] = { driveFileId: fileId, publicUrl };
          console.log('url:', publicUrl)
        }
      }
      
 
       console.log('Inserting user into database...');
        const userId = uuidv4()
        const query = `
        INSERT INTO users (
              id, email, password, firstName, lastName, middleName, maritalStatus, phoneNumber,
              country, province, city, postalCode, address, CUIT, bank, CBU,
              politicallyExposed, UIFRequired, fiscalResident_outside_argentina,
              termsAndConditions_read, isVerified
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            userId,
            user.email,
            user.password,
            user.firstName,
            user.lastName,
            user.middleName || null,
            user.maritalStatus || null,
            user.phoneNumber || null,
            user.country || null,
            user.province || null,
            user.city || null,
            user.postalCode || null,
            user.address || null,
            user.CUIT || null,
            user.bank || null,
            user.CBU || null,
            user.politicallyExposed || false,
            user.UIFRequired || false,
            user.fiscalResident_outside_argentina || false,
            user.termsAndConditions_read || false,
            user.isVerified || false,
          ];



        const [result] = await db.execute(query, values);


       console.log('Registration successful. Sending response.');
      return res.status(200).json({ 
        success: true,
        message: 'User created and files uploaded to Google Drive', 
        imageDriveIds 
      });
      
    } catch (err) {
      console.error('Error handling registration:', err);
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid request', 
        message: err.message 
      });
    }
  }
);

export default router;