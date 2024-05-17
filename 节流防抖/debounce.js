function debounce(fn, delay) {
	let timer;
	return function(...args) {
		timer && clearTimeout(timer);
		timer = setTimeout(() => {
			fn.aplly(this, args);
		}, delay)
	}
}