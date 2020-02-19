var canvas = document.getElementById("sandbox"),
    context = canvas.getContext("2d");

function drawLine(angle, a, b, style, width) {
    var R = 300 / 2, pX, pY, qX, qY;
    pX = Math.cos(angle) * R;
    pY = -Math.sin(angle) * R;
    qX = a * pX; qY = a * pY;
    /* операторы */
    /* Имя       Сокращение      Смысл */
    /* x = x + y*/
    pX *= b; pY *= b;

    pX += R; pY += R;
    qX += R; qY += R;
    var line;
    line = new Path2D();
    line.moveTo(pX, pY);
    line.lineTo(qX, qY);
    context.strokeStyle = style;
    context.lineWidth = width;
    context.stroke(line);
}

function drawWatch(){
    /*  Объявляем переменные R-радиус циферблата,
     d - переменная для цикла, */
    var R = 300 / 2, d, angle, pX, pY, qX, qY;
    var division, circle;
    /* Очищаем холст */
    context.clearRect(0, 0, 2 * R, 2 * R);
    context.strokeStyle = "black";
    context.lineWidth = 1;
    /* рисуем циферблат*/
    /* рисуем окружность */
    circle = new Path2D();
    circle.arc(R+0.4, R+0.4, R-0.8, 0, 2 * Math.PI);
    context.stroke(circle);
    /* рисуем деления циферблата*/
    for(d = 0; d < 60; ++d) {
        angle = (d / 60) * (2 * Math.PI);
        drawLine(angle, 0.9, 0.97,
            d % 5 == 0 ? "black" : "rgba(0, 0, 0, 0.5)", 1);
    }
    /* получаем переменные о текущем времени */
    var date = new Date(), /* текущая дата со временем */
        hours = date.getHours(),  /* часы */
        minutes = date.getMinutes(), /* минуты */
        seconds = date.getSeconds(); /* секунды */
    /* Часовые стрелки: Часовая, минутная и секундная  */
    var secondsAngle = (seconds / 60) * (2 * Math.PI), 
        minutesAngle = (minutes / 60) * (2 * Math.PI),
        hoursAngle = ((hours % 12) / 12) * (2 * Math.PI);
    secondsAngle = Math.PI / 2 - secondsAngle;
    minutesAngle = Math.PI / 2 - minutesAngle;
    hoursAngle = Math.PI / 2 - hoursAngle;
    drawLine(secondsAngle, 0, 0.95, "red", 2);
    drawLine(minutesAngle, 0, 0.75, "black", 5);
    drawLine(hoursAngle, 0, 0.5, "black", 10);
    setTimeout(drawWatch, 1000); /* через 1000 милесекунд мы повторно выполним функцию drawWatch() */

}

drawWatch();