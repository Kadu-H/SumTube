import {loadVideo, formatTime, getIdFromUrl} from './video.js';

export const onSubmitPDF = () => {
    if(!onVideo){
        return;
    }

    const data = {
        resumo,
        legenda,
        titulo: player.getVideoData().title
    };

    fetch('http://localhost:5000/pdf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data), 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }
        return response.blob(); // Espera o arquivo PDF como resposta
    })
    .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${data.titulo}.pdf`;  // Nome do arquivo
        link.click(); // Inicia o download
    })
    .catch(error => {
        console.error('Erro ao enviar a requisição:', error);
    });
};

export const onSubmitVideo = async (e) => {
    e.preventDefault();
    const form = document.querySelector("#formLink");
    
    const formData = new FormData(form);
    const urlVideo = formData.get("videoLink");
    videoId = getIdFromUrl(urlVideo);
    loadVideo();

    const data = {
        videoId
    };

    const response = await fetch('http://localhost:5000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data), 
    });

    const responseJson = await response.json();

    console.log(responseJson);
    const resumoTagText = document.querySelector("#resumo");
    resumo = responseJson.summary;
    legenda = responseJson.transcript;
    resumoTagText.textContent = responseJson.summary;
    createLegendas(responseJson.transcript);
    onVideo = true;
}

function createLegendas(transcript){
    const legendaDiv = document.querySelector("#legendaDiv");
    legendaDiv.innerHTML='';
    for (let index = 0; index < transcript.length; index++) {
        const button = document.createElement('button');
        button.classList.add('d-flex', 'justify-content-between', 'border-bottom', 'py-2');
        button.setAttribute('id', 'legendaRow');
        button.setAttribute('offset', transcript[index].offset);
        button.setAttribute('rowNumber', index);
        button.setAttribute('onclick', "clickLegenda(this)");

        button.innerHTML = `
            <div class="fw-bold text-muted">${formatTime(transcript[index].offset)}</div>
            <div class="ms-3 text-end">${transcript[index].text}</div>
        `;

        legendaDiv.appendChild(button);
    };
}
