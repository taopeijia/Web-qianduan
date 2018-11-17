// DrawTriangle.js (c) 2012 matsuda
function main() {
    // Retrieve <canvas> element
    var canvas = document.getElementById('example');
    //var canvas = document.getElementsByTagName("canvas");
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }
    var ctx = canvas.getContext('2d');
    // Get the rendering context for 2DCG
    var img = new Image();
    img.src = '../imgs/士兵(1).png'
    img.onload = function () {
        var width = img.width / 4;
        var height = img.height / 4;


       // var i = 0;
        ctx.clearRect( 0, 0, 200, 2000 );
        ctx.drawImage( img, width, 0, width, height, 100, 100, width, height );
        ctx.drawImage( img, width*2, 0, width, height, 200, 100, width, height );
        // setInterval(function () {
        //
        //     //ctx.drawImage( img, width * (i++ % 4), height, width, height, 200, 100, width, height );
        // }, 200 );
        //ctx.drawImage( img, 0, height*2, width, height, 100, 100, width, height );
    };
    // Draw a blue rectangle
    //ctx.fillStyle = 'rgba(0, 0, 255, 1.0)'; // Set color to blue
    //ctx.fillRect(120, 10, 150, 150);        // Fill a rectangle with the color
}




