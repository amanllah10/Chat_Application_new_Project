let userInput = document.querySelector('.user-input')
let sendButton = document.querySelector('.send-button')
let rightSection = document.querySelector('.right-section')
let Room1 = document.querySelector('.room1')
let Room2 = document.querySelector('.room2')
let Room3 = document.createElement('div')
let chat1 = document.querySelector('.chat1')
let chat2 = document.querySelector('.chat2')
let chat3 = document.querySelector('.chat3')
let chatRoomP1 = document.querySelector('.chat-room-p1')
let chatRoomP2 = document.querySelector('.chat-room-p2')
let leftSection = document.querySelector('.left-sections')
let rightSecChild3 = document.createElement('div')
let chatRoomP3 = document.createElement('p')


// variables
let userName;
let firstMessageGone = true
let secondMessageGone = true
let messagesCount;
let room1ChildsDisplay = false
let room2ChildsDisplay = false
let friend = 'kamran'
let isClicked = false
let lastInputType;
let goneToShift = false

// roomsObject
let roomsObject = {
    rooms3: false,
    rooms4: false,
    rooms5: false,
    rooms6: false,
    rooms7: false,
    rooms8: false,
    rooms9: false,
    rooms10: false
}

//SenderName operation
let senderName = prompt('Enter your Name')
userName = senderName

// lastInput = userInput operation
userInput.addEventListener('input', () => {
    lastInputType = userInput.value
})


// room1 function
const room1 = () => {
    room1ChildsDisplay = true
    if (room1ChildsDisplay) {
        room1ChildsDisplay = true
        room2ChildsDisplay = false
        roomsObject.rooms3 = false

        Room1.className = 'display-block'
        Room2.className = 'display-none'
        Room3.className = 'display-none'

        chat1.className = 'chat1 bgyellow'
        chat2.className = 'chat2 bgwhite'



        chatRoomP1.innerHTML = 'online'
        chatRoomP2.innerHTML = ''
        chatRoomP3.innerHTML = ''
    } else {
        Room1.className = 'display-none'
        chatRoomP2.innerHTML = 'online'
    }
}

// room2 function
const room2 = () => {
    room2ChildsDisplay = true
    if (room2ChildsDisplay) {
        room1ChildsDisplay = false
        room2ChildsDisplay = true
        roomsObject.rooms3 = false

        Room1.className = 'display-none'
        Room2.className = 'display-block'
        Room3.className = 'display-none'

        console.log('chat2', room2ChildsDisplay)

        chat1.className = 'chat1 bgwhite'
        chat2.className = 'chat2 bgyellow'


        chatRoomP1.innerHTML = ''
        chatRoomP2.innerHTML = 'online'
        chatRoomP3.innerHTML = ''

    } else {
        Room2.className = 'display-none'
        chatRoomP1.innerHTML = 'online'
    }
}


const createRoom = () => {
    let count = leftSection.childElementCount;
    let roomNumber = count + 1; // Room numbering starts after existing rooms

    // Left section tab
    let chatDiv = document.createElement('div');
    chatDiv.className = `chat-rooms room${roomNumber}`;
    leftSection.appendChild(chatDiv);

    // Right section room
    let newRoom = document.createElement('div');
    newRoom.className = `room${roomNumber} display-none`;
    rightSection.appendChild(newRoom);

    // Title in left tab
    let chatH2 = document.createElement('h2');
    chatH2.className = 'chat-h2';
    chatH2.innerHTML = `Chat Room ${roomNumber}`;
    chatDiv.appendChild(chatH2);

    // Status paragraph
    let chatRoomP = document.createElement('p');
    chatRoomP.className = `chat-room-p${roomNumber}`;
    chatDiv.appendChild(chatRoomP);

    // Track in roomsObject
    roomsObject[`rooms${roomNumber}`] = false;

    // On click -> activate this room
    chatDiv.addEventListener('click', () => {
        // Hide all rooms
        rightSection.querySelectorAll('div[class^="room"]').forEach(r => {
            r.classList.add('display-none');
        });

        // Remove highlight from all tabs
        leftSection.querySelectorAll('.chat-rooms').forEach(tab => {
            tab.classList.remove('bgyellow');
            tab.classList.add('bgwhite');
        });

        // Show this room
        newRoom.classList.remove('display-none');
        chatDiv.classList.remove('bgwhite');
        chatDiv.classList.add('bgyellow');

        // Update tracking
        Object.keys(roomsObject).forEach(k => roomsObject[k] = false);
        roomsObject[`rooms${roomNumber}`] = true;

        // Reset other indicators
        leftSection.querySelectorAll('p[class^="chat-room-p"]').forEach(p => p.innerHTML = '');
        chatRoomP.innerHTML = 'online';
    });
};

// sendMessageToRoom function
const sendMessageToRoom = () => {
    
    let count;

    if (room1ChildsDisplay) count = Room1.childElementCount
    else if (room2ChildsDisplay) count = Room2.childElementCount
    else if (roomsObject.rooms3) count = Room3.childElementCount

    if (userInput.value === '') return

    let newElementDiv = document.createElement('div')
    let newElementCont = document.createElement('div')
    let imgAndSeenCont = document.createElement('div')
    imgAndSeenCont.className = 'img-seen-cont'
    let newElement = document.createElement('h3')
    let showTime = document.createElement('p')
    let deleteImg = document.createElement('img')
    deleteImg.src = './delete.png'
    deleteImg.className = 'delete-img'
    deleteImg.addEventListener('click', () => {
        deleteImg.parentElement.parentElement.remove()
    })
    let findSeen = document.createElement('p')
    findSeen.innerHTML = 'Deliever'
    showTime.innerHTML = (new Date().toLocaleTimeString())

    newElementCont.appendChild(newElement)
    newElementCont.appendChild(showTime)
    newElementCont.appendChild(findSeen)
    newElementDiv.appendChild(newElementCont)
    imgAndSeenCont.appendChild(deleteImg)
    newElementDiv.appendChild(imgAndSeenCont)

    // shift key apply
    addEventListener('keydown', (f) => {
        if (f.key === 'Shift' && imgAndSeenCont.children.length === 1) {
            goneToShift = true
            let seen = document.createElement('p')
            seen.innerHTML = 'seen'
            imgAndSeenCont.appendChild(seen)
            console.log(newElementCont)
            let seenTime = document.createElement('p')
            seenTime.innerHTML = (new Date().toLocaleTimeString())
            imgAndSeenCont.appendChild(seenTime)
            console.log('right sectionchild is ', imgAndSeenCont.children.length)

        }
    })

    // Message content
    newElement.innerHTML = count % 2 === 0
        ? `${userName} : ${userInput.value}`
        : `${friend} : ${userInput.value}`

    newElementDiv.className = count % 2 === 0 ? 'new-elem-div' : 'new-elem-div2'

    // Append to the right room
    if (room1ChildsDisplay) Room1.appendChild(newElementDiv)
    else if (room2ChildsDisplay) Room2.appendChild(newElementDiv)
    else if (roomsObject.rooms3) Room3.appendChild(newElementDiv)

    userInput.value = ''
    checkHeight()
}

sendButton.addEventListener('click', sendMessageToRoom)

userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessageToRoom()
})


// seen operation
userInput.addEventListener('input', () => {
    let count;
    if (room1ChildsDisplay) {
        count = Room1.childElementCount
    } else if (room2ChildsDisplay) {
        count = Room2.childElementCount
    } else if (roomsObject.rooms3) {
        count = Room3.childElementCount
    }
    if (count % 2 == 0) {

        if (room1ChildsDisplay) {
            console.log(count)
            chatRoomP1.innerHTML = `${userName} is typing`
            setTimeout(() => {
                chatRoomP1.innerHTML = 'online'
            }, 3000)
        } else if (room2ChildsDisplay) {
            chatRoomP2.innerHTML = `${userName} is typing`
            setTimeout(() => {
                chatRoomP2.innerHTML = 'online'
            }, 3000)
        } else if (roomsObject.rooms3) {
            chatRoomP3.innerHTML = `${userName} is typing`
            setTimeout(() => {
                chatRoomP3.innerHTML = 'online'
            }, 3000)
        }
    } else {
        if (room1ChildsDisplay) {
            chatRoomP1.innerHTML = `${friend} is typing`
            setTimeout(() => {
                chatRoomP1.innerHTML = 'online'
            }, 3000)
        } else if (room2ChildsDisplay) {
            chatRoomP2.innerHTML = `${friend} is typing`
            setTimeout(() => {
                chatRoomP2.innerHTML = 'online'
            }, 3000)
        } else if (roomsObject.rooms3) {
            chatRoomP3.innerHTML = `${friend} is typing`
            setTimeout(() => {
                chatRoomP3.innerHTML = 'online'
            }, 3000)
        }
    }

})

// scroll to bottom when height increase operation
const checkHeight = () => {
    if (rightSection.scrollHeight > 640 || rightSection.scrollHeight > 470) {

        rightSection.scrollTo({
            top: rightSection.scrollHeight,
            behavior: 'smooth'
        })
    }

}
