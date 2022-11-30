import Paddle from "./paddle.js";
import PhyEngine from "./phyEngine.js";
import Obj from "./object.js";


let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let lastTime = 0;
let paddle1 = new Obj(.4,.05,25,3,'#ed0');
let paddle2 = new Obj(.4,.925,25,3,'#0de');
let ball = new Obj(.5,.4,1,2,'#d0d',1,0.03,.01);
// let ball2 = new Obj(.4,.5,1,2,'#d0d',1,.08,-.02);
// let ball3 = new Obj(.1,.5,1,2,'#d0d',1,.093,-.017);
// let ball4 = new Obj(.5,.3,1,2,'#d0d',1,.063,-.067);
// let paddle = new Paddle(ctx,2,5,4,1);
let pE = new PhyEngine(ctx);
pE.addObj(paddle1,pE.layers.L2);
pE.addObj(paddle2,pE.layers.L2);
pE.addObj(ball,pE.layers.L3);
// pE.addObj(ball2,pE.layers.L3);
// pE.addObj(ball3,pE.layers.L3);
// pE.addObj(ball4,pE.layers.L3);

function gameLoop(timeStamp){
    // console.log(timeStamp);

    // resizing canvas to fit the screen
    ctx.canvas.width = visualViewport.width*90/100;
    ctx.canvas.height = visualViewport.height*80/100;

    //caculating deltatime
    let deltatime =timeStamp-lastTime;
    lastTime=timeStamp;
    // console.log(deltatime);
    
    // paddle.update(ctx);
    pE.update(deltatime);

    ctx.fillStyle = '#f00';
    // paddle.draw(ctx);
    pE.draw();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop)