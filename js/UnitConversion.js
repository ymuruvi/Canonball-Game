var value="#FFFFFF";
function invertColor(color){
    var chars=["","","","","",""];
    var char;
    for(var char=1;char<=6;char++){
        char=color.substring(char,char+1);
        console.log(char);
        if(char==="0"){
            char="F";
        }else if(char==="1"){
            char="E";
        }else if(char==="2"){
            char="D";
        }else if(char==="3"){
            char="C";
        }else if(char==="4"){
            char="B";
        }else if(char==="5"){
            char="A";
        }else if(char==="6"){
            char="9";
        }else if(char==="7"){
            char="8";
        }else if(char==="8"){
            char="7";
        }else if(char==="9"){
            char="6";
        }else if(char==="A"){
            char="5";
        }else if(char==="B"){
            char="4";
        }else if(char==="C"){
            char="3";
        }else if(char==="D"){
            char="2";
        }else if(char==="E"){
            char="1";
        }else if(char==="F"){
            char="0";
        }
        chars[char-1]=char;
        console.log("Hello: "+chars[char-1]);
    }
    color="#";
    for(var char=1;char<=6;char++){
        color+=chars[char];
    }
    return color;
}
console.log(value+" inverted is "+invertColor(value));