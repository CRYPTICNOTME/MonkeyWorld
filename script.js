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

function populatev2() {
    imageQueue = ["https://images.unsplash.com/photo-1641400731477-fdfc14c297ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzU2ODd8MHwxfHNlYXJjaHwyODZ8fG1vbmtleXN8ZW58MHx8fHwxNzMxNjgwNjY3fDA&ixlib=rb-4.0.3&q=80&w=1080",
            "https://images.unsplash.com/photo-1655393208548-2ece1c952e79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzU2ODd8MHwxfHNlYXJjaHwyODd8fG1vbmtleXN8ZW58MHx8fHwxNzMxNjgwNjY3fDA&ixlib=rb-4.0.3&q=80&w=400",
            "https://images.unsplash.com/photo-1641400730085-f8ed50d3a718?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzU2ODd8MHwxfHNlYXJjaHwyODh8fG1vbmtleXN8ZW58MHx8fHwxNzMxNjgwNjY3fDA&ixlib=rb-4.0.3&q=80&w=400",
            "https://images.unsplash.com/photo-1543910759-cd9f15cc1f7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzU2ODd8MHwxfHNlYXJjaHw2MXx8bW9ua2V5c3xlbnwwfHx8fDE3MzE2ODExMDF8MA&ixlib=rb-4.0.3&q=80&w=400",
            "https://images.unsplash.com/photo-1665435246398-52ef9c699924?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzU2ODd8MHwxfHNlYXJjaHw2Mnx8bW9ua2V5c3xlbnwwfHx8fDE3MzE2ODExMDF8MA&ixlib=rb-4.0.3&q=80&w=400",
            "https://images.unsplash.com/flagged/photo-1571083720815-0e02060f1f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzU2ODd8MHwxfHNlYXJjaHw2M3x8bW9ua2V5c3xlbnwwfHx8fDE3MzE2ODExMDF8MA&ixlib=rb-4.0.3&q=80&w=400",
            "https://images.unsplash.com/photo-1705207332304-76fbfa3d1281?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzU2ODd8MHwxfHNlYXJjaHw2NHx8bW9ua2V5c3xlbnwwfHx8fDE3MzE2ODExMDF8MA&ixlib=rb-4.0.3&q=80&w=400",
            "https://images.unsplash.com/photo-1599036495549-20448a080ca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzU2ODd8MHwxfHNlYXJjaHw2NXx8bW9ua2V5c3xlbnwwfHx8fDE3MzE2ODExMDF8MA&ixlib=rb-4.0.3&q=80&w=400",
            "https://images.unsplash.com/photo-1585830446658-338215e08888?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzU2ODd8MHwxfHNlYXJjaHw2Nnx8bW9ua2V5c3xlbnwwfHx8fDE3MzE2ODExMDF8MA&ixlib=rb-4.0.3&q=80&w=400",
            "https://images.unsplash.com/photo-1642779987366-8f0dc73b238f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzU2ODd8MHwxfHNlYXJjaHw2N3x8bW9ua2V5c3xlbnwwfHx8fDE3MzE2ODExMDF8MA&ixlib=rb-4.0.3&q=80&w=400",
            "https://images.unsplash.com/photo-1577974281938-76fb711251af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzU2ODd8MHwxfHNlYXJjaHw2OHx8bW9ua2V5c3xlbnwwfHx8fDE3MzE2ODExMDF8MA&ixlib=rb-4.0.3&q=80&w=400",
    ]

    nameQueue = ["George", "Alan", "Lucy", "Milo", "Geoffrey", "Sean", "Ryu", "Riley", "Kyle", "Naomi", "Cindy", "Jayla", "Carter"]
}

populate()