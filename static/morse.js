var morseCode = "A;.-|B;-...|C;-.-.|D;-..|E;.|F;..-.|G;--.|H;....|I;..|J;.---|K;-.-|L;.-..|M;--|N;-.|O;---|P;.--.|Q;--.-|R;.-.|S;...|T;-|U;..-|V;...-|W;.--|X;-..-|Y;-.--|Z;--..|0;-----|1;.----;|2;..---|3;...--|4;....-|5;.....|6;-....|7;--...|8;---..|9;----."
// 用；區隔英文字母與密碼
// | 隔開每個英文所代表的符號內容

var morseList = morseCode.split("|")
for(var i=0; i<morseList.length;i++){
  morseList[i]=morseList[i].split(";")
  $("ul.translist").append("<li>"+morseList[i][0]+" "+morseList[i][1]+"</li>")
}

function findCode(letter){
  for (var i=0; i<morseList.length; i++){
    if(morseList[i][0] == letter){
      return morseList[i][1]
    }
  }
  return letter
}

function findLetter(code){
  for(var i=0; i<morseList.length; i++){
    if(morseList[i][1] == code){
      return morseList[i][0]
    }
  }
  return code 
}

function translateToMorse(text){
  text = text.toUpperCase()
  var result = ""
  for (var i=0; i<text.length; i++){
    result += findCode(text[i])+" "
  }
  return result
}

function translateToEng(text){
  text = text.split(" ")
  var result = ""
  for (var i=0; i<text.length; i++){
    result += findLetter(text[i])
  }
  return result
}

$("#btnMorse").click(function(){
  var input = $("#input").val()
  var result = translateToMorse(input)
  $("#output").val(result)
  $("#output").css({
    backgroundColor: "#2EC4B6"
  }).animate({
    backgroundColor: "transparent"
  },500)
  $(".symbol").velocity({
    rotateZ:["0deg","360deg"]
  })
})

$("#btnEng").click(function(){
  var input = $("#output").val()
  var result = translateToEng(input)
  $("#input").val(result)
  $("#input").css({
    backgroundColor: "#CBF3F0"
  }).animate({
    backgroundColor: "transparent"
  },500)
   $(".symbol").velocity({
    rotateZ: ["0deg","360deg"]
  })
})

function play(texts, nowindex){
  var word = texts[nowindex]
  var lasttime = 300
  if (word == "."){
    $("audio.short")[0].play()
    lasttime = 300
  }else if (word == "-"){
    $("audio.long")[0].play()
    lasttime = 500
  } else{
    lasttime = 1000
  }
  
  $(".playlist span").removeClass("playing")
  $(".playlist span").eq(nowindex).addClass("playing")
  
  if (texts.length>nowindex){
    setTimeout(function(){
      play(texts,nowindex+1)
    },lasttime)
  }else{
    $(".playlist").html("")
  }
}
$("audio.short")[0].volumn = 0.3
$("audio.long")[0].volumn = 0.3

$("#btnPlay").click(function(){
  var texts = $("#output").val()
  for (var i=0; i<texts.length; i++){
    $(".playlist").append("<span>"+texts[i]+"</span>")
  }
  play(texts,0)
})