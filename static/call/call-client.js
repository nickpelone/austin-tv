(function () {
    "use strict";
    console.log("call-client.js loaded");

    //declarations
    //

    function successCallback(videoStream) {
        console.log("successCallback() was called");
    }

    function startup() {
        console.log("startup() was called");
        console.log("Requesting local video stream...");
        startButton.disabled = true;
        var constraints = {};

        getUserMedia(constraints, successCallback, function(error) {
            console.log("error: " + error);
        });
    }

    function startCall() {
        console.log("startCall() was called");
    }

    function end() {
        console.log("end() was called");
    }

    var localVideoStream, localPeerConnection, remotePeerConnection;

    var localVideoElement = $("#local_video")[0];
    var remoteVideoElement = $("#remote_video")[0];

    var startButton = $("#start_button")[0];
    var callButton = $("#call_button")[0];
    var endButton = $("#end_button")[0];

    //set default interface states

    startButton.disabled = false;
    callButton.disabled = true;
    endButton.disabled = true;

    // click handlers
    $("#start_button").click(startup);
    $("#call_button").click(startCall);
    $("#end_button").click(end);



})();
