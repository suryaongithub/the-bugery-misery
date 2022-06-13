class Game {
  constructor() {
    this.resetButton = createButton('');
    this.resetTitle = createElement('h2');
    
  }

  start() {
    form = new Form();
    form.display();
    player = new Player();
    playerCount = player.getCount();

    car1=createSprite(width/2-100,height-100);
    car2=createSprite(width/2+100,height-100);
    car1.addImage(car1_img);
    car1.scale=0.07;
    car2.addImage(car2_img);
    car2.scale=0.07;
    cars=[car1,car2];

  }

 getState()
  {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on('value',function (data) {
      gameState = data.val();
    });
  }

  update(state)
  {
    database.ref('/').update({
      'gameState':state
    });
    
  }

  play()
  {
    this.handleElements();
    Player.getPlayersInfo();
    this.handleResetButton();
    if(allPlayers !== undefined)
    {
      image(track_img,0,-height*5,width,height*6);
      
      var index = 0;
      for(var plr in allPlayers)
      {
       index++;
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index-1].position.x=x;
        cars[index-1].position.y=y;

        if(index===player.index)
        {
          fill('black')
          stroke(10);
          ellipse(x,y,60,60);

          // camera.position.x=x;
          camera.position.y=y;
        }
      }
      this.handlePlayerControls();
      drawSprites();
    }

    
    
  }

  handleElements()
  {
    form.hide();
    form.titleImg.position(10,10);
    form.titleImg.class('gameTitleAfterEffect');
    this.resetButton.position(width/2+230,100);
    this.resetTitle.position(width/2+200,40);
    this.resetTitle.html('reset game');
    this.resetButton.class('resetButton');
    this.resetTitle.class('resetText')

  }

  handlePlayerControls()
  {
    if(keyIsDown(UP_ARROW))
    {
      player.positionY+=10;
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.positionX>375)
    {
      player.positionX-=10;
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW)&&player.positionX<windowWidth-424)
    {
      player.positionX+=10;
      player.update();
    }
   
    
  }
   handleResetButton()
    {
      this.resetButton.mousePressed(()=>{
      database.ref('/').set({
        'playerCount':0,
        'gameState':0,
        'players':{}
      });
      window.location.reload();
      })
    }
}

