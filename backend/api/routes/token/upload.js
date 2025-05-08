import express from 'express';
import {db} from '../../db/db.js'
import { parseFileData } from './parser.js';


const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
      
        const item = parseFileData(req.body.data);


            const { SIMBOLO, NOMBRE, VALOR_COMPRA, VALOR_VENTA, STOCK } = item[0];

            await db.query(`
                INSERT INTO pampaTokenVariations 
                (SIMBOLO, NOMBRE, VALOR_COMPRA, VALOR_VENTA, STOCK) 
                VALUES (?, ?, ?, ?, ?)
            `,[SIMBOLO, NOMBRE, VALOR_COMPRA, VALOR_VENTA, STOCK])

            res.status(201).json({ message: 'organization successfully' });
            return;
    } catch (err) {
        console.error(`error cargando datos`)

    }
});

export default router;