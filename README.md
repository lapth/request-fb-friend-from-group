# Send Friend Request to members in a group where joint
The easy way: let follow these steps
- Open and login Facebook
- Open the joint group
- Open the member list
- Scroll down to load much as posible (please note, you able to add only about 100 members in a period of time, facebook prevent this stuff to avoid spam)
- Open development mode then run following scripts
```
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
```

That all you need to do.
