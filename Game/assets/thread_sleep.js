/**
*	Java's Thread.sleep ported to Javascript by Noah Enger
*	Usage: Thread.sleep(time,function_inside_a_string);
**/
var timers = require('timers');
const _wait = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

//Java's thread.sleep();
var Thread = {};
Thread.sleep = async (time,stringfunc) => {
  await _wait(time);
  eval(stringfunc);
}
Thread.sleepFunc = function(func,time){
	timers.setTimeout(func,time);
}

//Example
Thread.sleep(5000,"console.log(\"this message should appear after 5 seconds!\");");