let eventIds = new Set();

/**
 * Decodes a given string using base64
 *
 * https://stackoverflow.com/questions/23888484/how-to-get-event-id-from-google-calendar-page-with-javascript
 *
 * @param {string} s - The string to decode.
 * @returns {string} The decoded string.
 */
function decode(s) {
	const decoded = atob(s);
	res = decoded.split(' ')[0];
	return res;
}

const handleClick = (event) => {
	if (event.metaKey) {
		const div = event.currentTarget;
		const eventId = div.getAttribute('data-eventid');
	
		if (!eventId) {
			return;
		}
	
		decodedEventId = decode(eventId);
		eventIds.add(decodedEventId);
		console.log(eventIds);
	}
};

setTimeout(() => {
	const divs = document.querySelectorAll('div');
	divs.forEach((div) => {
		div.addEventListener('click', handleClick);
	});
	console.log('Script loaded');
}, 2000);

