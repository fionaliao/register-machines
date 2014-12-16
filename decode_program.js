var decode = function(toDecode){
		return decodeList(toDecode, 0);
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
	while (instruction % 2 == 0) {
		x++;
		instruction = instruction / 2;
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

