var PPair = function (x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
}

var SPair = function (x, y) {
    this.x = x;
    this.y = y;
}

var encode = function(toEncode) {
    var toEncodeArray = toEncode.split(";");
    var encodedPPairs = new Array(toEncodeArray.length);
    for (var i = 0; i < toEncodeArray.length; i++) {
        if (toEncodeArray[i].indexOf("+") > -1) {
            var fstString = toEncodeArray[i].split("+")[0];
            var fst = parseInt(fstString);
            var sndString = toEncodeArray[i].split(">")[1];
            var snd = parseInt(sndString);
            encodedPPairs[i] = new PPair(fst, snd, 0);
        } else if (toEncodeArray[i].indexOf("-") > -1) {
            var fstString = toEncodeArray[i].split("-")[0];
            var fst = parseInt(fstString);
            var sndString = toEncodeArray[i].split(">")[1];
            var sndFstString = sndString.split(",")[0];
            var sndFst = parseInt(sndFstString);
            var sndSndString = sndString.split(",")[1];
            var sndSnd = parseInt(sndSndString);
            var snd = new SPair(sndFst, sndSnd);
            encodedPPairs[i] = new PPair(fst, snd, 1);
        } else {
            encodedPPairs[i] = new PPair(undefined, undefined, 2);
        }
    }
};
