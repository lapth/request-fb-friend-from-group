# Send Friend Request to members in a group where joint
The easy way: let follow these steps
- Open and login Facebook
- Open the joint group
- Open the member list
- Scroll down to load much as posible (please note, you able to add only about 100 members in a period of time, facebook prevent this stuff to avoid spam)
- Open development mode then run following scripts
```
var bts = document.querySelectorAll(".FriendRequestAdd"); for (let bt of bts) {setTimeout(() => bt.click(), 5000)};
```

That all you need to do.
