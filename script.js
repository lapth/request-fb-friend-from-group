var scrollInterval;

function performScroll() {
	scrollInterval = window.setInterval(function() {
		console.log("Scrolling ...");
		window.scrollTo(0,document.body.scrollHeight);
		let bt = document.querySelector(".FriendRequestAdd:not(.hidden_elem)");
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

function closeInforBox() {
	const bts = document.querySelectorAll(".autofocus.layerCancel:not(.hidden_elem)"); 
	if (!bts || bts.length===0) return;
	for (let bt of bts) bt.click();
}

function isExepection() {
	const exp = document.querySelector('div[data-testid="exception_dialog"]');
	if (exp) return true
	else return false;
}

function sendFriendRequest() {
	const bts = document.querySelectorAll(".FriendRequestAdd:not(.hidden_elem)"); 
	const requestCount = (bts && bts.length) | 0;
	console.log("Request count: ", requestCount);
	if (requestCount === 0) return;
	const SEND_REQUEST_WAIT_MLS = 5000;
	
	for (let bt of bts) {
		// This work on chrome, maybe different in others
		setTimeout(() => bt.click(), SEND_REQUEST_WAIT_MLS);
	};
	
	closeInforBox();
	
	const PERFORM_SCROLL_WAIT_MLS = (bts && bts.length) * SEND_REQUEST_WAIT_MLS;
	
	if (isExepection()) setTimeout(() => performScroll(), PERFORM_SCROLL_WAIT_MLS);
	else setTimeout(() => performScroll(), PERFORM_SCROLL_WAIT_MLS + 60*60*1000); // 1 hour
};

performScroll();
