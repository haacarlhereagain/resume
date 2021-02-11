const DefaultOptions = {
	color: 'rgba(84, 0, 122, 0.1)',
	sizeRatio: 3,
	duration: 400,
}

class Ripple {
	constructor(props) {
		this.color = undefined;
		this.targetEl = undefined;
		this.targetElIsPressed = false;
		this.pressTargetEl = this.pressTargetEl.bind(this);
		this.unpressTargetEl = this.unpressTargetEl.bind(this);
		this.rippleContainer = undefined;
		this.size = [0, 0];
		this.setOptions(props);
	}

	setOptions({color, targetEl}) {
		this.color = color ? color : DefaultOptions.color;
		this.targetEl = targetEl;
		this.targetEl.addEventListener('mouseleave', this.unpressTargetEl);
		this.targetEl.addEventListener('mousedown', this.pressTargetEl);
		this.targetEl.addEventListener('mouseup', this.unpressTargetEl);
		this.setSize();
	}

	setSize() {
		const targetElSize = this.targetEl.getBoundingClientRect();
		this.size = (targetElSize.width >= targetElSize.height ? targetElSize.width : targetElSize.height) * DefaultOptions.sizeRatio;
	}

	pressTargetEl() {
		this.targetElIsPressed = true;
		if (!this.rippleContainer) {
			this.addContainerRipple();
		}
		this.addRipple(event);
	}

	unpressTargetEl() {
		if (!this.targetElIsPressed) return;
		this.targetElIsPressed = false;
	}

	addRipple(e) {
		const ripple = document.createElement('div');
		ripple.classList.add('ripple__element');
		ripple.style.width = ripple.style.height = `${this.size}px`;
		ripple.style.backgroundColor = this.color;
		ripple.style.left = `${e.offsetX - this.size / 2}px`;
		ripple.style.top = `${e.offsetY - this.size / 2}px`;
		this.rippleContainer.appendChild(ripple);
	}

	addContainerRipple() {
		this.rippleContainer = document.createElement('div');
		this.rippleContainer.classList.add('ripple__container');
		this.targetEl.appendChild(this.rippleContainer);
		this.targetEl.appendChild(this.rippleContainer);
	}

	removeContainerRipple() {
		if (!this.rippleContainer) return;
		this.targetEl.removeChild(this.rippleContainer);
		this.rippleContainer = undefined;
	}

	removeRipple(ripple) {
		if (!this.rippleContainer || !ripple) return;
		this.rippleContainer.removeChild(ripple);
	}

	clearTimeout(timeout) {
		clearTimeout(timeout);
		timeout = undefined;
	}

	destroy() {
		this.targetEl.removeEventListener('mouseleave', this.unpressTargetEl);
		this.targetEl.removeEventListener('mousedown', this.pressTargetEl);
		this.targetEl.removeEventListener('mouseup', this.unpressTargetEl);
		if (this.rippleContainer) {
			this.targetElIsPressed.removeChild(this.rippleContainer);
			this.rippleContainer = undefined;
		}
		this.targetElIsPressed = false;
		delete this.targetEl['_ripple'];
	}
}

export default Ripple;
