import { db } from "./api/db/db.js";

async function createUser() {
  const createTestUser = `
    INSERT INTO users (
    id,
    email,
    password,
    firstName,
    lastName,
    maritalStatus,
    phoneNumber,
    country,
    province,
    city,
    postalCcode,
    address,
    CUIT,
    bank,
    CBU,
    politicallyEexposed,
    UIFRequired,
    fiscalResident_outside_argentina,
    termsAndConditions_read,
    isVerified
    )
    VALUES (
     '1dec852a-74ba-4300-9be2-d7fe9d98a1d8',
     'leandronatochkin@gmail.com',
     'Contra123!!',
     'Leandro',
     'Atochkin',
     'S',
     542235999999,
     'AR',
     'Buenos Aires',
     'Mar del Plata',
     '7600',
     'mitre',
     '20350000007',
     'banco',
     2222222222222222222222,
     0,
     0,
     0,
     0,
     0
    )
  `;




  try {
    await db.query(createTestUser);
    console.log("✅ All tables created successfully (or already exist).");
  } catch (err) {
    console.error("❌ Error creating tables:", err.message);
  } finally {
    db.end();
  }
}

createUser();