song1="";
song2="";
rightwristx=0;
rightwristy=0;
leftwristx=0;
leftwristy=0;
scorerightwrist=0;
scoreleftwrist=0;
song1status="";
song2status="";
function preload()
{song1=loadSound("music.mp3");
song2=loadSound("music2.mp3");
}


function setup()
{canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded()
{
console.log("posenet has started");
}

function gotPoses(results)
{
if(results.length>0)
{
console.log(results);
scorerightwrist=results[0].pose.keypoints[10].score;
scoreleftwrist=results[0].pose.keypoints[10].score;
console.log("scorerightwrist= "+scorerightwrist+"scoreleftwrist= "+scoreleftwrist);
rightwristx=results[0].pose.rightWrist.x;
rightwristy=results[0].pose.rightWrist.y;
console.log("rightwristx= "+rightwristx+"rightwristy= "+rightwristy);
leftwristx=results[0].pose.leftWrist.x;
leftwristy=results[0].pose.leftWrist.y;
console.log("leftwristx= "+leftwristx+"leftwristy= "+leftwristy);
}
}

function draw()
{image(video,0,0,600,500);
fill("#ff0000");
stroke("#ff0000");
song1status=song1.isPlaying();
song2status=song2.isPlaying();
if(scoreleftwrist>0.2)
{
    circle(leftwristx, leftwristy, 20);
song1.stop();
if(song2status == false)
{
song2.play();
document.getElementById("song").innerHTML="PETER PAN THEME SONG";
}
}
if(scorerightwrist>0.2)
{circle(rightwristx, rightwristy, 20);
song2.stop();
if(song1status == false)
{
song1.play();
document.getElementById("song").innerHTML="HARRY POTTER THEME SONG";
}
}
}

function play()
{
song1.play();
song1.setVolume(1);
song1.rate(1);
song2.play();
song2.setVolume(1);
song2.rate(1);
}