function googleTranslate(text, fromCode, toCode) {
  if (fromCode === toCode) {
    return new $.Deferred().resolve( {translation:text, transliteration:''} )
  }

  //https://web.archive.org/web/20140408043100/http://www.yqlblog.net/blog/2010/03/12/avoiding-rate-limits-and-getting-banned-in-yql-and-pipes-caching-is-your-friend/
  var yqlEndpoint = 'https://query.yahooapis.com/v1/public/yql?'
  var query = yqlEndpoint + 
    'q=select * from google.translate where ' +
    'q="' + text + '" ' +
    'and target="' + toCode + '" ' +
    'and source="' + fromCode + '";' +
    '&format=json' +
    '&env=store://datatables.org/alltableswithkeys' +
    '&_maxage=' + 60*60*24*7 //cache for a week

  function filter(data, dataType) {
    var obj = $.parseJSON(data)
    try {
      var result = obj.query.results.json.sentences;
      return {translation:result.trans, transliteration:result.translit};
    } catch (e) {
      return {translation:undefined, transliteration:undefined};
    }
  }

  return $.ajax({
    url: query,
    dataFilter: filter,
    dataType: 'text', //we already parse to JSON in the datafilter
  });
}