# chrome-console-dump
Allows chrome console to be dumped to file with features more than Chrome offers.

# Features
* Object expansion:  instead of seeing [object Object] in a file, it will be expanded with JSON.stringify(object)
* Timestamps: in UTC time
* Log level: debug, log, warn, error

# To install
1. Open Developer Tools
2. Go to Sources tab
3. Go to Snippets page (you may need to click >>)
4. Add the javascript file as a snippet
5. Right click on the snippet and select run

# To use
* console.log, console.warn, console.error, console.debug all work the same
* console.dump(filename) to download the logs as a file.  If no filename is given, the filename will be console.logs
