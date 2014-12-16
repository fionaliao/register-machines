var decode = function(toDecode) {
	toDecode = toDecode.replace(/\s+/g, '');
	if (toDecode == "") {
		return "";
	}
	var mulArray = toDecode.split("*");
	var currentNumber = 0;
	for (var i = 0; i < mulArray.length; i++) {
		var powArray = mulArray[i].split("^");
		var currentPowNumber = powArray[0];
		for(var j = 1; j < powArray.length; j++) {
			currentPowNumber = Math.pow(currentPowNumber, powArray[j]);
		}
		currentNumber = ((i == 0) ? 1 : currentNumber) * currentPowNumber;
	}
	return decodeList(currentNumber, 0);
};
	
var decodeList = function(list, index) {
	var head = 0;
	while (list != 0 && list % 2 == 0) {
		head++;
		list = list / 2;
	}
	if (list == 0) {
		return "";
	}
	nextIndex = index + 1;
	return decodeInstruction(head, index) + decodeList((list - 1)/2, nextIndex);
};

var decodeInstruction = function(instruction, index) {
	if (instruction == 0) {
		return "<br/>" + writeHaltInstr(index); 
	}
	var x = 0;
	while (instruction != 0 && instruction % 2 == 0) {
		x++;
		instruction = instruction / 2;
	}
	if (instruction == 0) {
		alert("something's not right with your input...");
		return "";
	}
	instruction = ((instruction-1)/2);
	if (x % 2 == 0) { //increment instruction
		return "<br/>" + writeIncInstr(index, (x/2), instruction);
	} else { //decrement instruction
		instruction++;
		var j = 0;
		var k = 0;
		j = calculateGreatestPowerOfTwo(instruction);
		k = ((instruction / Math.pow(2, j)) - 1) / 2;
		return "<br/>" + writeDecInstr(index, ((x-1)/2), j, k);
	}
	return instruction + "; ";
};

var calculateGreatestPowerOfTwo = function(n) {
	var powerOfTwo = 0;
	while (n != 0 && n % 2 == 0) {
		powerOfTwo++;
		n = n / 2;
	}
	return powerOfTwo;
};

var writeIncInstr = function(instrNo, regNo, nextInstrNo) {
    return "L<sub>" + instrNo + "</sub>: R<sub>" + regNo + "</sub><sup>+</sup> &#8594; L<sub>" + nextInstrNo + "</sub>;";
};

var writeDecInstr = function(instrNo, regNo, trueNextInstrNo, falseNextInstrNo) {
    return "L<sub>" + instrNo + "</sub>: R<sub>" + regNo + "</sub><sup>-</sup> &#8594; L<sub>" + trueNextInstrNo + "</sub>,L<sub>" + falseNextInstrNo + "</sub>;";
};

var writeHaltInstr = function(instrNo) {
	return "L<sub>" + instrNo + "</sub>: HALT;";
};

