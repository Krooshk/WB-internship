
const testCase = "аргентина манит негра ";

function isPalindrome(str){
	let newString = str.split('').filter(el => el !== ' ').join('');  // delete spaces 
	return newString === newString.split('').reverse().join(''); // reverse string and compare with the original string
}

console.log(isPalindrome(testCase));

