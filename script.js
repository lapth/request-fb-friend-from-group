var scrollInterval;
var sendRequestInterval;
var allBts = [];
var scrollCount = 0;

function performScroll() {
	cleanScrollInterval();	
	scrollInterval = window.setInterval(function() {
		closeInforBox();
		console.log("Scrolling ...");
		window.scrollTo(0,document.body.scrollHeight);
		let bt = document.querySelector(".FriendRequestAdd:not(.hidden_elem)");		
		if (bt) {			
			collectSendFriendRequestBts();
		}
	}, 5000);
}

function collectSendFriendRequestBts() {
	const bts = document.querySelectorAll(".FriendRequestAdd:not(.hidden_elem)"); 
	const requestCount = (bts && bts.length) | 0;	
	if (requestCount === 0) {
		console.log("No buttons found.");
		return;
	}
	
	console.log("Putting ", requestCount, " button into queue.");
	
	// Add to queue
	allBts = [];
	allBts.push(...bts);
	console.log("Queue length: ", allBts.length);
	
	scrollCount++;
	if (scrollCount === 10 || allBts.length >= 100) {
		cleanScrollInterval();
		scrollCount = 0;
		sendFriendRequest();
	}
};

function sendFriendRequest() {	
	stopSendingFriendRequest();
	sendRequestInterval = window.setInterval(function() {		
		if (!allBts || allBts.length === 0) {
			console.log("No one to send.");
			performScroll();
			stopSendingFriendRequest();
			return;
		}
		console.log("Sending request ...");
		const bt = allBts.pop();
		bt.click();
		
		closeInforBox();
		if (isExepection()) {
			console.log("Hey spam warning, sleep 1 hour, see you late.");
			stop();
			setTimeout(sendFriendRequest, 60*60*1000);
		}
	}, 1000);
}

function stopSendingFriendRequest() {
	console.log("Stopping sending friend request.");
	if (sendRequestInterval) clearInterval(sendRequestInterval);
	sendRequestInterval = null;
}

function cleanScrollInterval() {
	console.log("Stopping auto scroll down");
	if (scrollInterval) clearInterval(scrollInterval);
	scrollInterval = null;
}

function closeInforBox() {
	let bts = document.querySelectorAll(".autofocus.layerCancel:not(.hidden_elem)"); 	
	if (!bts || bts.length===0) return;
	console.log("There are some infor box, closing... them");
	
	for (let bt of bts) bt.click();
	
	bts = document.querySelectorAll(".layerConfirm.uiOverlayButton:not(.hidden_elem)"); 	
	if (!bts || bts.length===0) return;	
	for (let bt of bts) bt.click();
}

function isExepection() {
	return false;
	//const exp = document.querySelector('div[data-testid="exception_dialog"]');
	//if (exp) return true
	//else return false;
}

function start() {
	console.log("Starting process.");
	performScroll();	
}

function stop() {
	console.log("Stopping process.");
	stopSendingFriendRequest();
	cleanScrollInterval();
}

start();
