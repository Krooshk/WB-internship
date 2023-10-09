export function mix(shuffledList,listAudio) {
	let temporaryArray = []
	for (let i = 0; i < listAudio.length; i++) {
		temporaryArray.push(i);
	}
	temporaryArray.sort(() => Math.random() - 0.7);
	shuffledList[temporaryArray.at(-1)] = { next: temporaryArray[0] };
	temporaryArray.reduce((accum, curr) => {
		shuffledList[accum] = { next: curr };
		return curr;
	}, 0)
	shuffledList[temporaryArray[0]].prev = temporaryArray.at(-1);
	temporaryArray.reduceRight((accum, curr) => {
		shuffledList[accum].prev = curr;
		return curr;
	}, 0);

	return shuffledList;
}