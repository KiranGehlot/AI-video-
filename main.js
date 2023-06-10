

video="";
status="";
objects=[];


function preload()  {
    video = createVideo("video.mp4")
    
}

function setup() {
    canvas = createCanvas(500 , 400)
    canvas.center()
    video.hide()
}

function draw()  {
    image( video , 0 , 0 , 500 , 400)
    if(status != ""){
        objectdetector.detect(video , gotResult);

        for(i=0; i<objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: object is detected";
            document.getElementById("num_of_obj").innerHTML = "Number of Objects are: " + objects.length;

            fill("red");
            nofill();
            percent = Math.floor(objects[i].confidence * 100);
            text( objects[i].label + " " + percent + " %" , objects[i].x , objects[i].y);
            stroke("red")
            rect( objects[i].x , objects[i].y , objects[i].width , objects[i].height);


        }
    }
}

function start() {
    objectdetector = ml5.objectDetector('cocossd' , modelloaded)
    document.getElementById("status").innerHTML = "status: detecting object" 
}

function modelloaded() {
    console.log("model is loaded" )
    status=true;
    video.loop();
    video.volume(1);
    video.speed(1)
}

function gotResult(error , results)  {
    if(error){
        console.log(error)
    }
    console.log(results)
    objects=results;
}

