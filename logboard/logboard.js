class Logboard {
	#table = document.createElement('table');

	constructor(parent, headers, title) {
		parent.classList.add("logboard")

		if (title) {
			const titleElem = document.createElement('b');
			titleElem.classList.add('logboard-title');
			titleElem.innerText = title;
			parent.appendChild(titleElem);
		}

		parent.appendChild(this.#table);

		const headerRow = document.createElement('tr');
		for (let header of headers) {
			const headerCell = document.createElement('th');
			headerCell.classList.add('logboard-header');
			headerCell.innerText = header;
			headerRow.appendChild(headerCell);
		}
		this.#table.appendChild(headerRow);
	}

	log(values) {
		const row = document.createElement('tr');
		for (let value of values) {
			const cell = document.createElement('td');
			cell.classList.add('logboard-value');
			cell.innerText = value;
			row.appendChild(cell);
		}
		this.#table.appendChild(row);
	}
}
