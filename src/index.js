const CLIENT_ID = process.env.CLIENT_ID;
const API_KEY = process.env.API_KEY;

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = process.env.DISCOVERY_DOC;

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = process.env.SCOPES;

let tokenClient;
let gapiInited = false; // google api client
let gisInited = false; // google identity services

/*
==========================
  SET UP
==========================
*/

/**
 * Callback after api.js is loaded.
 */
const gapiLoaded = () => {
	// load and initialize client
	gapi.load('client', initializeGapiClient);
};

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
const initializeGapiClient = async () => {
	await gapi.client.init({
		apiKey: API_KEY,
		discoveryDocs: [DISCOVERY_DOC],
	});
	gapiInited = true;
};

/**
 * Callback after Google Identity Services are loaded.
 */
const gisLoaded = () => {
	tokenClient = google.accounts.oauth2.initTokenClient({
		client_id: CLIENT_ID,
		scope: SCOPES,
		callback: '', // defined later
	});
	gisInited = true;
};

const loadScript = (src, onload) => {
	const script = document.createElement('script');
	script.src = src;
	script.async = true;
	script.defer = true;
	script.onload = onload;
	document.head.appendChild(script);
};

/**
 * Load external scripts and register onload callbacks
 */
loadScript('https://apis.google.com/js/api.js', gapiLoaded);
loadScript('https://accounts.google.com/gsi/client', gisLoaded);

/*
==========================
  AUTH
==========================
*/

/**
 *  Sign in the user upon button click.
 */
const handleAuth = () => {
	// register callback to invoke after user signs in and authorizes data access
	tokenClient.callback = async (resp) => {
		if (resp.error !== undefined) {
			throw resp;
		}
		// await listUpcomingEvents();
		// await insertEvent();

		const eventIds = new Set([
			'7pb9cn3l0q85c7t6mfifk2v0s6',
			'6cl1a3bs2djfgf0d31ltu7b64k',
		]);

		await shiftEvents(eventIds, minutes = 30);
	};

	if (gapi.client.getToken() === null) {
		// Prompt the user to select a Google Account and ask for consent to share their data
		// when establishing a new session.
		tokenClient.requestAccessToken({ prompt: 'consent' });
	} else {
		// Skip display of account chooser and consent dialog for an existing session.
		tokenClient.requestAccessToken({ prompt: '' });
	}
};

/**
 *  Sign out the user
 */
const handleSignout = () => {
	const token = gapi.client.getToken();
	if (token !== null) {
		google.accounts.oauth2.revoke(token.access_token);
		gapi.client.setToken('');
	}
};

/*
==========================
  API CALLS
==========================
*/

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
const listUpcomingEvents = async () => {
	let response;
	try {
		const request = {
			calendarId: 'primary',
			timeMin: new Date().toISOString(),
			showDeleted: false,
			singleEvents: true,
			maxResults: 10,
			orderBy: 'startTime',
		};
		response = await gapi.client.calendar.events.list(request);
	} catch (err) {
		console.error(err);
		return;
	}

	const events = response.result.items;
	if (!events || events.length == 0) {
		console.log('No events found');
		return;
	}

	// Flatten to string to display
	const output = events.reduce(
		(str, event) =>
			`${str}${event.summary} (${event.start.dateTime || event.start.date}) ${
				event.id
			}\n`,
		'Events:\n'
	);

	console.log(output);
};

const insertEvent = async () => {
	const event = {
		summary: 'Google I/O 2015',
		start: {
			dateTime: '2024-11-12T09:00:00-07:00',
			timeZone: 'America/Los_Angeles',
		},
		end: {
			dateTime: '2024-11-12T17:00:00-07:00',
			timeZone: 'America/Los_Angeles',
		},
		reminders: {
			useDefault: true,
		},
	};

	const request = gapi.client.calendar.events.insert({
		calendarId: 'primary',
		resource: event,
	});

	await request.execute();
};

const patchEvent = async (eventId, eventPatch, calendarId = 'primary') => {
	const request = gapi.client.calendar.events.patch({
		calendarId: calendarId,
		eventId: eventId,
		resource: eventPatch,
	});

	await request.execute((jsonResp) => {
		if (jsonResp.error) {
			console.error('Patch error: ', jsonResp.message);
		} else {
			console.log('Patched event');
		}
	});
};

//     "start": {
//         "dateTime": "2024-11-08T19:00:00-08:00",
//         "timeZone": "America/Los_Angeles"
//     },
//     "end": {
//         "dateTime": "2024-11-08T19:30:00-08:00",
//         "timeZone": "America/Los_Angeles"

const shiftEvents = async (eventIds, minutes) => {
	for (const eventId of eventIds) {
		const [start, end] = await getStartEnd(eventId);

		// get new start and end datetimes
		newStartDatetime = shiftDateTime(start, minutes);
		newEndDatetime = end;

		const eventPatch = {
			start: {
				dateTime: newStartDatetime,
			},
			end: {
				dateTime: newEndDatetime,
			},
		};

		patchEvent(eventId, eventPatch);
	}
};

/*
Get start and end datetimes for an eventId
*/
const getStartEnd = async (eventId) => {
	const request = gapi.client.calendar.events.get({
		calendarId: 'primary',
		eventId: eventId,
	});

	let start;
	let end;

	await request.execute((resp) => {
		if (resp.error) {
			console.error(resp.message);
		} else {
			start = resp.start.dateTime;
			end = resp.end.dateTime;
		}
	});

	return [start, end]
};

/*
Return a new datetime string that is shifted by minutes
*/
const shiftDateTime = (datetime, minutes) => {
	// TODO
	// add minutes to datetime
	// return new datetime
	return '2024-11-11T19:30:00-08:00';
};

/*
==========================
  Event listeners
==========================
*/

document
	.querySelector('#authorize_button')
	.addEventListener('click', handleAuth);
document
	.querySelector('#signout_button')
	.addEventListener('click', handleSignout);
