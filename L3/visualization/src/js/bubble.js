async function bubbleSort() {
	let i, j;
	await sleep(delay);

	for (i = 0; i < size - 1; i++) {
		for (j = 0; j < size - i - 1; j++) {
			if (paused) {
				await new Promise(resolve => setTimeout(resolve, 100));
				j--;
				continue;
			}
			await sleep(delay);

			setColor(j, COMPARE);
			setColor(j + 1, COMPARE);
			await sleep(delay);

			if (arr[j] > arr[j + 1]) {
				swap(j, j + 1);
				await sleep(delay);
			}

			setColor(j, UNSORTED);
			setColor(j + 1, UNSORTED);
		}

		await sleep(delay);

		setColor(j, SORTED);
	}

	setColor(0, SORTED);
}