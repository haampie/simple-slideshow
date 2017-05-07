const fs = require('fs');
const Handlebars = require('handlebars');
var katex = require('markdown-it-katex');
var hljs = require('highlight.js');
var twemoji = require('twemoji');
var emoji = require('markdown-it-emoji');
var md = require('markdown-it')({
  html:         true,        // Enable HTML tags in source
  xhtmlOut:     false,        // Use '/' to close single tags (<br />).
                              // This is only for full CommonMark compatibility.
  breaks:       false,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                              // useful for external highlighters.
  linkify:      true,        // Autoconvert URL-like text to links

  // Enable some language-neutral replacement + quotes beautification
  typographer:  true,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externaly.
  // If result starts with <pre... internal wrapper is skipped.
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    return '';
  }
});

md.use(emoji);
md.use(katex);

md.renderer.rules.emoji = function(token, idx) {
  return twemoji.parse(token[idx].content, {
    folder: 'svg',
    ext: '.svg'
  });
};

fs.readFile('template.html', 'utf8', (err, source) => {
  var template = Handlebars.compile(source, {noEscape: true});

  fs.readFile('presentation.md', 'utf8', (err, contents) => {

    var sections = contents.split("---").map(markdown => {
      return md.render(markdown);
    });

    var result = template({
      sections: sections
    });

    console.log(result);
  });
});
