
let dev = false;
//let t0 = 0;
//let t1 = 0;

     var c = document.getElementById("canvas1");
        c.width = 500;
        c.height = 400;

        var ctx = c.getContext("2d");

        //Rescale the size
        ctx.scale(1,1);

        var speedGradient = ctx.createLinearGradient(0, 500, 0, 0);
        speedGradient.addColorStop(0, '#00b8fe');
        speedGradient.addColorStop(1, '#41dcf4');


        function speedNeedle(rotation) {
            ctx.lineWidth = 2;

            ctx.save();
            ctx.translate(250, 250);
            ctx.rotate(rotation);
            ctx.strokeRect(-130 / 2 + 170, -1 / 2, 135, 1);
            ctx.restore();

            rotation += Math.PI / 180;
        }
        
        function drawMiniNeedle(rotation, width, speed) {
            ctx.lineWidth = width;

            ctx.save();
            ctx.translate(250, 250);
            ctx.rotate(rotation);
            ctx.strokeStyle = "#333";
            ctx.fillStyle = "#333";
            ctx.strokeRect(-20 / 2 + 220, -1 / 2, 20, 1);
            ctx.restore();

            let x = (250+180 * Math.cos(rotation));
            let y = (250+180 * Math.sin(rotation));

            ctx.font = "15px Helvetica";
            ctx.fillText(speed, x, y);

        }

        function calculateSpeedAngle(x, a, b) {
            let degree = a+x;
            let radian = (degree * Math.PI) / 180;
            return radian;
        }

        function drawSpeedo(speed){
            if (speed == undefined) {
                return false;
            } else {
                speed = Math.floor(speed);
        
            }

            ctx.clearRect(0, 0, 1000, 1000);

            ctx.beginPath();
            ctx.fillStyle = 'rgba(0, 0, 0, .9)';
            ctx.arc(250, 250, 240,0.995* Math.PI, 2.005 * Math.PI);
            ctx.fill();
            ctx.save()
            ctx.restore();
            ctx.fillStyle = "#FFF";
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = "#333";
            ctx.lineWidth = 10;
            ctx.arc(250, 250, 100, 0.995*Math.PI, 2.005 * Math.PI);
            ctx.stroke();
            
            var gradient = ctx.createLinearGradient(0, 0, 170, 0);
            gradient.addColorStop("0", "magenta");
            gradient.addColorStop("0.5" ,"blue");
            gradient.addColorStop("1.0", "red");
            

            // Fill with gradient
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 3;
            ctx.arc(250, 250, 240, 0.995*Math.PI, 2.005 * Math.PI);
            ctx.stroke();

            ctx.font = "60px Helvetica";
            ctx.textAlign = "center";
            ctx.fillText(speed, 250, 220);

            ctx.font = "15px Helvetica";
            ctx.fillText("kmph", 250, 240);


            ctx.fillStyle = "#FFF";
            for (var i = 0; i <=180 ; i += 10) {
                console.log();
                drawMiniNeedle(calculateSpeedAngle(i,180, 360), i % 20 == 0 ? 3 : 1, i%20 == 0 ? i : '');
                
                
            }

            ctx.beginPath();
            ctx.strokeStyle = "#41dcf4";
            ctx.lineWidth = 25;
            ctx.shadowBlur = 20;
            ctx.shadowColor = "#00c6ff";

            ctx.strokeStyle = speedGradient;
            ctx.arc(250, 250, 228, Math.PI, calculateSpeedAngle(speed, 180, 360));
            ctx.stroke();
            
            ctx.shadowBlur = 0;


            ctx.strokeStyle = '#41dcf4';
            speedNeedle(calculateSpeedAngle(speed , 180, 360) );

           
           

        }


function getData(){
    var r=Math.floor(Math.random()*181);
    return r;
}
    var ir=0;
    var ravg=0;
    function updateavg(r){
    ravg=(ravg*ir+r)/(ir+1);
    ir+=1;
    ctx.save();
            ctx.translate(160, 255);
            ctx.strokeStyle = "#333";
            ctx.fillStyle = "#333";
            ctx.strokeRect(0, 25, 180, 100);
            ctx.font = "20px Helvetica";
            ctx.fillText("Average Speed:", 90,50);
            ctx.font = "40px Helvetica";
            ctx.fillText(Math.floor(ravg), 90,95);
            ctx.font = "20px Helvetica";
            ctx.fillText("kmph", 90,115);
            ctx.restore();
    


}

function repeatdraw(){
    var r=getData();
    drawSpeedo(r);
    updateavg(r);
}
document.addEventListener('DOMContentLoaded', function() {
    //setInterval(repeatdraw, 500);   
    repeatdraw();
},true);

document.getElementById("speed").addEventListener('change', function() {
    var r=document.getElementById("speed");
    drawSpeedo(parseInt(r.value));
    updateavg(parseInt(r.value));
    
}, true);
