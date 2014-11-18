var getHashValue = function(key) {
    if (typeof key !== 'string') return null;
    key = key.toLowerCase();
    var hash = location.hash.toLowerCase();
    var match = hash.match(new RegExp(key + '=([^&]*)'));
    if (match) return match[1].replace(/\+/g, ' ');
    return null;
};

var updateHashValue = function(key, value) {
    var currentValue = getHashValue(key);
    var obj = {};
    obj[key] = value;
    var param = $.param(obj);
    var currentHash = location.hash;
    //the key is not present
    if ( currentValue === null ) {
        var newHash = '';
        //if no '#'' is present, add it
        if ( currentHash.indexOf('#') === -1) newHash = '#';
        location.hash += (newHash + param);
        return
    }
    //the key is already present
    obj[key] = currentValue;
    location.hash = currentHash.replace($.param(obj), param);
}