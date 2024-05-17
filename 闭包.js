const tasks = []; // 这里存放异步操作的 Promise
const output = (time) => new Promise((resolve) => {
    setTimeout(resolve, time);
});

// 生成全部的异步操作
(async () =>  {
	for (var i = 0; i < 5; i++)
	{
		await output(1000)
		console.log(new Date, i);
	}
	await output(1000)
		console.log(new Date, i);
})();


