const fs = require('fs');
const Handlebars = require('handlebars');
const gulp = require('gulp');
const katex = require('markdown-it-katex');
const hljs = require('highlight.js');
const twemoji = require('twemoji');
const emoji = require('markdown-it-emoji');
const md_it = require('markdown-it');
const through2 = require('through2');
const rename = require('gulp-rename');

const md = md_it({
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

md.renderer.rules.emoji = (token, idx) => twemoji.parse(token[idx].content, {
  folder: 'svg',
  ext: '.svg'
});;

const dirs = {
  src: 'src',
  dest: 'build'
};

const paths = {
  src: `${dirs.src}/presentation.md`,
  template: `${dirs.src}/template.html`,
  dest: `${dirs.dest}/`
};

const source = fs.readFileSync(paths.template).toString();
const template = Handlebars.compile(source, {noEscape: true});

gulp.task('presentation', () => {
  return gulp.src(paths.src)
    .pipe(through2.obj(function(file, encoding, callback) {
      const slides = file.contents.toString().split("---").map(markdown => {
        return md.render(markdown);
      });

      file.contents = Buffer.from(template({
        sections: slides
      }));

      this.push(file);

      callback();
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('default', () => {
  gulp.watch(`${dirs.src}/**/*`, ['presentation']);
});