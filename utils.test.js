const { shiftDateTime } = require('./utils')

describe('shiftDateTime', () => {
	test('shift forward on same day', () => {
		let datetime = '2024-11-11T19:30:00-08:00';
		expect(shiftDateTime(datetime, 30)).toBe('2024-11-11T20:00:00-08:00');
  });
  
	test('shift backward on same day', () => {
		let datetime = '2024-11-11T19:30:00-08:00';
		expect(shiftDateTime(datetime, -30)).toBe('2024-11-11T19:00:00-08:00');
	});

	test('shift forward to next day', () => {
		let datetime = '2024-11-11T23:45:00-08:00';
		expect(shiftDateTime(datetime, 30)).toBe('2024-11-12T00:15:00-08:00');
	});

	test('shift backward to prev day', () => {
		let datetime = '2024-11-12T00:15:00-08:00';
		expect(shiftDateTime(datetime, -30)).toBe('2024-11-11T23:45:00-08:00');
	});
});
