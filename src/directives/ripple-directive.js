import '../assets/ripple.scss'
import Ripple from "./Ripple";

const mounted = (targetEl, binding) => {
	targetEl._ripple = new Ripple({targetEl});
}

export default {
	mounted,
}
