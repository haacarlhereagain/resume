const HaveOpenedModal = 'have-opened-h-modal';

export const disableAppScroll = () => {
    document.body.classList.add(HaveOpenedModal);
}

export const enableAppScroll = () => {
    document.body.classList.remove(HaveOpenedModal);
}