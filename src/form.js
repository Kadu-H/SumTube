import {loadVideo, getIdFromUrl, formatTime} from './video';

export const onSubmitVideo = async (e) => {
    e.preventDefault();
    const form = document.querySelector("#formLink");
    
    const formData = new FormData(form);
    const urlVideo = formData.get("videoLink");
    loadVideo(urlVideo);

    const videoId = getIdFromUrl(urlVideo);

    const data = {
        videoId
    };

    const response = await fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data), 
    });

    const responseJson = await response.json();

    console.log(responseJson);
    const resumoTagText = document.querySelector("#resumo");
    resumoTagText.textContent = responseJson.summary;
    createLegendas(responseJson.transcript);
    onVideo = true;
}

function createLegendas(transcript){
    const legendaDiv = document.querySelector("#legendaDiv");
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
