/**
 * A simple node command line utility which sorts an array using the Merge Sort algorithm.
 * 
 * @example 	node mergeSort.js '[3,2,1]'
 * 
 * @example 	cat myArray.txt | node mergeSort.js
 */
;(function() {
	'use strict';

	/**
	 * Sorts an array of numbers in ascending order.
	 *
	 * @param      {array}  aToSort  The input array.
	 * @return     {array}  A sorted array.
	 */
	function mergeSort(aToSort) {
		var nArrayMid,
			a1, a2,
			aSorted;

		if (aToSort.length === 1) {
			aSorted = aToSort;
		} else {
			nArrayMid = Math.floor(aToSort.length / 2);
			a1 = aToSort.slice(0, nArrayMid);
			a2 = aToSort.slice(nArrayMid, aToSort.length);

			aSorted = merge(mergeSort(a1), mergeSort(a2));
		}

		return aSorted;
	}

	/**
	 * Merges two arrays, assuming both are sorted.
	 *
	 * @param      {array}  a1      An array of numbers in ascending order.
	 * @param      {array}  a2      An array of numbers in ascending order.
	 * @return     {array}   		An array of all the numbers from a1 and a2, in ascending order.
	 */
	function merge(a1, a2) {
		var nTotalLength = a1.length + a2.length,
			aMerged = [],
			i = 0,
			j = 0;

		while (aMerged.length < nTotalLength) {
			if (a1[i] === undefined) {
				aMerged.push(a2[j]);
				j = j + 1;
			}
			else if (a2[j] === undefined) {
				aMerged.push(a1[i]);
				i = i + 1;
			}
			else if (a1[i] <= a2[j]) {
				aMerged.push(a1[i]);
				i = i + 1;
			}
			else {
				aMerged.push(a2[j]);
				j = j + 1;
			}
		}

		return aMerged;
	}

	/**
	 * Parse and sort an input string as an array.
	 *
	 * @param      {string or array}  input  	A string (of JSON) containing precisely an array of numbers.
	 * @return     {array} 				A sorted array.
	 */
	function handleInput(input) {
		return (typeof input === 'string') ? JSON.parse(input) : input;
	}

	// Handle data passed as a command line argument
	if (process.argv[2]) {
		console.log(mergeSort(handleInput(process.argv[2])));
	}

	// Handle data piped via stdin
	else {
		process.stdin.resume();
		process.stdin.setEncoding('utf8');
		process.stdin.on('data', function(data) {
			var aSorted = mergeSort(handleInput(data));
			process.stdout.write( '[' + aSorted.toString() + ']\n');
		});
	}
}());