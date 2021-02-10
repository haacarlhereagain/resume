<template>
    <teleport to="#app">
        <div
            class="modal"
            :class="{ 'modal--not-persistent' : !persistent }"
            ref="modal"
        >
            <transition name="fade">
                <div class="modal__layout" v-show="isOpened">
                    <div class="modal__shield" ref="modalShield"></div>
                    <div class="modal__window" :style="style">
                        <slot></slot>
                    </div>
                </div>
            </transition>
        </div>
    </teleport>
</template>

<script>
	import {defineComponent, computed, ref, onBeforeUnmount} from 'vue'
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

			onBeforeUnmount(() => document.removeEventListener('mousedown', checkDocumentClick));

			let firstLayout = ref(false);
			const modalShield = ref(null);
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
				if (modalShield.value && modalShield.value === e.target) {
					isOpened.value = false;
				}
			}

			const openModal = () => {
				setZIndex();
				let html = document.getElementsByTagName('html')[0];
				firstLayout.value = !html.classList.contains(HaveOpenedModal);
				if (firstLayout.value) {
					html.style.overflow = 'hidden';
					html.classList.add(HaveOpenedModal);
				}
				if (!props.persistent) {
					document.addEventListener('mousedown', checkDocumentClick)
				}
			}

			const setZIndex = () => {
				let zIndex = 200;
				const childsAppEl = document.getElementById('app').children;
				for (let child of childsAppEl) {
					if (child.classList.contains('modal') && child.style.zIndex >= zIndex) {
						zIndex = +child.style.zIndex + 1;
					}
				}
				setTimeout(() => modal.value.style.zIndex = zIndex, 0);
			}

			const closeModal = () => {
				if (!props.persistent) {
					document.removeEventListener('mousedown', checkDocumentClick)
				}
				if (firstLayout.value) {
					let html = document.getElementsByTagName('html')[0];
					html.style.overflow = 'auto';
					html.classList.remove(HaveOpenedModal);
				}
				firstLayout.value = false;
				setTimeout(() => modal.value.style.zIndex = 199, 0);
			}

			const style = computed(() => props.maxWidth ? `max-width: ${props.maxWidth}px` : '');

			return {
				isOpened,
				firstLayout,
				style,
				modalShield,
				modal
			}
		}
	})
</script>

<style lang="scss" scoped>

    .modal {
        &.modal--not-persistent {
            .modal__shield {
                cursor: pointer;
            }
        }
    }

    .modal__layout {
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: fixed;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #0000008d;
        padding: 0px 12px;
        z-index: inherit;

        .modal__shield {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }

        &.fade-enter-active, &.fade-leave-active {
            transition: opacity 150ms ease;
        }

        &.fade-enter-from, &.fade-leave-to {
            opacity: 0;
        }

        .modal__window {
            background-color: #fff;
            border-radius: 6px;
            position: relative;
            max-height: 90%;
            overflow: auto;
        }
    }
</style>
