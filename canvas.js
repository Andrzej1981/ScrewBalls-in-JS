var canvas = document.querySelector('canvas');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x:undefined,
    y:undefined
}

const maxRadius=40


window.addEventListener('mousemove',function(event){
    mouse.x = event.x
    mouse.y = event.y
    console.log(mouse)
})

window.addEventListener('resize',function(event){
    canvas.width = window.innerWidth
    canvas.height  = window.innerHeight
    Init()
})

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function Circle(x,y,dx,dy,radius,color,minRadius) 
{
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color
    this.minRadius=minRadius


    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
        c.strokeStyle = color
        c.stroke();
        c.fillStyle=this.color
        c.fill()

        if(x + this.radius>window.innerWidth || this.x-this.radius <0)this.dx=-this.dx
        if(y + this.radius>window.innerHeight || this.y-this.radius < 0)this.dy=-this.dy
        this.x+=this.dx
        this.y+=this.dy
    }

    this.update = function () {
        if(this.x + this.radius > window.innerWidth || this.x - this.radius < 0)this.dx= -this.dx
        if(this.y + this.radius > window.innerHeight || this.y-this.radius < 0)this.dy= -this.dy
        this.x+=this.dx
        this.y+=this.dy
        if(mouse.x - this.x <50 && mouse.x - this.x >-50 && mouse.y - this.y <50 && mouse.y - this.y >-50)
            {
                if (!(this.radius > maxRadius))
                this.radius+=1
            } 
            else {
                if(this.radius>minRadius) this.radius-=1
            }

        this.draw()
      }
}

var circleArray = []

function Init()
{
    circleArray = []
    for (var i=0;i<300;i++){
        var x=Math.random() * (innerWidth - radius * 2)+ radius;
        var y=Math.random() * (innerHeight - radius * 2)+ radius;
        var Radius = Math.random() * 3 + 1;
        var dx= Math.random() - 0.5;
        var dy= Math.random() - 0.5;;
        var radius = 50;
        var color = getRandomColor()
       circleArray.push(new Circle(x,y,dx,dy,radius,color,Radius))
   }
}



var circle = new Circle(200,200,1,1,50,'#CCFFFF')

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,window.innerWidth,window.innerHeight)
    for (var i=0;i<circleArray.length;i++){
        circleArray[i].update()
    }
    
}

animate();
Init()
