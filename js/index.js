var webrtc;
$(window).load(function() {
	// Create a new room
	$('#oca-spreedme-add-room > button.icon-confirm').click(function() {
		OCA.SpreedMe.Rooms.create($('#oca-spreedme-add-room > input[type="text"]').val());
	});

	// Load the list of rooms all 10 seconds
	OCA.SpreedMe.Rooms.list();
	setInterval(function() {
		OCA.SpreedMe.Rooms.list();
	}, 10000);

	// Send a ping to the server all 5 seconds to ensure that the connection is
	// still alive.
	setInterval(function() {
		OCA.SpreedMe.Rooms.ping();
	}, 5000);

	// If page is opened already with a hash in the URL redirect to plain URL
	if(window.location.hash !== '') {
		window.location.replace(window.location.href.slice(0, -window.location.hash.length));
	}

	var videoHidden = false;
	$('#hideVideo').click(function() {
		if(videoHidden) {
			webrtc.resumeVideo();
			$(this).data('title', 'Disable video').removeClass('video-disabled');
			videoHidden = false;
		} else {
			webrtc.pauseVideo();
			$(this).data('title', 'Enable video').addClass('video-disabled');
			videoHidden = true;
		}
	});
	var audioMuted = false;
	$('#mute').click(function() {
		if(audioMuted) {
			webrtc.unmute();
			$(this).data('title', 'Mute audio').removeClass('audio-disabled');
			audioMuted = false;
		} else {
			webrtc.mute();
			$(this).data('title', 'Enable audio').addClass('audio-disabled');
			audioMuted = true;
		}
	});

	// If the hash changes a room gets joined
	$(window).on('hashchange', function() {
		OCA.SpreedMe.Rooms.join(window.location.hash.substring(1));
	});
	if(window.location.hash.substring(1) === '') {
		OCA.SpreedMe.Rooms.join();
	}

});
