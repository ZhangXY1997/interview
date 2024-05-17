function countDown(ddl) {
	let timer;
	let startTime = Date.now();


	function fn() {
		
		const currentTime = Date.now();
		const elapsedTime = currentTime - startTime;

	
		const time = ddl - (Date.now());
		if (time < 0) {
			timer && clearTimeout(timer);
			return;
		}
		const hour = Math.floor(time / 1000 / 60 / 60 % 24);
		const min = Math.floor(time / 1000 / 60 % 60);
		const sec = Math.floor(time / 1000 % 60);
		console.log(hour + '/' + min + '/' + sec);
		
		timer = setTimeout(() => {
			fn(ddl);
		}, 1000 - elapsedTime % 1000)
	}

	fn();

}

countDown(1714386636303);


// function startTimer(duration, callback) {
//   let timer = null;
//   let remainingTime = duration;
//   const tick = () => {
//     if (remainingTime <= 0) {
//       callback();
//       clearTimeout(timer);
// 		} else
// 		{
// 			console.log(remainingTime)
// 			remainingTime--;
//       timer = setTimeout(tick, 1000);
//     }
//   };
// 	timer = setTimeout(tick, 1000);
// }

// const timer = startTimer(5, () => {
//   console.log("down");
// }); // 设置一个5秒的定时器