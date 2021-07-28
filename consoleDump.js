if (console.everything === undefined) {
  console.everything = [];
  function TS(){
    return (new Date).toLocaleString("sv", { timeZone: 'UTC' }) + "Z"
  }
  window.onerror = function (error, url, line) {
    console.everything.push({
      type: "exception",
      timeStamp: TS(),
      value: { error, url, line }
    })
    return false;
  }
  window.onunhandledrejection = function (e) {
    console.everything.push({
      type: "promiseRejection",
      timeStamp: TS(),
      value: e.reason
    })
  } 

  function hookLogType(logType) {
    const original= console[logType].bind(console)
    return function(){
      let dateStr = new Date(); dateStr = dateStr.toISOString();
      let value = "";
      for (var i=0; i < arguments.length; i++) {
        value += arguments[i];

        if (typeof arguments[i] == 'object') {
            value = JSON.stringify(arguments[i]);
        }
        value += ", ";
      }
      
      console.everything.push(`${dateStr}, ${logType}, ${value}\n`);
      original.apply(console, arguments)
    }
  }

  ['log', 'error', 'warn', 'debug'].forEach(logType=>{
    console[logType] = hookLogType(logType)
  })
}

console.saveToFile = function(filename) {

    if (!filename) { filename = 'console.log';}
    
    var blob = new Blob(console.everything, {type: 'text/json'}),
    e    = document.createEvent('MouseEvents'),
    a    = document.createElement('a');
    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
}   
