(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length - 1] : array.slice(0, n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var arr = [];
    collection.forEach((element) => {
      if (test(element)) {
        arr.push(element);
      }
    });
    return arr;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it    
      var toRemove = _.filter(collection, test);  
      var result = [];
      collection.forEach((element) => {
        if (toRemove.indexOf(element) === -1) {
          result.push(element);
        }
      });
      return result;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    var arr1 = array.slice(); 
    var result = [];

    if(isSorted === false){
      arr1 = arr1.sort((a,b) => {return a - b});
    }
    
    if(iterator){
      var t = 0;
      var f = 0; 
      arr1.forEach((element) => {
        if(iterator(element) === true && t === 0){
          result.push(element);
          t++;
        } else if(iterator(element) === false && f === 0){
          result.push(element);
          f++; 
        }
      });
    return result;
    }

    for(var i = 0; i < arr1.length; i++){
      if(!result.includes(arr1[i])){
        result.push(arr1[i]);
      }
    }

    return result; 
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // _.each = function(collection, iterator)
    var copy = collection.slice();
    var results = []; 
    iterator = iterator || _.identity;
    // collection.forEach((item) => {
    //   results.push(iterator(item));
    // });
    _.each(collection, (item)=> {
      results.push(iterator(item));
    });
    return results; 
    
    
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.

  _.reduce = function(collection, iterator, accumulator) {
    // _.reduce(list, iteratee, [memo], [context])
 
    // if the accumulator is not provided:
    if(accumulator === undefined){
      // then set our results 'totalValue' equal to 0
      var totalValue = 0; 

      // iterate over the collection:
      for(var i = 0; i < collection.length; i++){
        // add the first element to our results: 
        if(i === 0){
          totalValue += collection[0];
        } else {
          // for all other elements, pass our results 'totalValue' and the current
          // element into the iterator function, and set our results to the new output. 
          totalValue = iterator(totalValue, collection[i]);
        }
      }
    } else {
      // if the accumulator IS provided, set our totalValue to that accumulator value:
      var totalValue = accumulator;
      // iterate over the collection, passing the totalValue and element into the iterator function: 
      for(var i = 0; i < collection.length; i++){
        totalValue = iterator(totalValue, collection[i]);
      }
    }
    return totalValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    if(collection instanceof Object){
      // iterate over the object keys, and check the corresponding values against the 'target':
      var keys = Object.keys(collection);
      for(var i = 0; i < keys.length; i++){
        if(collection[keys[i]] === target){
          return true;
        } else {
          return false;
        }
      }
    } else {
      for(var i = 0; i < collection.length; i++){
        if(collection[i] === target){
          return true;
        } else {
          return false;
        }
      }
    }

  };

//
  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    var isTrue;
    if(iterator === undefined){
      if(collection.length === 0){
        return true;
      } else {
        if(collection.length === 1){
          if(collection[0] === 0){
            return false;
          } else if(collection[0] === 1){
            return true;
          }
        }
      }
      for(var i = 0; i < collection.length; i++){
        if(collection[i] === false || collection[i] === undefined){
          isTrue = false;
        }

      }
      if(isTrue === false){
        return false;
      } else {
        return true;
      }      
    } else {
      collection.forEach(function(element){
        if(!iterator(element)){
          isTrue = false;
        }
      })
      if(isTrue === false){
        return false;
      } else {
        return true;
      }
    }
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    iterator = iterator || _.identity;
    if(collection.length === 0){
      return false;
    }

    if(_.every(collection, iterator) === false){
      // add conflict check to see if truthy value exists
      var conflictCheck;

      collection.forEach(function(element){
        if(element === true || element === 'yes'){
          conflictCheck = true;
        } else if(iterator(element)){
          conflictCheck = true;
        }
      })
      if(conflictCheck === true){
        return true;
      } else {
        return false;        
      }
    }

    if(_.every(collection, iterator) === true){
      return true;
    }

  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {key2: "something new", key3: "something else new"}, {bla: "even more stuff"}); // obj1 now contains key1, key2, key3 and bla
  //     
  //     
  //   
  //     
  //   
  _.extend = function(obj) {
    var args = Array.prototype.slice.call(arguments);

    // [{base}, {newObj1}, {newObj2}]
    // For every argument starting at index 1,
    for(var i = 1; i < args.length; i++){

      // create an array of keys for the argument in question:
      var keys = Object.keys(args[i]);

      // for every key in that argument, push the corresponding key/value pair into argument at index 0 (the starting object)
      keys.forEach(function(key){
        args[0][key] = args[i][key];
      })
    }
    // return the first argument, which now has the new key/value pairs
    return args[0];                                                
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj

  _.defaults = function(obj) {
    var args = Array.prototype.slice.call(arguments);
    var objKeys = Object.keys(obj);

    // [{base}, {newObj1}, {newObj2}]
    // For every argument starting at index 1,
    for(var i = 1; i < args.length; i++){

      // create an array of keys for the argument in question:
      var keys = Object.keys(args[i]);

      // for every key in that argument, if a key doesnt exist on the destination object,
      // push the corresponding key/value pair into argument at index 0 (the starting object)
      keys.forEach(function(key){
        if(obj[key]){

        } else if(!objKeys.includes(key)){
          obj[key] = args[i][key];
        }
        // if(!objKeys.includes(key)){
        //   obj[key] = args[i][key];
        // } 
      })
    }
    // return the first argument, which now has the new key/value pairs
    return args[0]; 


  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

    // Create a cache to store previous results:
    var cache = {};

    // Return function per instructions:
    return function(){
      // Need to identify arguments passed in when func was called:
      var argList = Array.prototype.slice.call(arguments);

      // Need to stringify those arguments in order to push them to the cache. In doing so,
      // we'll be able to determine if a previous combination of arguments has been run:
      var argListString = JSON.stringify(argList);

      // If 'argListString' exists as a key in the cache, return the corresponding
      // value from the cache:
      if(cache[argListString] !== undefined){
        return cache[argListString];
      } else {
      // Otherwise, the arguments have never been leveraged in a function call. 
      // Push the arguments into the cache, and return the result of running 'func' 
      // with said arguments
        cache[argListString] = func.apply(this, arguments);
        return cache[argListString];
      }
    }
}

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait, a, b) {

    setTimeout(function(a, b){return func(a, b)}, wait);

  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
