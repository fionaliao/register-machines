var decode = function(toDecode){
		return decodeList(toDecode);
	};
	
var decodeList = function(list) {
	var head = 0;
	while (list != 0 && list % 2 == 0) {
		head++;
		list = list / 2;
	}
	if (list == 0) {
		return "";
	}
	return decodeInstruction(head) + decodeList((list - 1)/2);
};

var decodeInstruction = function(instruction) {
	//TODO
	return instruction + "; ";
};
