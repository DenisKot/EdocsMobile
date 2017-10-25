document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    //function load(path, onSuccess, onError, asByteArray) {
    //    try {
    //        var httpRequest;
    //        var url;

    //        if (XMLHttpRequest)
    //            httpRequest = new XMLHttpRequest();
    //        else
    //            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");

    //        httpRequest.onload = function () {
    //            if (httpRequest.readyState != 4)
    //                return;

    //            if (httpRequest.status == 200) {
    //                if (asByteArray) {
    //                    onSuccess(new Uint8Array(this.response));
    //                } else {
    //                    onSuccess(httpRequest.responseText);
    //                }
    //            }
    //            else {
    //                onError('EU_ERROR_DOWNLOAD_FILE');
    //            }
    //        };

    //        httpRequest.onerror = function (error) {
    //            var obj = error;
    //            var str = "";
    //            for (var propertyName in obj) {
    //                str += propertyName + ': ' + obj[propertyName] + '\r\n';
    //            }
    //            alert("Errror: " + str);
    //            onError('onerror');
    //        };

    //        httpRequest.onreadystatechange = function (oEvent) {
    //            if (httpRequest.readyState === 4) {
    //                if (httpRequest.status === 200) {
    //                    console.log(httpRequest.responseText);
    //                } else {
    //                    alert("Error: ", httpRequest.statusText);
    //                }
    //            }
    //        };


    //        if (path.indexOf('http://') != 0 &&
    //            path.indexOf('https://') != 0) {
    //            if (!location.origin) {
    //                location.origin = location.protocol +
    //                    "//" + location.hostname +
    //                    (location.port ? ':' + location.port : '');
    //            }

    //            url = location.origin + path;
    //        } else {
    //            url = path;
    //        }

    //        //alert(url);
    //        httpRequest.open("GET", url, true);
    //        if (asByteArray)
    //            httpRequest.responseType = 'arraybuffer';
    //        httpRequest.send();
    //    } catch (e) {
    //        alert('!!!!ERroR: ' + e);
    //    }
    //}

    //load("http://192.168.137.1:3000" +"/Content/CACertificates.p7b?version=1.0.14", function(text) {
    //    alert('Success:' + text);
    //}, function (text) {
    //    alert('Error:' + text);
    //}, false);

    function log(text) {
        text += "<br/>";
        console.log(text);
        var div = document.getElementById('log');
        div.innerHTML += text;
    }

    function onErrorLoad(errors) {
        log('Errors: ' + errors.message);
    }

    var devicePlatform = device.platform;
    log(devicePlatform);

    //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

    //    log('file system open: ' + fs.name);
        
    //    var applicationDirectory = cordova.file.applicationDirectory;

    //    function success(parent) {
    //        log("Parent Name: " + parent.name);
    //    }

    //    function fail(error) {
    //        alert("Failed to retrieve file: " + error.code);
    //    }

    //    // Retrieve an existing file, or create it if it does not exist
    //    //entry.getFile("newFile.txt", { create: true, exclusive: false }, success, fail);
    //});

    //////////////////
    

    //function readFile(fileEntry) {

    //    fileEntry.file(function (file) {
    //        var reader = new FileReader();

    //        reader.onloadend = function () {
    //            log("Successful file read: " + this.result);
    //            //displayFileData(fileEntry.fullPath + ": " + this.result);
    //            log(fileEntry.fullPath + ": " + this.result);
    //        };

    //        reader.readAsText(file);

    //    });
    //}

    //function writeFile(fileEntry, dataObj) {
    //    // Create a FileWriter object for our FileEntry (log.txt). 
    //    fileEntry.createWriter(function (fileWriter) {

    //        fileWriter.onwriteend = function () {
    //            log("Successful file write...");
    //            readFile(fileEntry);
    //        };

    //        fileWriter.onerror = function (e) {
    //            log("Failed file write: " + e.toString());
    //        };

    //        // If data object is not passed in, 
    //        // create a new Blob instead. 
    //        if (!dataObj) {
    //            dataObj = new Blob(['some file data'], { type: 'text/plain' });
    //        }

    //        fileWriter.write(dataObj);
    //    }, onErrorLoad);
    //}

    //window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
    //    log('file system open: ' + dirEntry.name);
    //    var isAppend = true;
    //    writeFile(dirEntry, "fileToAppend.txt", isAppend);
    //}, onErrorLoad);
    
    if (devicePlatform == 'Android') {
        
    }

    function success(entries) {
        var i;
        for (i = 0; i < entries.length; i++) {
            log(entries[i].name);
        }
    }

    function fail(error) {
        alert("Failed to list directory contents: " + error.code);
    }

    window.resolveLocalFileSystemURL(cordova.file.applicationStorageDirectory, function (directoryEntry) {
        // Get a directory reader
        var directoryReader = directoryEntry.createReader();

        // Get a list of all the entries in the directory
        directoryReader.readEntries(success, fail);
    }, onErrorLoad);
}

