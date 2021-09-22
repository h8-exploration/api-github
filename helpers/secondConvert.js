const secondConvert = (param) => {
	var sec_num = parseInt(param);
	var hours = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - hours * 3600) / 60);
	var seconds = sec_num - hours * 3600 - minutes * 60;

	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}

	let payload = "";
	if (hours > 0) payload += hours + " hrs ";
	if (minutes > 0) payload += minutes + " mins ";
	if (seconds > 0) payload += seconds + " secs ";

	// return hours + " hrs " + minutes + " mins " + seconds + " secs";
	return payload;
};

module.exports = secondConvert;
