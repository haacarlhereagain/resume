import './styles/style.scss';

const createModalWrapper = () => {
    const modalWrapper = document.createElement('div');
    modalWrapper.id = 'modalWrapper';
    document.body.appendChild(modalWrapper);
}

export default () => {
    createModalWrapper();
}