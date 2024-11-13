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

const { getStartEnd, shiftDateTime, patchEvent } = require('../utils');

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

		const eventIds = new Set([
			'7pb9cn3l0q85c7t6mfifk2v0s6',
			'6cl1a3bs2djfgf0d31ltu7b64k',
		]);

		const minutes = 30;
		await shiftEvents(eventIds, minutes);
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

const shiftEvents = async (eventIds, minutes) => {
	for (const eventId of eventIds) {
		try {
			const [start, end] = await getStartEnd(eventId);

			newStartDatetime = shiftDateTime(start, minutes);
			newEndDatetime = shiftDateTime(end, minutes);
	
			const eventPatch = {
				start: {
					dateTime: newStartDatetime,
				},
				end: {
					dateTime: newEndDatetime,
				},
			};
	
			patchEvent(eventId, eventPatch);
			
		} catch (error) {
			console.error('Failed to retrieve start and end times:', error);
		}
	}
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
