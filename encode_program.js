var PPair = function (x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
}

function convertSPairToValue(x, y) {
    var fst = Math.pow(2, x);
    var snd = (2 * y) + 1;
    return (fst * snd) - 1;
}

function convertPPairToValue(pPair) {
    if (pPair.type == 0) {
        var fst = Math.pow(2, pPair.x);
        var snd = (2 * pPair.y) + 1;
        return fst * snd;
    }
    return 0;
}

function encodeIntoPPairs(toEncodeArray) {
    var result = new Array(toEncodeArray.length);
    for (var i = 0; i < toEncodeArray.length; i++) {
        if (toEncodeArray[i].indexOf("+") > -1) {
            var fstString = toEncodeArray[i].split("+")[0];
            //console.log(toEncodeArray[i].split("+"));
            var fst = parseInt(fstString);
            //console.log("PPair fst: " + fst);
            var sndString = toEncodeArray[i].split(">")[1];
            var snd = parseInt(sndString);
            result[i] = new PPair(2 * fst, snd, 0);
        } else if (toEncodeArray[i].indexOf("-") > -1) {
            var fstString = toEncodeArray[i].split("-")[0];
            //console.log(toEncodeArray[i].split("-"));
            var fst = parseInt(fstString);
            //console.log("PPair fst: " + fst);
            var sndString = toEncodeArray[i].split(">")[1];
            var sndFstString = sndString.split(",")[0];
            var sndFst = parseInt(sndFstString);
            //console.log("SPair fst: " + sndFst);
            var sndSndString = sndString.split(",")[1];
            var sndSnd = parseInt(sndSndString);
            //console.log("SPair snd: " + sndSnd);
            var snd = convertSPairToValue(sndFst, sndSnd);
            //console.log("SPair result: " + snd);
            result[i] = new PPair((2 * fst) + 1, snd, 0);
        } else {
            result[i] = new PPair(undefined, undefined, 1);
        }
    }
    return result;
}

function encodeIntoValues(encodedPPairs) {
    var result = new Array(encodedPPairs.length + 1);
    for (var i = 0; i < encodedPPairs.length; i++) {
        //console.log("PPair: <" + encodedPPairs[i].x + ", " + encodedPPairs[i].y + ">");
        result[i] = convertPPairToValue(encodedPPairs[i]);
    }
    result[encodedPPairs.length] = 0;
    return result;
}

function encodeIntoSingleValue(encodedValues) {
    for (var i = encodedValues.length - 2; i >= 0; i--) {
        var fst = Math.pow(2, encodedValues[i]);
        var snd = (2 * encodedValues[i + 1]) + 1;
        encodedValues[i] = fst * snd;
        console.log(fst * snd);
    }
    return encodedValues[0];
}

var encode = function(toEncode) {
    var toEncodeArray = toEncode.split(";");
    var encodedPPairs = encodeIntoPPairs(toEncodeArray);
    var encodedValues = encodeIntoValues(encodedPPairs);
    /*console.log("Encoded values:");
    for (var i = 0; i < encodedValues.length; i++) {
        console.log(encodedValues[i]);
    }*/
    return encodeIntoSingleValue(encodedValues);
};
