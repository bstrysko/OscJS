function OscJS(id)
{
	this.canvas = document.getElementById(id);
	this.width = this.canvas.width;
	this.height = this.canvas.height;
    this.context = this.canvas.getContext("2d"); 
    
    this.xMarks = 20;
    this.yMarks = 20;
    
    this.xMarkSize = this.height / 10;
    this.yMarkSize = this.width / 20;

   // this.xTicksPerMark = 10;
    //this.yTicksPerMark = 10;
    
    //in micro-seconds
    this.timeMark =  1000; // 1 milli-second
    
    //in volts
    this.voltageMark = 1;   

    this.points = [1,-1,0,2,1,1,-1,1,2,2,3,3,0,1,-2,-1,-2,2,1,-10];
}

OscJS.prototype.start = function()
{
	this.update(this);
}

OscJS.prototype.update = function(self)
{
	function update()
	{
		self.processData();
		self.draw();
	}

	setTimeout(update(self),1);
}

OscJS.prototype.processData = function()
{
	
}

OscJS.prototype.draw = function()
{
	//this.context.beginPath();
   	
   	this.context.fillStyle = "#000000";
   	this.context.fillRect(0,0,this.width,this.height);

   	this.context.strokeStyle = "rgb(255,255,255)";
   	this.context.lineWidth = 1;

   	//draw axis's
   	//positive voltage-axis
   	this.context.moveTo(this.width/2,this.height/2);
   	this.context.lineTo(this.width/2,0);
   	
   	//positive time-axis
   	this.context.moveTo(this.width/2,this.height/2);
   	this.context.lineTo(this.width,this.height/2);
   	
   	//negative voltage-axis
   	this.context.moveTo(this.width/2,this.height/2);
   	this.context.lineTo(this.width/2,this.height);
   	
   	//negative time-axis
   	this.context.moveTo(this.width/2,this.height/2);
   	this.context.lineTo(0,this.height/2);


   	//draw time-axis markers
   	// <= intentional to fill both positive side end
   	for(var i = 0; i <= this.xMarks; i++)
   	{
   		this.context.moveTo((this.width/this.xMarks) * i,this.height/2);
   		this.context.lineTo((this.width/this.xMarks) * i,this.height/2 + (this.xMarkSize / 2));

   		this.context.moveTo((this.width/this.xMarks) * i,this.height/2);
   		this.context.lineTo((this.width/this.xMarks) * i,this.height/2 - (this.xMarkSize / 2));
   	}

   	//draw voltage-axis markers
   	// <= intentional to fill both negative side end
   	for(var i = 0; i <= this.yMarks; i++)
   	{
   		this.context.moveTo(this.width/2,(this.height/this.yMarks) * i);
   		this.context.lineTo(this.width/2 + (this.yMarkSize / 2),(this.height/this.yMarks) * i);

   		this.context.moveTo(this.width/2,(this.height/this.yMarks) * i);
   		this.context.lineTo(this.width/2 - (this.yMarkSize / 2),(this.height/this.yMarks) * i);
   	}

   	// go through current points
   	// processData is responsible for taking out
   	// points that should not be plotted

   	//for first points - always on far right
   	this.context.moveTo(this.width,this.height/2 - (this.height/this.yMarks)*this.voltageMark * this.points[0]);	

   	for(var i = 1; i < this.points.length; i++)
   	{
   		this.context.lineTo(this.width - ((this.width/this.points.length)*i),this.height/2 - (this.height/this.yMarks)*this.voltageMark * this.points[i]);	
   		this.context.moveTo(this.width - ((this.width/this.points.length)*i),this.height/2 - (this.height/this.yMarks)*this.voltageMark * this.points[i]);	
   	}

   	this.context.stroke();
}