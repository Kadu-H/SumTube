import './video';

const onSubmitVideo = () => {
    const form = document.querySelector("#formLink");
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    
        const formData = new FormData(form);
        const urlVideo = formData.get("videoLink");
        loadVideo(urlVideo);
    })
}