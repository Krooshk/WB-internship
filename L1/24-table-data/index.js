let data;

let promise = fetch("http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true");
promise.then(value => value.json())
	.then(value => {
		data = value;
		console.log(data[0]);
		fill();
	})


let table = document.querySelector('table');

function fill() {

	for (let i = 0; i < 50; i++) {
		let row = document.createElement('tr');
		row.innerHTML = `<th>${i + 1}</th>`
		for (let key in data[i]) {
			let field = document.createElement('th');
			field.textContent = data[i][key];
			row.append(field);
		}
		table.append(row);
	}
}
