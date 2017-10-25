document.addEventListener('deviceready', onDeviceReady, false);

var devicePlatform = null;
var currentPath = null;
var currentEntry = null;
var currentEntitries = [];

function logObject(obj) {
    for (var propertyName in obj) {
        log(propertyName + ': ' + obj[propertyName]);
    }
}

function log(text) {
    text += "<br/>";
    console.log(text);
    var div = document.getElementById('log');
    div.innerHTML += text;
}

function onError(errors) {
    log('Error!');
    log('Errors: ' + errors);
}

function onDeviceReady() {
    devicePlatform = device.platform;

    //readDirectory(cordova.file.applicationStorageDirectory);
    //readDirectory(cordova.file.externalRootDirectory);
    readDirectory(cordova.file.applicationStorageDirectory);
}

function openDir(index) {
    var entry = currentEntitries[index];
    if (entry.isDirectory) {
        readDirectoryFromReader(entry);
    }
}

function goBack() {
    if (currentEntry == null)
        return;

    currentEntry.getParent(function (parentArg) {
            if (parentArg) {
                readDirectoryFromReader(parentArg);
            }
        },
        function(error) {
            alert("Error getting parent folder");
        });
}

function loadedDirectorySuccess(entries) {
    currentEntitries = entries;
    $('#blacklog').empty();
    //var obj = currentEntry;
    //var str = "";
    //for (var propertyName in obj) {
    //    str += propertyName + ': ' + obj[propertyName] + '\r\n';
    //}
    //alert("ObjErrror: " + str);
    for (var i = 0; i < entries.length; i++) {
        $('#blacklog').append('<div class="file-container" onclick="openDir('+i+')">' + (entries[i].isDirectory ? '/' : '') + entries[i].name + '</div>');
    }
}

function failLoadDirectory(error) {
    alert("Failed to list directory contents: " + error.code);
}

function readDirectory(path) {
    window.resolveLocalFileSystemURL(path, function (directoryEntry) {
        currentPath = path;

        // Get a directory reader
        readDirectoryFromReader(directoryEntry);
    }, onError);
}

function readDirectoryFromReader(entry) {
    currentEntry = entry;
    var reader = entry.createReader();
    reader.readEntries(loadedDirectorySuccess, failLoadDirectory);
}