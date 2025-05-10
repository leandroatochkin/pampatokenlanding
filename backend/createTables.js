import { db } from "./api/db/db.js";

async function createTables() {
//   const createUsersTable = `
//     CREATE TABLE IF NOT EXISTS users (
//       id VARCHAR(36),
//       email VARCHAR(255) NOT NULL PRIMARY KEY,
//       password VARCHAR(255) NOT NULL,
//       firstName VARCHAR(100) NOT NULL,
//       lastName VARCHAR(100) NOT NULL,
//       middleName VARCHAR(100),
//       maritalStatus CHAR(1),
//       phoneNumber VARCHAR(20),
//       country CHAR(2),
//       province VARCHAR(100),
//       city VARCHAR(100),
//       postalCcode VARCHAR(20),
//       address VARCHAR(255),
//       CUIT VARCHAR(20),
//       bank VARCHAR(100),
//       CBU VARCHAR(30),
//       politicallyEexposed TINYINT(1) DEFAULT 0,
//       UIFRequired TINYINT(1) DEFAULT 0,
//       fiscalResident_outside_argentina TINYINT(1) DEFAULT 0,
//       termsAndConditions_read TINYINT(1) DEFAULT 0,
//       isVerified TINYINT(1) DEFAULT 0,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );
//   `;

//   const createOperationsTable = `
//     CREATE TABLE IF NOT EXISTS operations (
//       operationId VARCHAR(36) PRIMARY KEY,
//       userId VARCHAR(36) NOT NULL,
//       amount INT,
//       operationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
//       operationType TINYINT,
//       symbol VARCHAR(50),
//       value BIGINT
//     );
//   `;

//   const createUserTokensTable = `
//     CREATE TABLE IF NOT EXISTS userTokens (
//       userId VARCHAR(36) NOT NULL,
//       tokenSymbol VARCHAR(36) NOT NULL,
//       tokenName VARCHAR(255) NOT NULL,
//       tokenAmount INT,
//       tokenPaidPrice BIGINT,
//       tokenExpiringDate DATE,
//       PRIMARY KEY (userId, tokenSymbol)
//     );
//   `;

  const createPampaTokenVariationsTable = `
    CREATE TABLE IF NOT EXISTS pampaTokenVariations (
      variationId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      SIMBOLO VARCHAR(50),
      NOMBRE VARCHAR(50),
      VALOR_COMPRA BIGINT,
      VALOR_VENTA BIGINT,
      STOCK BIGINT,
      FECHA_MODIFICACION TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      VENCIMIENTO DATE
    );
  `;


  try {
    // await db.query(createUsersTable);
    // await db.query(createOperationsTable);
    // await db.query(createUserTokensTable);
    await db.query(createPampaTokenVariationsTable);
    console.log("✅ All tables created successfully (or already exist).");
  } catch (err) {
    console.error("❌ Error creating tables:", err.message);
  } finally {
    db.end();
  }
}

createTables();
