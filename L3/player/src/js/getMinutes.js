export function getMinutes(t) {
	var min = parseInt(parseInt(t) / 60);
	var sec = parseInt(t % 60);
	if (sec < 10) {
		sec = "0" + sec
	}
	if (min < 10) {
		min = "0" + min
	}
	return min + ":" + sec
}