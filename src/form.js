import {loadVideo} from './video';

export const onSubmitVideo = (e) => {
    e.preventDefault();
    const form = document.querySelector("#formLink");
    
    const formData = new FormData(form);
    const urlVideo = formData.get("videoLink");
    loadVideo(urlVideo);
}