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
	
	for (let bt of bts) {
		// This work on chrome, maybe different in others
		setTimeout(() => bt.click(), 2000);
	};
	const waitMls = (bts && bts.length) * 2000;
	setTimeout(() => performScroll(), waitMls);
};

performScroll();
