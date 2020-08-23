//identity
const particle = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    
    //create object particle
    const pLenght= Math.floor(window.innerWidth / 10);

    //loop for add particle 
    for(let i = 0; i < pLenght; i++){
        particle.push(new Particle());
    }
}

function draw() {
    //color track particle
    background('#ffffff');
    
    particle.forEach((p,index)=>{
        p.update();
        p.draw();
        p.checkParticle(particle.slice(index));
    });
}

//Class Particle circle
class Particle{
    constructor(){
        //position
        this.pos = createVector(random(width),random(height));
        
        //size
        this.size = 10;

        //speed
        this.speed = createVector(random(-2,2),random(-2,2));
    }

    //add movement speed to particle
    update(){
        this.pos.add(this.speed);
        this.edge();
    }

    //draw single particle
    draw(){
        noStroke();
        fill('rgba(0,0,0,0.90)');
        circle(this.pos.x,this.pos.y,this.size);
    }

    //edge
    edge(){
        if(this.pos.x < 0 || this.pos.x > width){
            this.speed.x *= -1
        }

        if(this.pos.y < 0 || this.pos.y > height){
            this.speed.y *= -1
        }
    }

    //connect particle to other particle with edge
    checkParticle(particle){
        particle.forEach(particle => {
            const e = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

            if(e<100){
                //color edge
                stroke('rgba(0,0,0,0.15)');
                line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
            }
        })
    }
}