document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    if (device.platform === 'Android') {
        var permissions = cordova.plugins.permissions;
        permissions.hasPermission(permissions.CAMERA, checkPermissionCallback, null);

        function checkPermissionCallback(status) {
            if (!status.hasPermission) {
                var errorCallback = function() {
                    alert('Для роботи функціоналу необхідно надати доступ до камери.');
                }

                permissions.requestPermission(
                    permissions.CAMERA,
                    function(status) {
                        if (!status.hasPermission) {
                            errorCallback();
                        } else {
                            loadCamera();
                        }
                    },
                    errorCallback);
            } else {
                loadCamera();
            }
        }
    } else {
        loadCamera();
    }
}

function loadCamera() {
    let options = {
        x: 0,
        y: 150,
        width: window.screen.width,
        height: window.screen.height - 150,
        camera: CameraPreview.CAMERA_DIRECTION.BACK,
        toBack: false,
        tapPhoto: true,
        tapFocus: false,
        previewDrag: false
    };

    CameraPreview.startCamera(options);
    CameraPreview.setFocusMode(CameraPreview.FOCUS_MODE.AUTO);

    //setTimeout(function() {
    //    CameraPreview.takePicture({ width: 640, height: 640, quality: 85 }, function (base64PictureData) {
    //        /*
    //          base64PictureData is base64 encoded jpeg image. Use this data to store to a file or upload.
    //          Its up to the you to figure out the best way to save it to disk or whatever for your application.
    //        */

    //        // One simple example is if you are going to use it inside an HTML img src attribute then you would do the following:
    //        var imageSrcData = 'data:image/jpeg;base64,' + base64PictureData;
    //        //alert(''+imageSrcData);
    //        $('#my-img').attr('src', imageSrcData);
    //        $("#txt").text(imageSrcData);

    //    });
    //}, 2000);
}