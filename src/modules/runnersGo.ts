// Custom component to handle wheel spinning

import utils from "../../node_modules/decentraland-ecs-utils/index"
//import { InterpolationType } from "../../node_modules/decentraland-ecs-utils/transform/math/interpolation"

@Component('wheelSpin')
export class WheelSpin {
  active: boolean = false
  speed: number = Math.floor((Math.random()*5))
  direction: Vector3 = Vector3.Forward()
}
var startRun :boolean = false
var SelectButtonBet :boolean = false
var betStart :boolean = false // start bet
var rotatecoin : boolean = false;
var onInit : boolean = false;
var money : number = 0;
var betMoney : number = 0;
const velocity : number = Math.floor((Math.random()*(0.5+1))+0.3)
const wheels = engine.getComponentGroup(WheelSpin)
let posX = 0;
let posZButton = 0;
let runners :Entity[] = []
let TransformPos : Transform [] = []
var snailpoly : GLTFShape [] = []
var snailpolyTexture : string [] = []
let bets :Entity[] = []
var value : float = 0
var RunnerNumber : number = 0
let MaterialSnail :Material
let deflatedScale = new Vector3(1, 1, 1)
let inflatedScale = new Vector3(1, 1, 0.95)
let isInflating = false
var Winner : number = 6
var Apuesta : number = 0
var CountDown : number = 5
var OldTextureRunner : UIImage
var OldTextureRunnerWinner : UIImage
var WinneroldTexture : UIImage
var WinLossTexture : UIImage
var rotinverse :number = 0.10
let audioS : AudioSource
let SonidoAmbiente : AudioSource


getEntityFromPool()


function getEntityFromPool()
{
  money = 0
  const MAX_POOL_SIZE : number = 5
  posX = 0
  posZButton = 0
  snailpoly[0]= new GLTFShape('models/Snail_1/Snail1.glb')
  snailpoly[1]= new GLTFShape('models/Snail_2/Snail2.gltf')
  snailpoly[2]= new GLTFShape('models/Snail_3/Snail3.gltf')
  snailpoly[3]= new GLTFShape('models/Snail_4/Snail4.glb')
  snailpoly[4]= new GLTFShape('models/Snail_5/Snail5.gltf')
  snailpolyTexture[0] = "images/snailRunner1.png"
  snailpolyTexture[1] = "images/snailRunner2.png"
  snailpolyTexture[2] = "images/snailRunner3.png"
  snailpolyTexture[3] = "images/snailRunner4.png"
  snailpolyTexture[4] = "images/snailRunner5.png"



    // Check if an existing entity can be used
    for (let i = 0; i < MAX_POOL_SIZE; i++) {
        posX = posX + 4
        runners[i] = new Entity()
        runners[i].addComponent(snailpoly[i])
        var T_pos = new Transform({
          position: new Vector3(45-posX, 0, 65),
          rotation: new Quaternion(0, 0, 0, 1),
          scale: new Vector3(1, 1, 1)
          })
        TransformPos[i] = T_pos
        runners[i].addComponent(T_pos)      
        runners[i].addComponent(new WheelSpin())
        engine.addEntity(runners[i])
        // create buttons for bet
      

    }
    for (let e = 0; e < MAX_POOL_SIZE ; e++) {

      bets[e] = new Entity
      posZButton = posZButton + 3
      var TransBets = new Transform({  position: new Vector3(40.07438894390613, 1, 34.119947641285854 + posZButton),
        rotation: new Quaternion(0, 0, 0, 1),
        scale: new Vector3(0.3, 0.3, 0.3) })
      bets[e].addComponent(TransBets)
      bets[e].addComponent(snailpoly[e])
      engine.addEntity(bets[e])
    }
  }
  
  export class RotatorSystem implements ISystem {
 
    
    update(dt: number) {

      if(rotatecoin){
        let transformCoin = coin.getComponent(Transform)
        transformCoin.rotate(new Vector3(0,dt*0.1,0) ,10)
      }
      // iterate over the wheels in the component group
      if(startRun)
      {
        
        //value = 0
        for (let i = 0; i < runners.length; i++) 
        {   
          if(value == 0 || value < runners[i].getComponent(Transform).position.z)
          {
            value = runners[i].getComponent(Transform).position.z 
            RunnerNumber = i;
            //text.value = "G " + RunnerNumber.toString() + "A "+ Apuesta.toString()    

            if(value>101){
              
              startRun = false;
              if(betStart){
                if(RunnerNumber == Apuesta )
                {  SoundGame("Win")
                WinnerRunner(snailpolyTexture[RunnerNumber],2)             
                  WinMoney()  // Winner 
                }else{
                  SoundGame("lose")
                  WinnerRunner(snailpolyTexture[RunnerNumber],1)
                 //money -= 100 // losser
                }
               
              }else{
                WinnerRunner(snailpolyTexture[RunnerNumber],0)
                SoundGame("lose")
              }           
              Finish()
            }else{
              for (let wheel of wheels.entities) {
                // handy shortcuts
                let spin = wheel.getComponent(WheelSpin)
                let transform = wheel.getComponent(Transform)
                // check state
                if (spin.active){
                  // spin the wheel
                  transform.translate(spin.direction.scale(Math.random()* 0.1 + Math.random() * dt))
                  //transform.scale = new Vector3(1, 1,1 +(Math.random()))
                }
      
              }
            }
            
          }     
        }
      }
      }     
  }
  const boatWheel_01 = new Entity()
  boatWheel_01.setParent(scene)
  const gltfShape_95 = new GLTFShape('models/BoatWheel_01/BoatWheel_01.glb')
  boatWheel_01.addComponentOrReplace(gltfShape_95)
  const transform_527 = new Transform({
    position: new Vector3(43.5, 4.336564611934587, 52),
    rotation: new Quaternion(0, -0.23932339331937785, 0, 0.9709399123581738),
    scale: new Vector3(3.100894025005099, 3.100894025005099, 3.100894025005099)
  })
  boatWheel_01.addComponentOrReplace(transform_527)
  engine.addEntity(boatWheel_01)

const coin = new Entity()
//const uiTriggerRun = new Entity()

const gltfShape_79 = new GLTFShape('models/Coin.gltf')
coin.addComponentOrReplace(gltfShape_79)
const transform_488 = new Transform({
  position: new Vector3(54.68216974852302, 1.1434505272627309, 42),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(0.3847261112689355, 0.3847261112689355, 0.3847261112689355)
})
coin.addComponentOrReplace(transform_488)

engine.addEntity(coin)
rotatecoin = true;
  // Add system to engine
engine.addSystem(new RotatorSystem())


// buy coins
const transformCoins = new Transform({  position: new Vector3(54.5, 1, 42.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1) })


//Star run (need back count)
const transformRun = new Transform({ position: new Vector3(46, 1, 68),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1) })
//uiTriggerRun.addComponent(transformRun)
//uiTriggerRun.addComponent(new BoxShape())

// Map indications
const map_04 = new Entity()
map_04.setParent(scene)

var Sclipm = new AudioClip('sounds/sonidoambiente.mp3')
SonidoAmbiente = new AudioSource(Sclipm)
map_04.addComponentOrReplace(SonidoAmbiente)
SonidoAmbiente.loop = true
map_04.getComponent(AudioSource).playing = true

const gltfShape_86 = new GLTFShape('models/Map_04/Map_04.glb')
map_04.addComponentOrReplace(gltfShape_86)
const transform_507 = new Transform({
  position: new Vector3(23.41367555554279, 1.5511191765787213, 20.5815943198612),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
map_04.addComponentOrReplace(transform_507)
engine.addEntity(map_04)
map_04.addComponent(
  new OnPointerDown(() => {
    SoundGame("informacion")
    let InfoAtlas = "images/pirataUI.jpg"
    let imageTexturePanel = new Texture(InfoAtlas)
    const canvas3 = new UICanvas()
    const InfoPanel= new UIImage(canvas3, imageTexturePanel)
    InfoPanel.positionY= 0
    InfoPanel.positionX= 0
    InfoPanel.hAlign = 'center'
    InfoPanel.vAlign = 'center'
    InfoPanel.sourceWidth = 1348    
    InfoPanel.sourceHeight = 988
    InfoPanel.width = 607  
    InfoPanel.height = 444
    const  panelI = new Entity()
    panelI.addComponent(new utils.Delay(5000, () => {
      InfoPanel.visible = false
    }))
    engine.addEntity(panelI)
  })
)


//Create material and configure its fields

// canvas chips
 
  const canvas = new UICanvas()
  const text = new UIText(canvas)
  const Bettext = new UIText(canvas)

// Buttons actions

  coin.addComponent(
  new OnPointerDown(() => {
  if(!canvas.visible){
    canvas.visible = true
    
  }
  let imageAtlas = "images/piratamonedas.png"
  let imageTexture = new Texture(imageAtlas)
  let imageMoney = "images/piratafondoapuesta.png"
  let imageTextureMoney = new Texture(imageMoney)
  canvas.isPointerBlocker = true
  const playButton = new UIImage(canvas, imageTexture)
  
  //text.value = runners[RunnerNumber].name
  text.positionY= -160
  text.positionX= 110
  text.fontSize =55
  if(money < 100)
    {
      if(onInit==false){
        StartGames()
        onInit = true
      }
      SoundGame("CoinWin")
      money = 1000  
      text.value ="$"+money.toString()
      playButton.positionY= -200
      playButton.positionX= 50
      playButton.hAlign = 'center'
      playButton.vAlign = 'center'
      playButton.sourceLeft = 0
      playButton.sourceTop = 0
      playButton.sourceWidth = 194    
      playButton.sourceHeight = 118
      playButton.width = 206  
      playButton.height = 157
    
      
    
      const moneyTexture = new UIImage(canvas, imageTextureMoney)  
      moneyTexture.positionY= -200
      moneyTexture.positionX= -350
      moneyTexture.hAlign = 'center'
      moneyTexture.vAlign = 'center'
      moneyTexture.sourceLeft = 0
      moneyTexture.sourceTop = 0
      moneyTexture.sourceWidth = 150    
      moneyTexture.sourceHeight = 80
      moneyTexture.width = 216  
      moneyTexture.height = 65
      moneyTexture.opacity = 0.02
    
    
      Bettext.positionY= -200
      Bettext.positionX= -350
      Bettext.fontSize = 55
      Bettext.value ="$"+betMoney.toString()
      Bettext.color = Color4.Black()
    }
  })
)


function SoundGame (son : string){
  
  
  var clipm = new AudioClip('sounds/'+son+".mp3")
  audioS = new AudioSource(clipm)
  coin.addComponentOrReplace(audioS)//monedas
  runners[1].addComponentOrReplace(audioS)//Canoncongente
  runners[0].addComponentOrReplace(audioS)//sonidocarreras
  map_04.addComponentOrReplace(audioS)  // informacion
  runners[2].addComponentOrReplace(audioS)//Win
  runners[3].addComponentOrReplace(audioS)//lose
  bets[2].addComponentOrReplace(audioS)//CoinWin
  
  
  coin.getComponent(AudioSource).playing = false;
  runners[0].getComponent(AudioSource).playing = false;
  runners[1].getComponent(AudioSource).playing = false;
  runners[2].getComponent(AudioSource).playing = false;
  runners[3].getComponent(AudioSource).playing = false;
  map_04.getComponent(AudioSource).playing = false;
  bets[2].getComponent(AudioSource).playing = false;


switch(son){
  case "monedas": 
  coin.getComponent(AudioSource).playing = true;
  coin.getComponent(AudioSource).playOnce()
  break

  case "Canoncongente": 
  runners[1].getComponent(AudioSource).playing = true;
  runners[1].getComponent(AudioSource).playOnce()
  break

  case "sonidocarreras": 
  runners[0].getComponent(AudioSource).playing = true;
  runners[0].getComponent(AudioSource).playOnce()
  break
  case "informacion": 
  map_04.getComponent(AudioSource).playing = true;
  map_04.getComponent(AudioSource).playOnce()
  break
  case "Win": 
  runners[2].getComponent(AudioSource).playing = true;
  runners[2].getComponent(AudioSource).playOnce()
  break
  case "lose": 
  runners[3].getComponent(AudioSource).playing = true;
  runners[3].getComponent(AudioSource).playOnce()
  break
  case "CoinWin": 
  bets[2].getComponent(AudioSource).playing = true;
  bets[2].getComponent(AudioSource).playOnce()
  break
  
}  

}


function Finish()
{

betMoney = 0;
Bettext.value ="$"+betMoney.toString()
const  restartRunners = new Entity()
restartRunners.addComponent(new utils.Delay(8000, () => {
  
  BackToStartRunners()
}))
engine.addEntity(restartRunners)
}

function BackToStartRunners(){
  
  posX = 0
  OldTextureRunnerWinner.visible = false
  WinneroldTexture.visible = false

  if(betStart){
    WinLossTexture.visible = false;
    OldTextureRunner.visible = false
  }
  for (let i = 0; i < runners.length; i++) 
  {
    //startRun = true
    posX = posX+ 4
    runners[i].getComponent(Transform).position.set(45-posX, 0, 65)

  }
  for (let i = 0; i < runners.length; i++) 
      { 
        bets[i].getComponent(Transform).scale = new Vector3(0.3 , 0.3, 0.3)    
      }
      OldTextureRunner.visible = false;
      SelectButtonBet= false
      betStart = false
  StartGames()
}

function WinMoney(){

  money += 500
  text.value ="$"+money.toString()
}

function BetSnail(pos : string ){
  
    
    const canvas2 = new UICanvas()
    var Runner1 = new UIContainerRect(canvas2)
    Runner1.adaptHeight = true
    Runner1.adaptWidth = true
    Runner1.positionX = -210  // -680
    Runner1.positionY = -200   //  150
    Runner1.opacity = 0.8

    let runnerTexture = new Texture(pos)
    
    const PosImageRunner = new UIImage(Runner1, runnerTexture)
    PosImageRunner.hAlign = 'center'
    PosImageRunner.vAlign = 'center'
    PosImageRunner.sourceLeft = 0
    PosImageRunner.sourceTop = 0
    PosImageRunner.sourceWidth = 512    
    PosImageRunner.sourceHeight = 512
    PosImageRunner.width = 153
    PosImageRunner.height = 153

    OldTextureRunner = PosImageRunner
}
function WinnerRunner(pos : string , winLoss : number){
  
  const canvas3 = new UICanvas()
  var RunnerW = new UIContainerRect(canvas3)
  RunnerW.adaptHeight = true
  RunnerW.adaptWidth = true
  RunnerW.positionX = -100
  RunnerW.positionY = 100
  RunnerW.opacity = 0.8
  var WinLetter = new UIContainerRect(canvas3)
  WinLetter.adaptHeight = true
  WinLetter.adaptWidth = true
  WinLetter.positionX = -230
  WinLetter.positionY = 300
  WinLetter.opacity = 0.8


if(winLoss == 1){
  var WinnerOrLosser = new UIContainerRect(canvas3)
  WinnerOrLosser.adaptHeight = true
  WinnerOrLosser.adaptWidth = true
  WinnerOrLosser.positionX = -230
  WinnerOrLosser.positionY = 50
  WinnerOrLosser.opacity = 0.8
  let loss = new Texture("images/Youlost.png")
  const L_loss = new UIImage(WinnerOrLosser, loss)
  L_loss.hAlign = 'center'
  L_loss.vAlign = 'center'
  L_loss.sourceLeft = 0
  L_loss.sourceTop = 0
  L_loss.sourceWidth = 278    
  L_loss.sourceHeight = 58
  L_loss.width = 556
  L_loss.height = 116

  WinLossTexture = L_loss
}
  if(winLoss == 2){
    var WinnerOrLosser = new UIContainerRect(canvas3)
    WinnerOrLosser.adaptHeight = true
    WinnerOrLosser.adaptWidth = true
    WinnerOrLosser.positionX = -230
    WinnerOrLosser.positionY = 50
    WinnerOrLosser.opacity = 0.8
    let win = new Texture("images/Youwin.png")
    const L_win= new UIImage(WinnerOrLosser, win)
    L_win.hAlign = 'center'
    L_win.vAlign = 'center'
    L_win.sourceLeft = 0
    L_win.sourceTop = 0
    L_win.sourceWidth = 242    
    L_win.sourceHeight = 58
    L_win.width = 484
    L_win.height = 116

    WinLossTexture = L_win;
  }


  let runnerTextureWinner = new Texture(pos)

  const PosRunner = new UIImage(RunnerW, runnerTextureWinner)
  PosRunner.hAlign = 'center'
  PosRunner.vAlign = 'center'
  PosRunner.sourceLeft = 0
  PosRunner.sourceTop = 0
  PosRunner.sourceWidth = 1533    
  PosRunner.sourceHeight = 1533
  PosRunner.width = 512
  PosRunner.height = 512

  let winTexture = new Texture("images/winpng.png")
  const LetterWin = new UIImage(WinLetter, winTexture)
  LetterWin.hAlign = 'center'
  LetterWin.vAlign = 'center'
  LetterWin.sourceLeft = 0
  LetterWin.sourceTop = 0
  LetterWin.sourceWidth = 452    
  LetterWin.sourceHeight = 224
  LetterWin.width = 100
  LetterWin.height = 50


  WinneroldTexture = LetterWin
  OldTextureRunnerWinner = PosRunner
}

function BackCount(){
  
  const textCount = new UIText(canvas)
  textCount.positionY= 270
  textCount.positionX= 0
  textCount.fontSize =100
  textCount.value = CountDown.toString()
  textCount.value = ""
  
  const  contador = new Entity()
  const  contador1 = new Entity()
  const  contador2 = new Entity()
  const  contador3 = new Entity()
  const  contador4 = new Entity()
  const  desactive = new Entity()
  

contador.addComponent(new utils.Delay(1000, () => {
  if(CountDown>0){
    CountDown -=1
    textCount.value = CountDown.toString() 
    engine.addEntity(contador1)
  }
}))
contador1.addComponent(new utils.Delay(1000, () => {
    CountDown -=1
    textCount.value = CountDown.toString() 
    engine.addEntity(contador2)
}))
contador2.addComponent(new utils.Delay(1000, () => {
  CountDown -=1
  textCount.value = CountDown.toString() 
  engine.addEntity(contador3)
}))
contador3.addComponent(new utils.Delay(1000, () => {
  CountDown -=1
  textCount.value =  CountDown.toString() 
  engine.addEntity(contador4)

}))
contador4.addComponent(new utils.Delay(1000, () => {
  textCount.value = "GO" 
  startRun = true
  SoundGame("sonidocarreras")
  engine.addEntity(desactive)
}))
desactive.addComponent(new utils.Delay(1000, () => {
  CountDown = 5
  textCount.value = "" 
}))
// add entity to scene
engine.addEntity(contador)
}

function StartGames(){
  const  StartG = new Entity()
  //text.value = "Start"
  StartG.addComponent(new utils.Delay(10000, () => { 
    //text.value = "3Start"   
      value = 0
      //audioS.playing= false
      SoundGame("Canoncongente")
      BackCount()
      
      posX = 0;
      for (let i = 0; i < runners.length; i++) 
      {
        //startRun = true
        posX = posX+ 4
        runners[i].getComponent(Transform).position.set(45-posX, 0, 65)
        let spin = runners[i].getComponent(WheelSpin)
        spin.active = true;
        spin.speed = Math.random()
      }
      
  }))
  engine.addEntity(StartG)
}

    bets[0].addComponent(
    new OnPointerDown(() => {
    
    if(!SelectButtonBet && money >= 100)
    {
        SelectButtonBet = true       
        betStart = true
        bets[0].getComponent(Transform).scale = new Vector3(0.5 , 0.5, 0.5) 
        if(money>100){
          money-= 100
          Apuesta = 0
          BetSnail(snailpolyTexture[0])
          betMoney+=100
          if(!startRun){
            SoundGame("CoinWin")
          }
          
        }
        text.value = "$ " + money.toString()
        Bettext.value ="$"+betMoney.toString()
    }else
    {
      for (let i = 0; i < runners.length; i++) 
      { 
        bets[i].getComponent(Transform).scale = new Vector3(0.3 , 0.3, 0.3)    
      }
      OldTextureRunner.visible = false;
      SelectButtonBet= false
      money+= 100
      if(betMoney>0){
        betMoney-=100
      }
      
      text.value = "$ " + money.toString()
      Bettext.value ="$"+betMoney.toString()
    }
    }))
    bets[1].addComponent(
      new OnPointerDown(() => {
      if(!SelectButtonBet && money >= 100)
      {
        SelectButtonBet = true
        betStart = true
        bets[1].getComponent(Transform).scale = new Vector3(0.5 , 0.5, 0.5)
        if(money>100){
          money-= 100
          Apuesta = 1
          BetSnail(snailpolyTexture[1])
          betMoney+=100
          if(!startRun){
            SoundGame("CoinWin")
          }
        }
        text.value = "$ " + money.toString()
        Bettext.value ="$"+betMoney.toString()
      }else
      {
        for (let i = 0; i < runners.length; i++) 
        {     
          bets[i].getComponent(Transform).scale = new Vector3(0.3 , 0.3, 0.3)   
        }
        OldTextureRunner.visible = false;
        SelectButtonBet= false
        money+= 100
        if(betMoney>0){
          betMoney-=100
        }
        text.value = "$ " + money.toString()
        Bettext.value ="$"+betMoney.toString()
      }
      }))
      bets[2].addComponent(
        new OnPointerDown(() => {
        if(!SelectButtonBet && money >= 100)
        {
          SelectButtonBet = true
          betStart = true
          bets[2].getComponent(Transform).scale = new Vector3(0.5 , 0.5, 0.5)
          if(money>100){
            money-= 100
            Apuesta = 2
            BetSnail(snailpolyTexture[2])
            betMoney+=100
            if(!startRun){
              SoundGame("CoinWin")
            }
          }
          text.value = "$ " + money.toString()
          Bettext.value ="$"+betMoney.toString()
        }else
        {
          for (let i = 0; i < runners.length; i++) 
          {     
            bets[i].getComponent(Transform).scale = new Vector3(0.3 , 0.3, 0.3)    
          }
          OldTextureRunner.visible = false;
          SelectButtonBet= false
          money+= 100
          if(betMoney>0){
            betMoney-=100
          }
          text.value = "$ " + money.toString()
          Bettext.value ="$"+betMoney.toString()
        }
        }))
        bets[3].addComponent(
          new OnPointerDown(() => {
          if(!SelectButtonBet && money >= 100)
          {
            SelectButtonBet = true
            betStart = true
            bets[3].getComponent(Transform).scale = new Vector3(0.5 , 0.5, 0.5)
            if(money>100){
              money-= 100
              Apuesta = 3
              BetSnail(snailpolyTexture[3])
              betMoney+=100
              if(!startRun){
                SoundGame("CoinWin")
              }
            }
            text.value = "$ " + money.toString()
            Bettext.value ="$"+betMoney.toString()
          }else
          {
            for (let i = 0; i < runners.length; i++) 
            {     
              bets[i].getComponent(Transform).scale = new Vector3(0.3 , 0.3, 0.3)   
            }
            OldTextureRunner.visible = false;
            SelectButtonBet= false
            money+= 100
            if(betMoney>0){
              betMoney-=100
            }
            text.value = "$ " + money.toString()
            Bettext.value ="$"+betMoney.toString()
          }
          }))
          bets[4].addComponent(
            new OnPointerDown(() => {
            if(!SelectButtonBet && money >= 100)
            {
              SelectButtonBet = true
              betStart = true
              bets[4].getComponent(Transform).scale = new Vector3(0.5 , 0.5, 0.5)
              if(money>100){
                money-= 100
                Apuesta = 4
                BetSnail(snailpolyTexture[4])
                betMoney+=100
                if(!startRun){
                  SoundGame("CoinWin")
                }
              }
              text.value = "$ " + money.toString()
              Bettext.value ="$"+betMoney.toString()
            }else
            {
              for (let i = 0; i < runners.length; i++) 
              {     
                bets[i].getComponent(Transform).scale = new Vector3(0.3 , 0.3, 0.3)    
              }
              OldTextureRunner.visible = false;
              SelectButtonBet= false
              money+= 100
              if(betMoney>0){
                betMoney-=100
              }
              text.value = "$ " + money.toString()
              Bettext.value ="$"+betMoney.toString()
            }
            })) 
            
            
//engine.addEntity(BuyCoins)
//engine.addEntity(uiTriggerRun)