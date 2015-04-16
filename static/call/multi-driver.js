(function () {
    var connection = new RTCMultiConnection().connect();


    $("#start_button").click(function (event) {
        connection.open();
    });

    $("#end_button").click(function (event) {
        endObservaPluginEarly('local');
    });

    connection.onCustomMessage = function (message) {
        console.log("received a custom message: " + message);
        if (message.message === 'plugin') {
            /* received a video from another client to play */
            changeObservaVideoSource(message.video, 'remote');
        } else if (message.message === 'stopearly') {
            // the remote plugin is hanging up - clean up and restore the normal remote video!
            endObservaPluginEarly('remote');
        }
    };

    $("#plugin_button").click(function (event) {
        var prompted_video = prompt("Please enter a YouTube video URL.", '');
        var pluginRequest = {
            'plugin': 'youtube',
            'request': prompted_video
        };
        $.ajax({
            type: 'POST',
            url: '/plugin-handler',
            dataType: 'json',
            async: false,
            data: pluginRequest,
            success: function (data) {
                console.log("Successfully posted");
                console.log(data);
                changeObservaVideoSource(data.video, 'local');
            }
        });
    });
})();
