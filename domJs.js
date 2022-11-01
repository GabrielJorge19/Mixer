document.getElementById('wordToCode').focus();
const mixer = new Cr();

function onTen(value = document.getElementById('wordToCode').value){
	if(value.length == 10){

		let code = value.toString().slice(0,2);
		let pass = value.toString().slice(2,6);
		let insc = value.toString().slice(6,10);

		let coded = mixer.encode(code, pass, insc);
		let decoded = mixer.decode(coded);
		decoded = decoded.mixerCode + ' ' + decoded.password + ' ' + decoded.instructions;
	
		document.getElementById('coded').value = coded;
		document.getElementById('uncoded').value = decoded;
		document.getElementById('wordToCode').blur();
	}
}

document.body.onkeydown = function(e){
 	// 37, 38, 39 e 40;

 	switch(e.keyCode){
 		case 37:
 			if((currentCode%10) > 1){
 				currentCode--
 			} else if((currentCode)/10 > 1){
 				currentCode -= 3;
 			}
 		break; 
 		case 38:
 		break; 
 		case 39:
 			if((currentCode%10) < 8){
 				currentCode++;
 			} else if((currentCode)/10 < 3){
 				currentCode += 3;
 			}
 		break; 
 		case 40:
 		break; 

 	}
	setCode(currentCode);
};
















///////////////////////////////////////////////////////////////////////

let currentCode = 1;

function setCode(code){
	let obj = document.getElementById('wordToCode');
	let word = code + "23456789";
	obj.value = '';

	if(word.length < 10)obj.value += 0;

	obj.value += parseInt(word);
	
	setTimeout(() => {
		onTen(obj.value);
	}, 100);
}



	