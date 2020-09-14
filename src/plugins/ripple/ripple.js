export class RippleButton {
  constructor(parent_element) {
    this.parent_element = parent_element;
    this.parent_element.addEventListener('mousedown', this.mouseDown.bind(this));
    this.func = null;
    this.last_ripple = null;
  }

  mouseDown() {
    this.func = this.mouseUp.bind(this);
    app.addEventListener('mouseup', this.func);
    this.parent_element.classList.add('is-pressed');
    this.addRipple();
  }

  mouseUp() {
    app.removeEventListener('mouseup', this.func);
    this.func = null;
    this.parent_element.classList.remove('is-pressed');
    if (!this.last_ripple.classList.contains('in')) {
      this.removeRipple(this.last_ripple);
      this.last_ripple = null;
    }
  }

  addRipple() {
    let size_parent_element = [this.parent_element.clientWidth, this.parent_element.clientHeight];
    let ripple = document.createElement('div');
    ripple.classList.add('ripple__container');
    ripple.classList.add('in');
    let size = size_parent_element[0] > size_parent_element[1] ? size_parent_element[0] : size_parent_element[1];
    ripple.style.width = `${size * 3}px`;
    ripple.style.height = `${size * 3}px`;
    ripple.style.background = '#54007a21';
    ripple.style.left = `${event.layerX - size * 1.5}px`;
    ripple.style.top = `${event.layerY - size * 1.5}px`;
    this.last_ripple = ripple;
    this.parent_element.appendChild(ripple);
    setTimeout(() => {
      ripple.classList.remove('in');
      if (this.func && ripple === this.last_ripple) return;
      this.removeRipple(ripple);
    }, 400)
  }

  removeRipple(ripple) {
    if (ripple.classList.contains('in')) return;
    this.parent_element.removeChild(ripple);
  }
}
