const testCase = "аргентина манит негра ";

function isPalindrome(str){
	let newString = str.split('').filter(el => el !== ' ').join('');  // delete spaces as in first implementation 
	let j = newString.length - 1;
	for (let i = 0; i < Math.floor(newString/2); i++){  // but do comparisons in 2 times less
		if (newString[i] !== newString[j]){
			return false;
		}
		j--;
	}
	return true;
}

console.log(isPalindrome(testCase));

