import { onSubmitVideo, onSubmitPDF } from './form.js';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js';

const form = document.getElementById("formLink");
const gerPDF = document.getElementById("gerPDF");
form.addEventListener("submit", onSubmitVideo);
gerPDF.onclick = onSubmitPDF;