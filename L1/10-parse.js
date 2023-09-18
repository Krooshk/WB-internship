function customParse(jsonString) {
    let index = 0;

    function parseValue() {
        const char = jsonString[index];
        if (char === '"') {
            return parseString();
        } else if (char === '{') {
            return parseObject();
        } else if (char === '[') {
            return parseArray();
        } else if (char === 't') {
            return parseTrue();
        } else if (char === 'f') {
            return parseFalse();
        } else if (char === 'n') {
            return parseNull();
        } else {
            return parseNumber();
        }
    }

    function parseString() {
        let result = '';
        index++; // Пропускаем открывающую кавычку
        while (jsonString[index] !== '"') {
            result += jsonString[index];
            index++;
        }
        index++; // Пропускаем закрывающую кавычку
        return result;
    }

    function parseObject() {
        const result = {};
        index++; // Пропускаем открывающую фигурную скобку
        while (jsonString[index] !== '}') {
            const key = parseString();
            index++; // Пропускаем двоеточие
            const value = parseValue();
            result[key] = value;
            if (jsonString[index] === ',') {
                index++;
            }
        }
        index++; // Пропускаем закрывающую фигурную скобку
        return result;
    }

    function parseArray() {
        const result = [];
        index++; // Пропускаем открывающую квадратную скобку
        while (jsonString[index] !== ']') {
            const value = parseValue();
            result.push(value);
            if (jsonString[index] === ',') {
                index++;
            }
        }
        index++; // Пропускаем закрывающую квадратную скобку
        return result;
    }

    function parseTrue() {
        index += 4; // Пропускаем "true"
        return true;
    }

    function parseFalse() {
        index += 5; // Пропускаем "false"
        return false;
    }

    function parseNull() {
        index += 4; // Пропускаем "null"
        return null;
    }

    function parseNumber() {
        let start = index;
        while (
            jsonString[index] !== ',' &&
            jsonString[index] !== ']' &&
            jsonString[index] !== '}' &&
            jsonString[index] !== ' ' &&
            jsonString[index] !== '\n' &&
            jsonString[index] !== '\r' &&
            jsonString[index] !== '\t'
        ) {
            index++;
        }
        const numberStr = jsonString.slice(start, index);
        return parseFloat(numberStr);
    }

    return parseValue();
}

// Пример использования:
const data = {
    name: 'Johny',
    age: 30,
    city: {
		name: 'Moscow',
		age: 870,
		country: {
			name: 'Russia',
			age: 2500,
			planet: 'Earth'
		}
	}
};

console.log(JSON.stringify(data));
console.log(customParse(JSON.stringify(data)));
