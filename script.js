let topY = 8;
let leftX = 12;
let abiy = document.querySelector('.abiy');
const buttons = document.querySelector('.buttons').children
const buttonsX = document.querySelector('.buttons-x').children
let lines = document.getElementsByTagName('hr')
let box = document.querySelector('.container')
const persik = document.querySelector('#Persik')
const shashlik = document.querySelector('.shashlik')
let IsPressed = false
let timeId;
let start;
let end;
let arrowButtonY;
let vsryiv = new Audio('Звук Проигрыш для Гейм Овера.mp3')
let neodVsryiv = new Audio('neojidannyiy-odinochnyiy-vzryiv.mp3')
const megaShashlik = document.querySelector('.mega-shashlik')
let megaPersik = document.querySelector('.mega-persik')
for(let button of buttons){
    button.addEventListener('mousedown', function(){
        arrowButtonY = button
        start = new Date()
        if(button.classList.contains('buttons-x')){
            return
        }
        timeId = setInterval(MoveY, 30)

    })

    button.addEventListener('touchstart', function(){
        arrowButtonY = button
        if(button.classList.contains('buttons-x')){
            return
        }
        timeId = setInterval(MoveY, 60)

    })
    button.addEventListener('touchend', function(){
        clearInterval(timeId)
    })
}

function MoveY(){
    if(arrowButtonY.classList.contains('down')){
        topY += 3
        abiy.style.top = topY + 'px'
    }
    else if(arrowButtonY.classList.contains('up')){
        topY -= 3
        abiy.style.top = topY + 'px'
    }
    for(let line of lines){
        if(detectOverlap(abiy, line)){
            vsryiv.play()
            leftX = 12
            topY = 8
            abiy.style.top = '8px'
            abiy.style.left = '12px'
            break
        }
    }
}

let arrowButtonX;
for(let NewButton of buttonsX){
    NewButton.addEventListener('mousedown', function(){
        start = new Date()
        arrowButtonX = NewButton
        timeId = setInterval(MoveX, 30)
    })
    NewButton.addEventListener('mouseup', function(){
        clearInterval(timeId)
    })

    NewButton.addEventListener('touchstart', function(){
        arrowButtonX = NewButton
        start = new Date()
        timeId = setInterval(MoveX, 60)
    })
    NewButton.addEventListener('touchend', function(){
        clearInterval(timeId)
    })
}

function MoveX(){
    if(arrowButtonX.classList.contains('right')){
        leftX += 3
        abiy.style.left = leftX + 'px'
    }
    else if(arrowButtonX.classList.contains('left')){
        leftX -= 3
        abiy.style.left = leftX + 'px'
    }
    for(let line of lines){
        if(detectOverlap(abiy, line)){
            leftX = 12
            topY = 8
            vsryiv.play()
            abiy.style.top = '8px'
            abiy.style.left = '12px'
            break
        }
    }
    if(detectOverlap(abiy, persik)){
        megaPersik.classList.toggle('show')
        neodVsryiv.play()
        setTimeout(function(){
            megaPersik.classList.remove('show')
        },1000)
        persik.classList.toggle('hide')
    }
    else if(detectOverlap(abiy, shashlik)){
        megaShashlik.classList.toggle('show')
        neodVsryiv.play()
        setTimeout(function(){
            megaShashlik.classList.remove('show')
        },1000)
        shashlik.classList.toggle('hide')
    }
}

document.addEventListener('mouseup', function(){
    clearInterval(timeId)
})

var detectOverlap = (function () {
    function getPositions(elem) {
        var pos = elem.getBoundingClientRect();
        return [[pos.left, pos.right], [pos.top, pos.bottom]];
    }

    function comparePositions(p1, p2) {
        var r1, r2;
        if (p1[0] < p2[0]) {
          r1 = p1;
          r2 = p2;
        } else {
          r1 = p2;
          r2 = p1;
        }
        return r1[1] > r2[0] || r1[0] === r2[0];
    }

    return function (a, b) {
        var pos1 = getPositions(a),
            pos2 = getPositions(b);
        return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);
    };
})();
