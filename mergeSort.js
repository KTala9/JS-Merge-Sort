;(function() {
	'use strict';

	var input, output,
		nInputLength,
		nComplexity = 0;

	function createRandomIntArray(length) {
		var aRandomArray = [], i;

		for (i = 0; i < length; i++) {
			aRandomArray.push(Math.floor(10000 * Math.random()));
		}

		return aRandomArray;
	}

	function mergeSort(a) {
		var nArrayMid, a1, a2, aSorted, nStartTime;

		nComplexity = nComplexity + 1;

		nStartTime = Date.now();

		if (a.length === 1) {
			aSorted = a;
		} else {
			nArrayMid = Math.floor(a.length / 2);
			a1 = a.slice(0, nArrayMid);
			a2 = a.slice(nArrayMid, a.length);

			aSorted = merge(mergeSort(a1).result, mergeSort(a2).result);
		}

		return {
			result: aSorted,
			startTime: nStartTime,
			endTime: Date.now()
		};
	}

	function merge(a1, a2) {
		var nTotalLength = a1.length + a2.length,
			aMerged = [],
			i = 0,
			j = 0;

		while (aMerged.length < nTotalLength) {
			nComplexity = nComplexity + 1;

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

	nInputLength = process.argv[2] || 1000;
	input = createRandomIntArray(nInputLength);
	output = mergeSort(input);

	console.log('Original Array: ', input);
	console.log('Sorted Array: ', output.result);
	console.log('Execution time: ', output.endTime - output.startTime);
	console.log('Operations per item: ', nComplexity / nInputLength);
}());