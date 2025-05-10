import { db } from "./api/db/db.js";

async function alterTable() {
const removePK = `
DROP TABLE pampaTokenVariations

`


//   const addColumn = `
// ALTER TABLE pampaTokenVariations
// ADD COLUMN variationId INT NOT NULL AUTO_INCREMENT PRIMARY KEY;

//   `;

//   const primKey = `
//   ALTER TABLE pampaTokenVariations
// ADD PRIMARY KEY (variationId)
  //`




  try {
    await db.query(removePK);
    // await db.query(addColumn);
    // await db.query(primKey);
    console.log("✅ All tables created successfully (or already exist).");
  } catch (err) {
    console.error("❌ Error creating tables:", err.message);
  } finally {
    db.end();
  }
}

alterTable();