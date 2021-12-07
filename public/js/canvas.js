const canvas = document.getElementById('placeholder');
let context = canvas.getContext('2d');
if (canvas.getContext) {


}

window.onload = () => {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    context.fillStyle = 'green';
    context.fillRect(0, 0, canvas.width, canvas.height / 2);
    context.clearRect(45, 45, 60, 60);
    context.strokeRect(50, 50, 50, 50);
}

window.onresize = () => {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    context.fillRect(0, canvas.height / 2, canvas.width, canvas.height);
    context.clearRect(45, canvas.height / 2, canvas.width/2, canvas.height);
}