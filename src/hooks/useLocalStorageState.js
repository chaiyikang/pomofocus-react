import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key, callback) {
	const [value, setValue] = useState(function () {
		const storedValue = localStorage.getItem(key);
		if (storedValue) {
			if (callback) callback(storedValue);
			return JSON.parse(storedValue);
		} else {
			if (callback) callback(initialState);
			return initialState;
		}
	});

	useEffect(
		function () {
			localStorage.setItem(key, JSON.stringify(value));
		},
		[value, key]
	);

	return [value, setValue];
}
