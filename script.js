var scrollInterval;

function performScroll() {
	scrollInterval = window.setInterval(function() {
		console.log("Scrolling ...");
		window.scrollTo(0,document.body.scrollHeight);
		let bt = document.querySelector(".FriendRequestAdd");
		if (bt) {
			console.log("Sending friend requests ...");
			cleanScrollInterval();
			sendFriendRequest();
		}
	}, 5000);
}

function cleanScrollInterval() {
	clearInterval(scrollInterval);
}

function sendFriendRequest() {
	const bts = document.querySelectorAll(".FriendRequestAdd"); 
	const requestCount = (bts && bts.length) | 0;
	console.log("Request count: ", requestCount);
	const SEND_REQUEST_WAIT_MLS = 5000;
	
	for (let bt of bts) {
		// This work on chrome, maybe different in others
		setTimeout(() => bt.click(), SEND_REQUEST_WAIT_MLS);
	};
	const PERFORM_SCROLL_WAIT_MLS = (bts && bts.length) * SEND_REQUEST_WAIT_MLS;
	setTimeout(() => performScroll(), PERFORM_SCROLL_WAIT_MLS);
};

performScroll();
