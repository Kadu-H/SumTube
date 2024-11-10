import express from 'express';
export const router = express.Router();
import { getSummary, generatePdf } from '../controller/summary.js';

router.route('/').post(getSummary);
router.route('/pdf').post(generatePdf);