function TimeRun(history, future, rows)
{
	TimeRun.history_seconds = history;
	TimeRun.future_seconds = future;
	TimeRun.rows = rows;
	TimeRun.full_size =  history + future;
	TimeRun.width = 100;
	TimeRun.height = 100;	
	TimeRun.pos=1;
	TimeRun.left=50;
	TimeRun.right=50;
	TimeRun.wsk_size=4;
	TimeRun.time_step;
	TimeRun.step = 10;
	TimeRun.top_1;
	TimeRun.top_5;
	TimeRun.ctx;
	TimeRun.currentSeconds;
	TimeRun.curr_row=0;
	TimeRun.row_height=30;
	TimeRun.time_pos = new Array();	
	TimeRun.canvas;
	
	
	TimeRun.plus_over = false;
	TimeRun.minus_over = false;
};
	

TimeRun.drawLine = function(x1,y1,x2,y2, color)
{
	TimeRun.ctx.strokeStyle = color;
	TimeRun.ctx.beginPath();
	TimeRun.ctx.moveTo(x1,y1);
	TimeRun.ctx.lineTo(x2,y2);
	TimeRun.ctx.stroke();
};

TimeRun.addTimePos = function(dt,length,name)
{
	TimeRun.time_pos.push({dt:dt / 1000, length:length,name:name});	
};

TimeRun.drawNumber = function(x,y, txt, color)
{
	TimeRun.ctx.strokeStyle = color;
	TimeRun.ctx.font="10px Georgia";
	TimeRun.ctx.strokeText(txt,x,y);
};

TimeRun.drawText = function(x,y, txt, color, font)
{	
	TimeRun.ctx.fillStyle = color;
	TimeRun.ctx.font=font;
	TimeRun.ctx.fillText(txt,x,y);
};

TimeRun.drawTime = function()
{
	for (x=0;x<TimeRun.full_size;x++)
	{
		if ((x % TimeRun.step) == 0)
		{
			TimeRun.drawNumber(x * TimeRun.time_step + TimeRun.pos, TimeRun.top_5 - 5,  x, "red");
			TimeRun.drawLine(x * TimeRun.time_step + TimeRun.pos, TimeRun.top_5, x * TimeRun.time_step + TimeRun.pos, TimeRun.height, "black");
		}
		else
			TimeRun.drawLine(x * TimeRun.time_step + TimeRun.pos, TimeRun.top_1, x * TimeRun.time_step + TimeRun.pos, TimeRun.height, "black");
	}
};

TimeRun.drawRect = function(x,y,width,height,color)
{
	TimeRun.ctx.strokeStyle=color;
	TimeRun.ctx.strokeRect(x,y,width,height);
};

TimeRun.drawFillRect = function(x,y,width,height,color)
{
	TimeRun.ctx.fillStyle=color;
	TimeRun.ctx.fillRect(x,y,width,height);
};

TimeRun.drawScaleButtons = function()
{
	if (TimeRun.plus_over == true)
		TimeRun.drawFillRect(TimeRun.scale_plus_x, TimeRun.scale_plus_y, 15, 15, "yellow");
	else
		TimeRun.drawFillRect(TimeRun.scale_plus_x, TimeRun.scale_plus_y, 15, 15, "green");
		
	TimeRun.drawText(TimeRun.scale_plus_x + 2, TimeRun.height-2,"+","white","20px Arial");
	
	if (TimeRun.minus_over == true)
		TimeRun.drawFillRect(TimeRun.scale_minus_x, TimeRun.scale_minus_y, 15, 15, "yellow");		
	else
		TimeRun.drawFillRect(TimeRun.scale_minus_x, TimeRun.scale_minus_y, 15, 15, "green");		
		
	TimeRun.drawText(TimeRun.scale_minus_x +3, TimeRun.height -3,"-","white","20px Arial");
};

TimeRun.drawEvent = function(id)
{
	var start = TimeRun.time_pos[id].dt - TimeRun.currentSeconds;
	var x=(TimeRun.history_seconds + start) * TimeRun.time_step;
	TimeRun.ctx.fillStyle="blue";
	TimeRun.ctx.fillRect(x,TimeRun.curr_row*TimeRun.row_height,TimeRun.time_pos[id].length * TimeRun.time_step ,TimeRun.row_height);	
	
	TimeRun.drawText(x,TimeRun.curr_row*TimeRun.row_height+20,TimeRun.time_pos[id].name,"white","20px Georgia");
	 
	if (TimeRun.curr_row>= TimeRun.rows)
		TimeRun.curr_row=0;
	else
		TimeRun.curr_row++;
		
};

TimeRun.drawEvents = function()
{
	for (i=0;i<TimeRun.time_pos.length;i++)
	{
		if ((TimeRun.time_pos[i].dt>= TimeRun.currentSeconds - TimeRun.history_seconds)
			||
			(TimeRun.time_pos[i].dt<= TimeRun.currentSeconds + TimeRun.future_seconds)
			)
				TimeRun.drawEvent(i);
				
		//alert(TimeRun.currentSeconds+":"+TimeRun.time_pos[i].dt);
	}
};

TimeRun.setCurrentDate = function()
{
	var d = new Date();
	TimeRun.currentSeconds = d.getTime() / 1000; 
};

TimeRun.redraw = function()
{
	TimeRun.setCurrentDate();
	TimeRun.drawFillRect(0,0,TimeRun.width, TimeRun.height, "white");
	//TimeRun.drawTime();
	TimeRun.curr_row=0;
	TimeRun.drawEvents();
	TimeRun.drawScaleButtons();
	TimeRun.drawFillRect(0,0, TimeRun.left, TimeRun.height, "rgba(128, 128, 128, 0.8)");
	TimeRun.drawRect(TimeRun.left, 0, TimeRun.width - TimeRun.right - TimeRun.left,
		TimeRun.height, "rgba(0, 0, 200, 0.5)");
	TimeRun.pos--;
	
	if ((TimeRun.pos + (TimeRun.time_step * TimeRun.step)) == 0)
		TimeRun.pos=0;
};



TimeRun.onLoad = function ()
{
	TimeRun.canvas=document.getElementById("timeRun");
	TimeRun.ctx=TimeRun.canvas.getContext("2d");	
	TimeRun.canvas.onmousemove= function(e)
	{
		var IE = document.all?true:false
		if (IE) { // grab the x-y pos.s if browser is IE
			tempX = event.clientX + document.body.scrollLeft
			tempY = event.clientY + document.body.scrollTop
		} else {  // grab the x-y pos.s if browser is NS
			tempX = e.pageX
			tempY = e.pageY
		}  

		if (tempX < 0){tempX = 0}
		if (tempY < 0){tempY = 0}  

		TimeRun.onMouseOver(tempX, tempY);

	}
	
	
	TimeRun.width = TimeRun.canvas.width;
	TimeRun.height = TimeRun.canvas.height;		
	TimeRun.time_step = TimeRun.width / TimeRun.full_size;
	TimeRun.row_height = TimeRun.height / TimeRun.rows; 
	TimeRun.right = TimeRun.time_step * TimeRun.future_seconds - TimeRun.wsk_size /2;
	TimeRun.left = TimeRun.time_step * TimeRun.history_seconds - TimeRun.wsk_size /2;
	TimeRun.scale_plus_x=TimeRun.width - 32;
	TimeRun.scale_plus_y=TimeRun.height - 16;
	TimeRun.scale_minus_x=TimeRun.width - 16;
	TimeRun.scale_minus_y=TimeRun.height - 16;
	
	TimeRun.top_5 = Math.floor(TimeRun.height * 0.6);
	TimeRun.top_1 = Math.floor(TimeRun.height * 0.8);	
	TimeRun.step = TimeRun.full_size /10;
	TimeRun.redraw();
};





TimeRun.checkPlusAndMinus = function (x,y)
{

	if ((x>=TimeRun.scale_plus_x) && (x<=TimeRun.scale_plus_x+16)
		&& (y>=TimeRun.scale_plus_y) && (y<=TimeRun.scale_plus_y+16)
	)
	{
		TimeRun.plus_over = true;
		TimeRun.redraw();
	}
	else
		{
			TimeRun.plus_over = false;
				
			TimeRun.redraw();
			
		}
		
	if ((x>=TimeRun.scale_minus_x) && (x<=TimeRun.scale_minus_x+16)
		&& (y>=TimeRun.scale_minus_y) && (y<=TimeRun.scale_minus_y+16)
	)
	{
		TimeRun.minus_over = true;
		TimeRun.redraw();
	}
	else
		{
			TimeRun.minus_over = false;
				
			TimeRun.redraw();
			
		}
	
	
};
	

TimeRun.onMoudeDown = function ()
{
	
};

TimeRun.onMouseOver = function(x,y)
{
	TimeRun.checkPlusAndMinus(x,y);
};

