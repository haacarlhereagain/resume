<template>
    <teleport to="#app">
        <div class="modal" ref="modal">
            <transition name="fade">
                <div class="modal-layout flex-row" v-if="isOpened">
                    <div class="modal-window" :style="style">
                        <slot></slot>
                    </div>
                </div>
            </transition>
        </div>
    </teleport>
</template>

<script>
	import {defineComponent, computed, ref, onBeforeMount, onBeforeUnmount} from 'vue'
	import {HaveOpenedModal} from "../const";

	export default defineComponent({
		emits: ['opened', 'update:isOpened'],
		props: {
			isOpened: {
				type: Boolean,
				default: () => {
					return false;
				}
			},
			maxWidth: {
				type: Number,
				default: () => {
					return undefined;
				}
			},
			persistent: {
				type: Boolean,
				default: () => {
					return false;
				}
			}
		},
		setup(props, {emit}) {

			onBeforeMount(() => {
				if (!props.persistent) {
					document.addEventListener('click', checkDocumentClick)
				}
			});
			onBeforeUnmount(() => document.removeEventListener('click', checkDocumentClick));

			let firstLayout = ref(false);
			const modal = ref(null);

			const isOpened = computed({
				get: () => {
					props.isOpened ? openModal() : closeModal();
					return props.isOpened;
				},
				set: (e) => {
					emit('update:isOpened', e);
				}
			})

			const checkDocumentClick = (e) => {
				const modalLayout = modal.value.children[0];
				if (modalLayout && modalLayout === e.target) {
					isOpened.value = false;
				}
			}

			const openModal = () => {
				setZIndex()
				let html = document.getElementsByTagName('html')[0];
				firstLayout.value = !html.classList.contains(HaveOpenedModal);
				if (firstLayout.value) {
					html.style.overflow = 'hidden';
					html.classList.add(HaveOpenedModal);
				}
			}

			const setZIndex = () => {
				let zIndex = 200;
				const childsAppEl = document.getElementById('app').children;
				for (let child of childsAppEl) {
					if (child.classList.contains('modal') && child.style.zIndex > zIndex) {
						zIndex = child.style.zIndex;
					}
				}
				setTimeout(() => modal.value.style.zIndex = zIndex, 0);
			}

			const closeModal = () => {
				if (firstLayout.value) {
					let html = document.getElementsByTagName('html')[0];
					html.style.overflow = 'auto';
					html.classList.remove(HaveOpenedModal);
				}
				firstLayout.value = false;
				setTimeout(() => modal.value.zIndex = 199, 0);
			}

			const style = computed(() => props.maxWidth ? `max-width: ${props.maxWidth}px` : '');

			return {
				isOpened,
				firstLayout,
				style,
				modal
			}
		}
	})
</script>

<style lang="scss" scoped>

    .modal-layout {
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: fixed;
        justify-content: center;
        align-items: center;
        z-index: 200;
        background-color: #0000008d;
        padding: 0px 12px;

        &.fade-enter-active, &.fade-leave-active {
            transition: opacity 150ms ease;
        }

        &.fade-enter-from, &.fade-leave-to {
            opacity: 0;
        }

        .modal-window {
            background-color: #fff;
            border-radius: 6px;
            position: relative;
            max-height: 90%;
            overflow: auto;
        }
    }
</style>
