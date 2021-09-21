import './modal/modal.scss';
import Modal from "./modal/Modal";

const registerComponents = (app) => {
    app.component('Modal', Modal);
}

export default registerComponents;