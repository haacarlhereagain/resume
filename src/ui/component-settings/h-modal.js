import {computed, nextTick, onBeforeUnmount, onMounted, ref, watch} from "vue";
import freeZIndexGetter from "../utils/freeZIndexGetter";
import {disableAppScroll, enableAppScroll} from "../utils/scrollDisabler";
import listenerBuilder from "../utils/listenerBuilder";
import {MODAL_START_Z_INDEX} from "../const";

export const hModalProps = {
    modelValue: {
        type: Boolean,
        default: false
    },
    maxWidth: {
        type: Number,
        default: undefined
    },
    persistent: {
        type: Boolean,
        default: false,
    },
    hideTitle: {
        type: Boolean,
        default: false,
    },
    title: {
        type: [String, Number],
        default: ''
    },
    hideCloseButton: {
        type: Boolean,
        default: false
    }
}

export const hModalEmits = ['update:modelValue'];

export const useHModal = ({props, emit}) => {

    const zIndex = ref('');

    watch(() => props.modelValue, (val) => nextTick(() => val ? onOpen() : onClose()))

    const onOpen = () => nextTick(() => {
        zIndex.value = freeZIndexGetter('.h-modal__wrapper', MODAL_START_Z_INDEX);
        disableAppScroll();
    });

    const wrapper = ref();

    const onClose = () => {
        zIndex.value = '';
        !document.querySelector('.h-modal--active') && enableAppScroll();
    };

    const windowStyles = computed(() => ({
        maxWidth: props.maxWidth ? `${props.maxWidth}px` : ''
    }))

    const wrapperStyles = computed(() => ({
        zIndex: zIndex.value
    }))

    const classes = computed(() => ({
        'h-modal--persistent': props.persistent,
        'h-modal--active': props.modelValue
    }))

    const closeModal = () => {
        emit('update:modelValue', false);
    }

    let wrapperIsPressed = false;

    const addListeners = () => {
        removeListeners();
        listenerBuilder.addListener('mousedown', wrapper.value, (event) => {
            if (props.modelValue && event.target === wrapper.value) {
                wrapperIsPressed = true;
            }
        });
        listenerBuilder.addListener('mouseup', wrapper.value, (event) => {
            (props.modelValue && wrapperIsPressed && event.target === wrapper.value) && closeModal();
            wrapperIsPressed = false;

        });
    }

    const removeListeners = () => {
        listenerBuilder.removeListener('click', wrapper.value);
    }

    watch(() => props.persistent, (val) => {
        !val ? addListeners() : removeListeners();
    })

    onMounted(() => {
        !props.persistent && addListeners();
        props.modelValue && onOpen();
    })

    onBeforeUnmount(() => {
        removeListeners();
        props.modelValue && onClose();
    })

    return {
        classes,
        wrapperStyles,
        wrapper,
        windowStyles,
        closeModal
    }
}