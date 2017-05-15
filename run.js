const fs = require('fs');
const Handlebars = require('handlebars');
var katex = require('markdown-it-katex');
var hljs = require('highlight.js');
var twemoji = require('twemoji');
var emoji = require('markdown-it-emoji');
var md = require('markdown-it')({
  html: true,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  linkify: true,
  typographer:  true,
  quotes: '“”‘’',
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
