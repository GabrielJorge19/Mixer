class Cr {
	decode(word){
		word = word.toString();
		let mixerCodeSize = 2;
		let passwordSize = 4;
		let instructionsSize = 4;
		let uncodedWords = [];
	
		let unMixed = {
			password: null,
			instructions: null,
			mixerCode: word.slice(0,mixerCodeSize),
		}

		word = word.slice(mixerCodeSize, word.length);

		switch(unMixed.mixerCode[0]){
			case '0':
				uncodedWords = decodeTogetherLetters(word, parseInt(unMixed.mixerCode[1]), passwordSize, instructionsSize);
			break;
			case '1':
				uncodedWords = decodeAlternatelyOneLetters(word, parseInt(unMixed.mixerCode[1]), passwordSize, instructionsSize);				
			break;
			case '2':
				uncodedWords = decodeAlternatelyTowLetters(word, parseInt(unMixed.mixerCode[1]), passwordSize, instructionsSize);				
			break;
			default:
				console.log(unMixed.mixerCode);
		}

		unMixed.password = uncodedWords[0];
		unMixed.instructions = uncodedWords[1];

		function reverse(string){

    	return string.split("").reverse().join("");
		}
		function changeDirections(firstWord, secondWord, caso){
			switch(caso){
				case 1:
					return [firstWord, secondWord];
				break;
				case 2:
					return [reverse(firstWord), reverse(secondWord)];
				break;
				case 3:
					//return [firstWord, reverse(secondWord)];
					return [reverse(firstWord), secondWord];
				break;
				case 4:
					//return [reverse(firstWord), secondWord];
					return [firstWord, reverse(secondWord)];
				break;
			}
		}
		function decodeTogetherLetters(word, caso, firstWordSize, secondWordSeize){
			if((caso < 1) || (caso > 8)) return [];

			let firstWord = '';
			let secondWord = '';
			let invertSequence = (caso > 4)?true:false;
			caso = (caso == 7)?4:caso;
			caso = (caso == 8)?3:caso;
			caso = (caso > 4)?caso-4:caso;

			[firstWord, secondWord] = changeDirections(word.slice(0, firstWordSize), word.slice(firstWordSize, firstWordSize + secondWordSeize), caso);

			if(invertSequence){
				let temp = firstWord;
				firstWord = secondWord;
				secondWord = temp;
			}
			
			return [firstWord, secondWord];
		}
		function decodeAlternatelyOneLetters(word, caso, firstWordSize, secondWordSeize){
			if((caso < 1) || (caso > 8)) return [];

			let firstWord = '';
			let secondWord = '';
			let invertSequence = (caso > 4)?true:false;
			caso = (caso == 7)?4:caso;
			caso = (caso == 8)?3:caso;
			caso = (caso > 4)?caso-4:caso;

			firstWord += word.slice(0,1);
			firstWord += word.slice(2,3);
			firstWord += word.slice(4,5);
			firstWord += word.slice(6,7);

			secondWord += word.slice(1,2);
			secondWord += word.slice(3,4);
			secondWord += word.slice(5,6);
			secondWord += word.slice(7,8);

			[firstWord, secondWord] = changeDirections(firstWord, secondWord, caso);

			if(invertSequence){
				let temp = firstWord;
				firstWord = secondWord;
				secondWord = temp;
			}

			return [firstWord, secondWord];
		}
		function decodeAlternatelyTowLetters(word, caso, firstWordSize, secondWordSeize){
			if((caso < 1) || (caso > 8)) return [];

			let firstWord = '';
			let secondWord = '';
			let invertSequence = (caso > 4)?true:false;
			caso = (caso > 4)?caso-4:caso;

			firstWord += word.slice(0,2);
			firstWord += word.slice(4,6);

			secondWord += word.slice(2,4);
			secondWord += word.slice(6,8);

			[firstWord, secondWord] = changeDirections(firstWord, secondWord, caso);

			if(invertSequence){
				let temp = firstWord;
				firstWord = secondWord;
				secondWord = temp;
			}

			return [firstWord, secondWord];
		}

		return unMixed;
	}
	encode(code, password, instructions){
		let mixedWord = '';

		switch(code[0]){
			case '0':
				mixedWord = '0' + codeTogetherLetters(code[1], password, instructions);
			break;
			case '1':
				mixedWord = '1' + codeAlternatelyOneLetters(code[1], password, instructions);
			break;
			default:
				console.log('Codificação inexistente ', code[0]);
			break;
		}

		return mixedWord;


		function codeTogetherLetters(code, password, instructions){
			let invertSequence = (code > 4)?true:false;
			let changedCode = (code > 4)?code - 4:code;
			let words = changeDirections(password, instructions, `${changedCode}`);

			// console.log(code, changedCode, words);

			if(invertSequence){
				let temp = words[0];
				words[0] = words[1];
				words[1] = temp;
			}

			return code + words[0] + words[1];
		}
		function codeAlternatelyOneLetters(code, password, instructions){
			let invertSequence = (code > 4)?true:false;
			let changedCode = (code > 4)?code - 4:code;
			let coded = '';

			let words = changeDirections(password, instructions, `${changedCode}`);

			if(invertSequence){
				let temp = words[0];
				words[0] = words[1];
				words[1] = temp;
			}

			for(let i = 0;i < password.length;i++){
				coded += words[0][i] + words[1][i];
			}

			return code + coded;
		}
















		function reverse(string){

    	return string.split("").reverse().join("");
		}
		function changeDirections(firstWord, secondWord, caso){
			switch(caso){
				case '1':
					return [firstWord, secondWord];
				break;
				case '2':
					return [reverse(firstWord), reverse(secondWord)];
				break;
				case '3':
					return [reverse(firstWord), secondWord];
				break;
				case '4':
					return [firstWord, reverse(secondWord)];
				break;
			}
		}
	}
}