const picture = document.getElementById('picture')
const theName = document.getElementById('name')
let imageQueue = []
let nameQueue = []
let likes = []
let dislikes = []

function detectSwipe(el, callback) {
    let touchStartX, touchStartY;

    el.addEventListener('touchstart', function(event) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    });

    el.addEventListener('touchend', function(event) {
        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;

        const xDiff = touchStartX - touchEndX;
        const yDiff = touchStartY - touchEndY;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
            callback('left');
            picture.style.animation = 'swipeL 1s'
            sleep(1001).then(() => {
                picture.style.animation = 'none'
                picture.style.backgroundImage = changeImg(imageQueue.pop())
                theName.textContent = nameQueue.pop()
            })
            
        } else {
            callback('right');
            picture.style.animation = 'swipeR 1s'
            likes.push(picture.style.backgroundImage)
            sleep(1001).then(() => {
                picture.style.animation = 'none'
                picture.style.backgroundImage = changeImg(imageQueue.pop())
                theName.textContent = nameQueue.pop()
            })
        }
    }
    });
}

document.addEventListener('keydown', (event) => {
    keycode = event.key
    if(keycode == 'ArrowLeft') {
        picture.style.animation = 'swipeL 1s'
            sleep(1001).then(() => {
                picture.style.animation = 'none'
                picture.style.backgroundImage = changeImg(imageQueue.pop())
                theName.textContent = nameQueue.pop()
            })
    }
    if(keycode == 'ArrowRight') {
        picture.style.animation = 'swipeR 1s'
            likes.push(picture.style.backgroundImage)
            sleep(1001).then(() => {
                picture.style.animation = 'none'
                picture.style.backgroundImage = changeImg(imageQueue.pop())
                theName.textContent = nameQueue.pop()
            })
    }
})


function sleep(time){
    return new Promise((resolve) => setTimeout(resolve, time))
}

    detectSwipe(picture, function(direction) {
    console.log('Swiped ' + direction);
  });

function changeImg(a) {
    document.getElementById('picture').style.backgroundImage = `url(${a})`
}

function populate() {
    let randomPage = Math.floor(Math.random() * 10)
    fetch(`https://api.unsplash.com/search/photos?query=monkeys&page=${randomPage}&per_page=10&client_id=PsdG0yVsrZG82l4hCnwtmth0ThIKXJ-Zw6Zjkf0YW2w`)
    .then(result => result.json())
    .then(result => {for (let index = 0; index < result.results.length; index++) {
        imageQueue.push(result.results[index].urls.regular)
        nameQueue.push(result.results[index].user.first_name)
    }})
    .catch(error => {
        console.log(error)
        imageQueue = ["https://images.unsplash.com/photo-1641400731477-fdfc14c297ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzU2ODd8MHwxfHNlYXJjaHwyODZ8fG1vbmtleXN8ZW58MHx8fHwxNzMxNjgwNjY3fDA&ixlib=rb-4.0.3&q=80&w=1080",
            "https://images.unsplash.com/photo-1655393208548-2ece1c952e79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzU2ODd8MHwxfHNlYXJjaHwyODd8fG1vbmtleXN8ZW58MHx8fHwxNzMxNjgwNjY3fDA&ixlib=rb-4.0.3&q=80&w=400",
            "https://images.unsplash.com/photo-1641400730085-f8ed50d3a718?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzU2ODd8MHwxfHNlYXJjaHwyODh8fG1vbmtleXN8ZW58MHx8fHwxNzMxNjgwNjY3fDA&ixlib=rb-4.0.3&q=80&w=400"
        ]
        nameQueue = ["george", "Alvin", 'sven']
    })
}