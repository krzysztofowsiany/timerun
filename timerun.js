var ctx;
var width = 100;
var height = 100;
var pos=1;
var left=50;
var right=50;
var wsk_size=4;
var time_step;
var top_1;
var top_5;
function drawLine(x1,y1,x2,y2, color)
{
	ctx.strokeStyle = color;
	ctx.beginPath();

	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
}

function drawNumber(x,y,txt,  color)
{
	ctx.strokeStyle = color;
	ctx.font="10px Georgia";
	ctx.strokeText(txt,x,y);
}

function drawTime()
{
	for (x=0;x<65;x++)
	{
		if ((x % 5) == 0)
		{
			drawNumber(x*time_step +pos,
			top_5 - 5,x*time_step+pos, x,"red");
			drawLine(x*time_step +pos,top_5,x*time_step+pos,height, "black");
		}
		else
			drawLine(x*time_step+pos,top_1,x*time_step+pos,height, "black");
	}
}

function drawRect(x,y,width,height,color)
{
	ctx.strokeStyle=color;
	ctx.strokeRect(x,y,width,height);
}

function drawFillRect(x,y,width,height,color)
{
	ctx.fillStyle=color;
	ctx.fillRect(x,y,width,height);
}

function redraw()
{
	drawFillRect(0,0,width,height, "white");
	drawTime();
	drawFillRect(0,0,left,height, "rgba(128, 0, 200, 0.5)");
	drawRect(left,0,width - right - left,height, "rgba(0, 0, 200, 0.5)");
	pos--;
	if ((pos + (time_step*5)) == 0)
		pos=0;
}








function onLoad()
{
	var c=document.getElementById("timeRun");
	ctx=c.getContext("2d");	
	width = c.width;
	height = c.height;		
	right = left = (width - wsk_size) /2;
	time_step = width / 60;
	top_5 = Math.floor(height * 0.6);
	top_1 = Math.floor(height * 0.8);
	setInterval(function(){redraw()},1000);
	
}
window.onload = onLoad;

