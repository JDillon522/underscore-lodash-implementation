var _ = {};

// ARRAYS

// _.first(array, [n])
// Returns an array with the first n elements of an array.
// If n is not provided it returns an array with just the first element.
_.first = function (array, n) {
	// Check if an array is not an array (like a number, undefined, etc)
	// But allow an array-like object derived from an object's arguments
	if (!array || (!Array.isArray(array) && !array.length)) {
		return [];
	}

	// If there is no n, or if n is zero or a neg
	if (!n || n <= 0) {
		return [array[0]];
	}

	var res = [];
	// If n is greater than the array
	if (n && n > array.length) {
		return array;
	}
	// Normal case
	for(let i = 0; i < n; i++) {
		res.push(array[i])
	}
	return res;
};

// _.last(array, [n])
// Returns an array with the last n elements of an array.
// If n is not provided it returns an array with just the last element.
_.last = function (array, n) {
	// Check if an array is not an array (like a number, undefined, etc)
	// But allow an array-like object derived from an object's arguments
	if (!array || (!Array.isArray(array) && !array.length)) {
		return [];
	}

	// If there is no n, or if n is zero or a neg
	if (!n || n <= 0) {
		return [array[array.length - 1]];
	}

	var res = [];
	// If n is greater than the array
	if (n && n > array.length) {
		return array;
	}
	// Normal case
	// Use iteration to track how many times we've gone through compared to n
	// Use i to track the correct index
	let iteration = 1;
	for(let i = array.length - 1; iteration <= n; i--, iteration++) {
		res.unshift(array[i])
	}
	return res;
};

// _.uniq(array)
// Produces a duplicate-free version of the array, using === to test equality.
// In particular only the first occurence of each value is kept.
_.uniq = function (array) {
	// No change other than variable names and declarations
	let res = [array[0]];
	let current;
	let flag = false;

	for(let i = 1; i < array.length; i++) {
		current = array[i];
		flag = false;
		for(let j = 0; j< res.length; j++) {
			if(current === res[j]) {
				flag = true;
			}
		}
		if(flag === false) {
			res.push(current);
		}
	}
	return res;
};

// OBJECTS

// _.extend(destination, source)
// Copies all the own enumerable properties in the source object over
// to the destination object, and returns it (without using `Object.assign`).
_.extend = function (destination, source) {
	for(const property in source) {
		// changed the check from destination to source. You were checking the wrong property and thats why it didnt copy
		if(source.hasOwnProperty(property)) {
			destination[property] = source[property];
		}
	}
	return destination;
};

// _.defaults(destination, source)
// Fills in undefined properties in the destination object
// with own enumerable properties present in the source object,
// and returns the destination object.
_.defaults = function (destination, source) {
	for(const property in source) {
		// If the property doesnt exist on the destination, copy it
		// source.hasOwnProperty checks if the "property" exists only the object and ignores its prototype
		if(!destination[property] && source.hasOwnProperty(property)) {
			destination[property] = source[property];
		}
	}
	return destination;
};

// COLLECTIONS

// _.each(collection, iteratee, [context])
// Iterates over a collection of elements (i.e. array or object),
// yielding each in turn to an iteratee function, that is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Returns the collection for chaining.
_.each = function (collection, iteratee, context) {
	// You can iterate over Arrays and Objects by using the keys that are returned as strings
	const keys = Object.keys(collection);

	for (let i = 0; i < keys.length; i++) {
		// If its an array it expects key to be a number, so we check
		const key = Array.isArray(collection) ? parseInt(keys[i]) : keys[i];

		// hasOwnProperty also works on Arrays because Array is just an extension of Object
		if (Object.hasOwnProperty.call(collection, key)) {
			iteratee.call(context, collection[key], key, collection);
		}
	}

	return collection;
};

// _.contains(collection, value)
// Returns an array of indexes / keys where value can be found in the collection.
// TIP: here's a demo of how you can re-use already implemented methods in clever ways.
_.contains = function (collection, value) {
  var res = [];
  _.each(collection, function (el, key) {
    el === value && res.push(key);
  });
  return res;
};

// _.map(collection, iteratee, [context])
// Returns a new array of values by mapping each value in collection through iteratee.
// Each invocation of iteratee is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
_.map = function (collection, iteratee, context) {
	const arr = [];
	// You can iterate over Arrays and Objects by using the keys that are returned as strings
	const keys = Object.keys(collection);

	for (let i = 0; i < keys.length; i++) {
		// If its an array it expects key to be a number, so we check
		const key = Array.isArray(collection) ? parseInt(keys[i]) : keys[i];

		// hasOwnProperty also works on Arrays because Array is just an extension of Object
		if (Object.hasOwnProperty.call(collection, key)) {
			arr.push(iteratee.call(context, collection[key], key, collection));
		}
	}
	return arr;
};

// _.reduce(collection, iteratee, [accumulator], [context])
// Reduce boils down a collection of values into a single value.
// Accumulator is the initial state of the reduction,
// and each successive step of it should be returned by iteratee.
// Iteratee is passed four arguments: (accumulator, element, index|key, collection),
// and bound to the context if one is passed. If no accumulator is passed
// to the initial invocation of reduce, iteratee is not invoked on the first element,
// and the first element is instead passed as accumulator for the next invocation.
_.reduce = function (collection, iteratee, accumulator, context) {
	const keys = Object.keys(collection);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		if (Object.hasOwnProperty.call(collection, key)) {
			if (!accumulator) {
				accumulator = collection[keys[i]];
			} else {
				const res = iteratee.call(context, accumulator, collection[key], key, collection);
				accumulator = res;
			}
		}
	}
	return accumulator;
};

// _.filter(collection, predicate, [context])
// Looks through each value in the collection, returning an array of all the values
// that pass a truth test (predicate). Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
_.filter = function (collection, predicate, context) {
	const arr = [];
	const keys = Object.keys(collection);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		if (Object.hasOwnProperty.call(collection, key)) {
			const res = predicate.call(context, collection[key], key, collection);
			if (res) {
				arr.push(collection[key]);
			}
		}
	}
	return arr;
};

// _.reject(collection, predicate, [context])
// Looks through each value in the collection, returning an array of all the values
// that don't pass a truth test (predicate). Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// TIP: can you reuse _.filter()?
_.reject = function (collection, predicate, context) {
	const arr = [];
	const keys = Object.keys(collection);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		if (Object.hasOwnProperty.call(collection, key)) {
			const res = predicate.call(context, collection[key], key, collection);
			if (!res) {
				arr.push(collection[key]);
			}
		}
	}
	return arr;
};

// _.every(collection, [predicate], [context])
// Returns true if all values in the collection pass the predicate truth test.
// Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Short-circuits and stops traversing the list if a false element is found.
// TIP: without the short-circuiting you could reuse _.reduce(). Can you figure how?
// Because of the short-circuiting though, you need to implement it in a similar way as you did at _.each.
_.every = function (collection, predicate, context) {
	const keys = Object.keys(collection);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		if (Object.hasOwnProperty.call(collection, key)) {
			const res = predicate.call(context, collection[key], key, collection);
			if (!res) {
				return false;
			}
		}
	}
	return true;
};

// _.some(collection, [predicate], [context])
// Returns true if any value in the collection passes the predicate truth test.
// Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Short-circuits and stops traversing the list if a true element is found.
// TIP: what method that you have already implemented can be reused here?
_.some = function (collection, predicate, context) {
	const keys = Object.keys(collection);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		if (Object.hasOwnProperty.call(collection, key)) {
			const res = predicate.call(context, collection[key], key, collection);
			if (res) {
				return true;
			}
		}
	}
	return false;
};

// _.invoke(collection, methodName, *arguments)
// Returns an array with the results of calling the method
// indicated by methodName on each value in the collection.
// Any extra arguments passed to invoke will be forwarded on to the method invocation.
_.invoke = function (collection, methodName) {
	const arr = [];
	const keys = Object.keys(collection);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		if (Object.hasOwnProperty.call(collection, key)) {
			const args = Array.from(arguments).slice(2);
			arr.push(collection[key][methodName](...args))
		}
	}
	return arr;
};

// _.pluck(collection, propertyName)
// A convenient version of what is perhaps the most common use-case for map:
// given an array of objects (collection), iterates over each element
// in the collection, and returns an array with all the values
// corresponding to the property indicated by propertyName.
_.pluck = function (collection, propertyName) {
	const arr = [];
	const keys = Object.keys(collection);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		if (Object.hasOwnProperty.call(collection, key)) {
			arr.push(collection[key][propertyName] || undefined);
		}
	}

	return arr;
};

// FUNCTIONS

// _.once(func)
// Creates a version of the function that can only be called one time
// (with any arguments). Repeated calls to the modified function
// will have no effect, returning the value from the original call.
// Useful for initialization functions, instead of having to set
// a boolean flag and then check it later.
_.once = function (func) {
	let result;
	let called = false;
	return function(data) {
		if (!called) {
			called = true;
			result = func(data);
		}
		return result;
	}
};

// _.memoize(func)
// Memoizes a given function by caching the computed result.
// Useful for speeding up slow-running computations.
// You may assume that the memoized function takes only one argument
// and that it is a primitive. Memoize should return a function that when called,
// will check if it has already computed the result for the given argument
// and return that value instead of recomputing it.
_.memoize = function (func) {
	let cache;
	let args;
	return function(data){
		if (cache != undefined && args === data) {
			return cache;
		} else {
			args = data;
			let fun = func(data);
			cache = fun;
			return cache;
		}
	}
};

// _.delay(function, wait, *arguments)
// Much like setTimeout(), invokes function after waiting milliseconds.
// If you pass the optional arguments, they will be forwarded
// on to the function when it is invoked.
_.delay = function (func, wait) {
	setTimeout(() => {
		let args = [];
		if (arguments.length > 2) {
			args = Array.from(arguments).slice(2);
		}
		func.call(this, ...args);
	}, wait);
};

// _.throttle(function, wait)
// Returns a new, throttled version of the passed function that,
// when invoked repeatedly (with any arguments), calls the original function
// at most once every wait milliseconds, and otherwise just returns
// the last computed result. Useful for rate-limiting events
// that occur faster than you can keep up with.
_.throttle = function (func, wait) {
	let waiting = false;

	return function () {
		if (!waiting) {
			waiting = true;
			let args = [];
			if (arguments.length > 2) {
				args = Array.from(arguments).slice(2);
			}
			func.call(this, ...args);
			setTimeout(() => {
				waiting = false;
			}, wait);
		}
	}
};

// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = _;
}
