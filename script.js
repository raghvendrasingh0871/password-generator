let slider=document.getElementById("slider");
let sliderValue=document.getElementById("sliderValue");
slider.addEventListener('click',()=>{
    sliderValue.textContent=slider.value;
});
let passBox=document.getElementById("passBox");
let lowercase=document.getElementById("lowercase");
let uppercase=document.getElementById("uppercase");
let numbers=document.getElementById("numbers");
let symbols=document.getElementById("symbols");
let button=document.getElementById("button");
let strengthValue=document.getElementById("strengthValue");
let copyImg=document.getElementById("copyImg");
let items=document.querySelectorAll(".items");
let lower="abcdefghijklmnopqrstuvwxyz";
let upper="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let number="0123456789";
let symbol="~!@#$%^&*";
let distinct=0;

function getChar(str){
    return str.charAt(Math.floor(Math.random()*str.length));
}

function generatePassword(){
    password="";
    allChar="";
    length=0;
    // console.log(length);
    if(lowercase.checked){
        length++;
        password+=getChar(lower);
        allChar+=lower;
    }
    if(uppercase.checked){
        length++;
        password+=getChar(upper);
        allChar+=upper;
    }
    if(numbers.checked){
        length++;
        password+=getChar(number);
        allChar+=number;
    }
    if(symbols.checked){
        length++;
        password+=getChar(symbol);
        allChar+=symbol;
    }
    distinct=length;
    if(slider.value<length){
        passBox.value="";
        alert("Password length is less than expected");
        return "";
    }
    if(length==0){
        passBox.value="";
        alert("Nothing is included");
        return "";
    }
    while(length<slider.value){
        password+=getChar(allChar);
        length++;
    }
    return password;
}
function generateStrength(pass){
    n=pass.length;
    if(n==0){
        return 0;
    }
    c=0;
    if(numbers.checked){
        c++;
    }
    if(symbols.checked){
        c++;
    }
    if(distinct==4){
        
        if(n>=12){
            return 10;
        }
        if(n>=8){
            return 9;
        }
        if(n<=5){
            return 4;
        }
        return 8;
    }
    if(distinct==3){
        if(n>=15){
            return 9;
        }
        if(n>=12){
            return 8;
        }
        if(n>=8){
            return 7;
        }
        if(n<=5){
            return 3;
        }
        return 6;
    }
    if(distinct==2){
        if(n>=15){
            return 8;
        }
        if(n>=12){
            return 7;
        }
        if(n>=8){
            return 6;
        }
        if(n<=5){
            return 2;
        }
        return 4;
    }
    // distinct==1
    if(n>=15){
        return 6;
    }
    if(n>=12){
        return 5;
    }
    if(n>=8){
        return 4;
    }
    if(n<=5){
        return 1;
    }
    return 3;
}
button.addEventListener('click',()=>{
    copyImg.src="images/copy-icon.jpg";
    copyImg.title="copy";
    pass=generatePassword();
    passBox.value=pass;
    strength=generateStrength(pass);
    strengthValue.textContent=strength+""+"/10";
    for(let i=0;i<10;i++){
        items[i].style.backgroundColor="white";
    }
    for(let i=0;i<strength;i++){

        if(i<=2)
            items[i].style.backgroundColor="green";
        else if(i<=6)
            items[i].style.backgroundColor="red";
        else if(i<=8)
            items[i].style.backgroundColor="orange";
        else
            items[i].style.backgroundColor="black";
        items[i].style.background="greenyellow";
        items[i].style.background="to right linear-gradient(green,greenyellow,yellow)";
        
    }
})
function copyPassword(){
    navigator.clipboard.writeText(passBox.value);
    copyImg.title="copied";
    copyImg.src="images/tick-mark.jpg";
    setTimeout(()=>{
        copyImg.src="images/copy-icon.jpg";
        copyImg.title="copy";
    },3000);
}
copyImg.addEventListener('click',copyPassword);