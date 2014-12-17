var PPair = function (x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
}

function filterString(string) {
    var result = ""
    for (var i = 0; i < string.length; i++) {
        if ((string[i] >= '0' && string[i] <= '9') || string[i] == '>' ||
        string[i] == '+' || string[i] == '-' || string[i] == ';' ||
        string[i] == ',') {
            result += string[i];
        }
    }
    return result;
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
            var fst = parseInt(fstString);
            var sndString = toEncodeArray[i].split(">")[1];
            var snd = parseInt(sndString);
            result[i] = new PPair(2 * fst, snd, 0);
        } else if (toEncodeArray[i].indexOf("-") > -1) {
            var fstString = toEncodeArray[i].split("-")[0];
            var fst = parseInt(fstString);
            var sndString = toEncodeArray[i].split(">")[1];
            var sndFstString = sndString.split(",")[0];
            var sndFst = parseInt(sndFstString);
            var sndSndString = sndString.split(",")[1];
            var sndSnd = parseInt(sndSndString);
            var snd = convertSPairToValue(sndFst, sndSnd);
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
    }
    return encodedValues[0];
}

function checkSyntax(toEncodeArray) {
    for (var i = 0; i < toEncodeArray.length; i++) {
        //If empty, then valid
        if (toEncodeArray[i].length == 0) {
            return undefined;
        }
        //Check for number at beggining
        if (toEncodeArray[i][0] < '0' || toEncodeArray[i][0] > '9') {
            return i + ": Expecting number at beggining of code.";
        }
        var j = 1;
        //Check for end
        if (j == toEncodeArray[i].length - 1) {
            return i + ": Expecting \'+\' or \'-\' after number.";
        }
        while (toEncodeArray[i][j] >= '0' && toEncodeArray[i][j] <= '9') {
            //Check for end
            if (j == toEncodeArray[i].length - 1) {
                return i + ": Expecting \'+\' or \'-\' after number.";
            }
            j++;
        }
        //Check for + or - symbol
        if (!(toEncodeArray[i][j] == '+' || toEncodeArray[i][j] == '-')) {
            return i + ": Expecting \'+\' or \'-\' after number.";
        }
        //Check for end
        if (j == toEncodeArray[i].length - 1) {
            return i + ": Expecting \'>\' after \'" + toEncodeArray[i][j]
             + "\' symbol.";
        }
        j++;
        //Check for > symbol
        if (toEncodeArray[i][j] != '>') {
            return i + ": Expecting \'>\' after \'" + toEncodeArray[i][j - 1]
             + "\' symbol.";
        }
        //Check for end
        if (j == toEncodeArray[i].length - 1) {
            return i + ": Expecting number after \'>\' symbol.";
        }
        j++;
        //Check for number after > symbol
        if (toEncodeArray[i][j] < '0' || toEncodeArray[i][j] > '9') {
            return i + ": Expecting number after \'>\' symbol.";
        }
        //Check for end - valid at this stage
        if (j == toEncodeArray[i].length - 1) {
            return undefined;
        }
        j++;
        while (toEncodeArray[i][j] >= '0' && toEncodeArray[i][j] <= '9') {
            //Check for end - valid at this stage
            if (j == toEncodeArray[i].length - 1) {
                return undefined;
            }
            j++;
        }
        //Check for , symbol
        if (toEncodeArray[i][j] != ',') {
            return i + ": Expecting \',\' symbol after number.";
        }
        //Check for end
        if (j == toEncodeArray[i].length - 1) {
            return i + ": Expecting number after \',\' symbol.";
        }
        j++;
        //Check for number after , symbol
        if (toEncodeArray[i][j] < '0' || toEncodeArray[i][j] > '9') {
            return i + ": Expecting number after \',\' symbol.";
        }
        //Check for end - valid at this stage
        if (j == toEncodeArray[i].length - 1) {
            return undefined;
        }
        j++;
        while (toEncodeArray[i][j] >= '0' && toEncodeArray[i][j] <= '9') {
            //Check for end - valid at this stage
            if (j == toEncodeArray[i].length - 1) {
                return undefined;
            }
            j++;
        }
        if (j < toEncodeArray[i].length) {
            return i + ": No more code before next ; or end of code."
        }
    }
    return undefined;
}

function changeForm(x) {
    var y = x;
    var z = 0;
    while (y % 2 == 0) {
        y /= 2;
        z++;
    }
    var s = "" + z;
    return "2" + s.sup() + " \xD7 " + y;
}

var encode = function(toEncode, checked) {
    var toEncodeArray = filterString(toEncode).split(";");
    if (checkSyntax(toEncodeArray) != undefined) {
        return "Syntax Error at L" + checkSyntax(toEncodeArray);
    }
    var encodedPPairs = encodeIntoPPairs(toEncodeArray);
    var encodedValues = encodeIntoValues(encodedPPairs);
    var encodedSingleValue = encodeIntoSingleValue(encodedValues);
    if (checked) {
        return changeForm(encodedSingleValue);
    } else {
        return encodedSingleValue;
    }
};
