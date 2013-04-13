
function initialize(){
	//starting x coord frog
	frog_x=186;
	frog_y=480;
	
	//starting frog sprite sheet
	s_x_f1=12;
	s_y_f1=369;
	s_w_f1=23;
	s_h_f1=17;
	
	
	frogsHome=0;
	
	//frog tracker
	frog_box=new boundBox(frog_x, frog_y, s_w_f1, s_h_f1);
	
	//home bases
	base1=new boundBox(12, 73, 32, 32);
	base2= new boundBox(96, 73, 32, 32);
	base3=new boundBox(181, 73, 32, 32);
	base4=new boundBox(266, 73, 32, 32);
	base5=new boundBox(350, 73, 32, 32);
	
	//lillipads
	lil1=new boundBox(0, 70, 10, 36);
	lil2=new boundBox(45, 71, 49, 33);
	lil3=new boundBox(132, 72, 47, 34);
	lil4=new boundBox(218, 71, 44, 34);
	lil5=new boundBox(301, 71, 49, 36);
	lil6=new boundBox(385, 72, 14, 35);
	
	//start box
	startBox=new boundBox(186, 480, s_w_f1, s_h_f1);
	
	//lives left frog
	s_llf_x=10;
	s_llf_y=333;
	s_llf_w=24;
	s_llf_h=26;
	
	//lives
	lives=5;
	
	timer=0;
	death_duration=20;
	
	isDead=false;

	//is game over?
	gameover=false;

	//level
	level=1;

	//vehicle locations
	CL1=new Array();
	CL1[0]=new cars(125, 348, 1, 31, 22);
	CL1[1]=new cars(25, 348, 1, 31, 22);
	CL1[2]=new cars(-125, 348, 1, 31, 22);
	CL1[3]=new cars(-225, 348, 1, 31, 22);
	
	CL2=new Array();
	CL2[0]=new cars(0, 315, 2, 25, 26);
	CL2[1]=new cars(120, 315, 2, 25, 26);
	CL2[2]=new cars(240, 315, 2, 25, 26);
	CL2[3]=new cars(360, 315, 2, 25, 26);
	
	CL3=new Array();
	CL3[0]=new cars(125, 414, 2.5, 26, 23);
	CL3[1]=new cars(25, 414, 2.5, 26, 23);
	CL3[2]=new cars(-125, 414, 2.5, 26, 23);
	
	CL4=new Array();
	CL4[0]=new cars(0, 447, 2.75, 49, 21);
	CL4[1]=new cars(120, 447, 2.75, 49, 21);
	CL4[2]=new cars(240, 447, 2.75, 49, 21);

		
	CL5=new Array();
	CL5[0]=new cars(0, 381, .5, 27, 27);
	CL5[1]=new cars(120, 381, .5, 27, 27);
	CL5[2]=new cars(240, 381, .5, 27, 27);


	//log locations
	LL1=new Array();
	LL1[0]=new logs(0, 117, 1, 177, 21);
	LL1[1]=new logs(-200, 117, 1, 177, 21);
	LL1[2]=new logs(-400, 117, 1, 177, 21);
	
	LL2=new Array();
	LL2[0]=new logs(0, 149.5, 2.5, 116, 21);
	LL2[1]=new logs(150, 149.5, 2.5, 116, 21);
	LL2[2]=new logs(300, 149.5, 2.5, 116, 21);
	
	LL3=new Array();
	LL3[0]=new logs(100, 182, 1.5, 84, 21);
	LL3[1]=new logs(-50, 182, 1.5, 84, 21);
	LL3[2]=new logs(-200, 182, 1.5, 84, 21);
	LL3[3]=new logs(-350, 182, 1.5, 81, 21);
	
	LL4=new Array();
	LL4[0]=new logs(0, 214.5, 1, 116, 21);
	LL4[1]=new logs(150, 214.5, 1, 116, 21);
	LL4[2]=new logs(300, 214.5, 1, 116, 21);
	
	LL5=new Array();
	LL5[0]=new logs(200, 247, 2, 177, 21);
	LL5[1]=new logs(-50, 247, 2, 177, 21);
	LL5[2]=new logs(-300, 247, 2, 177, 21);
		
	//intitial score
	score=0;
	
	//initialize high score
	highscore=0;
}

function start_game(){
	
	img = new Image();
	img.src = "frogger_sprites.png";
	
	pic=new Image();
	pic.src="assets/dead_frog.png";

	canvas=document.getElementById('game');
	
	move_sound=document.getElementById('mysound');
	dead_sound=document.getElementById('deadsound');
	
	img.onload=function(){
	initialize()

	//loop through game 
	setInterval(gameLoop, 30)
		
	}

}

function gameLoop(){
	if (lives>0){
		update()
		draw()
	}
	else{
	gameOver()
	}
}

function carsForward(carArray){
	L=carArray.length;
		for(i=0; i<L; i++){
			if(carArray[i].x<400){
				carArray[i].x+=carArray[i].vel;
			}
			else{
				if(carArray[0].x>=400){
					carArray[0].x=carArray[L-1].x-220;
				}
				else{
					carArray[i].x=carArray[i-1].x-100;
				}
			}
			carArray[i].box.x_center=carArray[i].x+(carArray[i].w*.5);
			hit=colliding(carArray[i].box, frog_box)
			if(hit==true){
				loseLife();				
			}
		}
		
}

function logUpdate(LogArray){

L=LogArray.length;
land=false;

	for(i=0;i<L; i++){
		if(LogArray[i].x<400){
			LogArray[i].x+=LogArray[i].vel;
		}
		else 
		{
			if(LogArray[0].x>=400){
				LogArray[0].x=LogArray[L-1].x-350;
			}
			else{
				LogArray[i].x = LogArray[i-1].x - 200;

			}
		}
		LogArray[i].box.x_center=LogArray[i].x+(LogArray[i].w*.5);
		land=colliding(LogArray[i].box, frog_box);
		if(land==true){
			frog_x+=LogArray[i].vel;
			frog_box.x_center=frog_x+(frog_box.w*.5);
			frogSafe=true;

		}
	}
}

function carsBackward(carArray){
	L=carArray.length;
		for(i=0; i<L; i++){
			if(carArray[i].x+50>0){
				carArray[i].x=carArray[i].x-carArray[i].vel;
			}
			else{
				if(carArray[0].x+50<=0){
					carArray[0].x=carArray[L-1].x+200;
				}
				else{
					carArray[i].x=carArray[i-1].x+120;
				}
			}
			carArray[i].box.x_center=carArray[i].x+(carArray[i].w*.5);
			
			hit=colliding(carArray[i].box, frog_box);
			if(hit==true){
				loseLife();
			}
		}
}
				
function logBackward(LogArr){
	l=LogArr.length;
	land=false;
	
	for(i=0; i<l; i++){
		if (LogArr[i].x+116>0){
			LogArr[i].x=LogArr[i].x-LogArr[i].vel;
		}
		else{
			if(LogArr[0].x+116<=0){
				LogArr[0].x=LogArr[l-1].x+300;
			}
			else{
				LogArr[i].x=LogArr[i-1].x+150;
			}
		}
		LogArr[i].box.x_center=LogArr[i].x+(LogArr[i].w*.5);
		
		land=colliding(LogArr[i].box, frog_box);
		if(land==true){
			frog_x-=LogArr[i].vel;
			frog_box.x_center=frog_x+(frog_box.w*.5);
			frogSafe=true;
		}
	}
}



function arrowDown(event){
	if (event.keyCode==38){ //up
		s_x_f1=46;
		s_y_f1=366;
		s_w_f1=22;
		s_h_f1=25;
		
		frog_y-=33;
		frog_box.y_center-=33;
	
		console.log(frog_box.y_center)
		
		move_sound.play();

		
	}
	else if(event.keyCode==40){ //down
		s_x_f1=114;
		s_y_f1=366;
		s_w_f1=22;
		s_h_f1=25;
		
		frog_y+=33;
		frog_box.y_center+=33;
		
		move_sound.play();
		
	}
	else if(event.keyCode==37){ //left
		s_x_f1=112;
		s_y_f1=338;
		s_w_f1=25;
		s_h_f1=22;
		
		frog_x-=10;
		frog_box.x_center-=10;
		
		move_sound.play();
		
	}
	else if(event.keyCode==39){ //right
		s_x_f1=43;
		s_y_f1=335;
		s_w_f1=25;
		s_h_f1=22;
		
		frog_x+=10;
		frog_box.x_center+=10;
		
		move_sound.play();
		
	}
}

function hitLilly(){
if((colliding(frog_box, lil1)==true)||(colliding(frog_box, lil2)==true)||(colliding(frog_box, lil3)==true)||(colliding(frog_box, lil4)==true)||(colliding(frog_box, lil5)==true)||(colliding(frog_box,lil6)==true))
{
loseLife();	
}
}

function arrowUp(event){
	if(event.keyCode==38){ //up
		s_x_f1=12;
		s_y_f1=369;
		s_w_f1=23;
		s_h_f1=17;
		
		
		hitLilly();
		if((hit!==true)&&(colliding(frog_box, startBox)!==true)){
		score+=10;
		}
		
		getHome()
	}
	
	else if(event.keyCode==40){ //down
		s_x_f1=80; 
		s_y_f1=369;
		s_w_f1=23;
		s_h_f1=17;
		
	}
	else if(event.keyCode==37){ //left
		s_x_f1=82;
		s_y_f1=335;
		s_w_f1=18;
		s_h_f1=23;
	}
	else if(event.keyCode==39){ //right
		s_x_f1=13;
		s_y_f1=334;
		s_w_f1=17;
		s_h_f1=23;
	}
}


function update(){

frogSafe=false;
died=false;

logUpdate(LL1);
logBackward(LL2);
logUpdate(LL3);
logBackward(LL4);
logUpdate(LL5);
inWater();

carsForward(CL1);
carsBackward(CL2);
carsForward(CL3);
carsBackward(CL4);
carsBackward(CL5);

document.onkeydown=arrowDown;
document.onkeyup=arrowUp;

onScreen();
deadPic();


}


function draw(){

if (canvas.getContext) {
		ctx=canvas.getContext('2d');
		
		//background colors
		ctx.fillStyle="#000000";
		ctx.fillRect(0, 285, 399, 280);
		ctx.fillStyle="#191970"
		ctx.fillRect(0, 0, 399, 285);
		
		//Frogger header
		s_x_header=0;
		s_y_header=0;
		s_w_header=374;
		s_h_header=52;
		ctx.drawImage(img, s_x_header, s_y_header, s_w_header, s_h_header, 25, 0, s_w_header, s_h_header);
		
		//lillipads
		s_x_lilly=0;
		s_y_lilly=50;
		s_w_lilly=399;
		s_h_lilly=63;
		ctx.drawImage(img, s_x_lilly, s_y_lilly, s_w_lilly, s_h_lilly, 0, 50, s_w_lilly, s_h_lilly);
		
		//purple roads
		s_x_road=0;
		s_y_road=115;
		s_w_road=399;
		s_h_road=42;
		ctx.drawImage(img, s_x_road, s_y_road, s_w_road, s_h_road, 0, 274, s_w_road, s_h_road);
		ctx.drawImage(img, s_x_road, s_y_road, s_w_road, s_h_road, 0, 470, s_w_road, s_h_road);
		
		//logs
		s_x_L1=6; s_y_L1=165; s_w_L1=180; s_h_L1=22;
		s_x_Lsm=7; s_y_Lsm=230; s_w_Lsm=84; s_h_Lsm=22;
		s_x_lm=7; s_y_lm=198; s_w_lm=116; s_h_lm=22;
			
		for(i=0; i<LL1.length; i++){	
			ctx.drawImage(img, s_x_L1, s_y_L1, s_w_L1, s_h_L1, LL1[i].x, LL1[i].y, s_w_L1, s_h_L1);
		}
		for(i=0; i<LL2.length; i++){
			ctx.drawImage(img, s_x_lm, s_y_lm, s_w_lm, s_h_lm, LL2[i].x, LL2[i].y, s_w_lm, s_h_lm);
		}
		for(i=0; i<LL3.length; i++){
			ctx.drawImage(img, s_x_Lsm, s_y_Lsm, s_w_Lsm, s_h_Lsm, LL3[i].x, LL3[i].y, s_w_Lsm, s_h_Lsm);
		}
		
		for(i=0; i<LL4.length; i++){
			ctx.drawImage(img, s_x_lm, s_y_lm, s_w_lm, s_h_lm, LL4[i].x, LL4[i].y, s_w_lm, s_h_lm);
		}
		
		for(i=0; i<LL5.length; i++){
			ctx.drawImage(img, s_x_L1, s_y_L1, s_w_L1, s_h_L1, LL5[i].x, LL5[i].y, s_w_L1, s_h_L1);
		}
		
		
		//cars
		s_x_c1=9; s_y_c1=266; s_w_c1=31; s_h_c1=23;	
		s_x_yellow=81; s_y_yellow=263; s_w_yellow=27; s_h_yellow=27;
		s_x_green=46; s_y_green=264; s_w_green=25; s_h_green=26;
		s_x_red=71; s_y_red=300; s_w_red=26; s_h_red=23;			
		s_x_truck=104; s_y_truck=301; s_w_truck=49; s_h_truck=21;
				
		for(i=0; i<CL1.length; i++){
			ctx.drawImage(img, s_x_green, s_y_green, s_w_green, s_h_green, CL1[i].x, CL1[i].y, s_w_green, s_h_green);	
		}
		for(i=0; i<CL2.length; i++){
			ctx.drawImage(img, s_x_c1, s_y_c1, s_w_c1, s_h_c1, CL2[i].x, CL2[i].y, s_w_c1, s_h_c1);
		}
		for(i=0; i<CL3.length; i++){
			ctx.drawImage(img, s_x_red, s_y_red, s_w_red, s_h_red, CL3[i].x, CL3[i].y, s_w_red, s_h_red);
		}
		for(i=0; i<CL4.length; i++){
			ctx.drawImage(img, s_x_truck, s_y_truck, s_w_truck, s_h_truck, CL4[i].x, CL4[i].y, s_w_truck, s_h_truck);
		}
		for(i=0; i<CL5.length; i++){
			ctx.drawImage(img, s_x_yellow, s_y_yellow, s_w_yellow, s_h_yellow, CL5[i].x, CL5[i].y, s_w_yellow, s_h_yellow);
		}
		
		if(isDead==false){
		//frog
		ctx.drawImage(img, s_x_f1, s_y_f1, s_w_f1, s_h_f1, frog_x, frog_y, s_w_f1, s_h_f1);
		}
		if(isDead==true){
			ctx.drawImage(pic, 0, 0, 30, 30, dead_x, dead_y, 30, 30);
		}
		
		//high score text
		ctx.font="18px Calibri";
		ctx.fillStyle="rgb(39, 220, 35)";
		ctx.fillText("High Score:"+" "+highscore, 130, 560);
	

		//lives left text
		ctx.font="25px Calibri";
		ctx.fillStyle="rgb(39, 220, 35)";
		ctx.fillText("Level"+" "+level, 130, 530);

		//score text
		ctx.font="18px Calibri";
		ctx.fillStyle="rgb(39, 220, 35)";
		ctx.fillText("Score:"+" "+score, 0, 560);
		
		//displays lives left in frogs at bottom of page
		frog_lives_x=0;
		frog_lives_y=510;
		for(i=0; i<lives; i++){
			ctx.drawImage(img, s_llf_x, s_llf_y, s_llf_w, s_llf_h, frog_lives_x, frog_lives_y, s_llf_w, s_llf_h);
			frog_lives_x=frog_lives_x+25;	
		}
	}
	else {
		alert('Sorry, canvas is not supported on your browser!');
	}
}

function frog(x_pos, y_pos, width, height){
	this.x=x_pos;
	this.y=y_pos;
	this.w=width;
	this.h=height;
	this.box=new boundBox(x_pos, y_pos, width, height);
}

function logs(x_pos, y_pos, velocity, width, height){
	this.x=x_pos;
	this.y=y_pos;
	this.vel=velocity;
	this.w=width;
	this.h=height;
	this.box=new boundBox(x_pos, y_pos, width, height);
}

function cars(x_pos, y_pos, velocity, width, height){
	this.x=x_pos;
	this.y=y_pos;
	this.vel=velocity;
	this.w=width;
	this.h=height;
	this.box=new boundBox(x_pos, y_pos, width, height);
}

function boundBox(x, y, w, h){
	this.x_center=x+(w*.5);
	this.y_center=y+(h*.5);
	this.w=w;
	this.h=h;	
}

function colliding(BoxA, BoxB){
	return (((Math.abs(BoxA.x_center-BoxB.x_center)*2)<(BoxA.w+BoxB.w))&&((Math.abs(BoxA.y_center-BoxB.y_center)*2)<(BoxA.h+BoxB.h)));
}

function inWater(){		
	if((frog_y>113)&&(frog_y<274)&&(frogSafe==false)){	
			loseLife()	
	}
}

function getHome(){
			if((hit!==true)&&((colliding(frog_box, base1)==true)||(colliding(frog_box, base2)==true)||(colliding(frog_box, base3)==true)||(colliding(frog_box, base4)==true)||(colliding(frog_box, base5)==true))){
			score+=50
			frogsHome+=1;
			if(frogsHome==5||frogsHome==10||frogsHome==15||frogsHome==20){
				score+=1000;
				
				//speed up every five getHome's
				for(i=0; i<4; i++){ 
					CL1[i].vel+=1.5;
					CL2[i].vel+=1.5;
					LL3[i].vel+=1.5;
				}
				for(i=0; i<3; i++){
					CL3[i].vel+=1;
					CL4[i].vel+=1;
					CL5[i].vel+=1;
					LL1[i].vel+=1;
					LL2[i].vel+=1;
					LL4[i].vel+=1;
					LL5[i].vel+=1;
				}
				
			}
			reset()
			}
}

function onScreen(){
	if(frog_x<0 || frog_x>376 || frog_y>512){
		loseLife();
	}
}

function loseLife(){
	dead_sound.play();
	
	isDead=true;
	dead_x=frog_x;
	dead_y=frog_y;
	
	frog_x=186;
	frog_y=480;
	frog_box.x_center=frog_x+(frog_box.w*.5);
	frog_box.y_center=frog_y+(frog_box.h*.5);
	
	s_x_f1=12;
	s_y_f1=369;
	s_w_f1=23;
	s_h_f1=17;
	lives-=1;
	
}

function deadPic(){
	if (isDead==true){	
		if(timer<death_duration){
			timer+=1;
			console.log(timer);
	}
	else{
		timer=0;
		isDead=false;
	}
	}
}

function reset(){
	frog_x=186;
	frog_y=480;
	frog_box.x_center=frog_x+(frog_box.w*.5);
	frog_box.y_center=frog_y+(frog_box.h*.5);
}

function gameOver(){

window.alert("Game Over!"+ "\n" +" Your Score is: " + score +"\n\n"+"Press OK to start new game.");
location.reload();
}
