function ansi(code) {
  return "\x1b[" + code + "m";
}

function range(start, end) {
  var array = [];
  for (var i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
}

function chart() {
  var nothing = "";
  var text = "  gYw  ";
  var reset = ansi(0);
  var bold = ansi(1);
  var reverse = ansi(7);
  var fgColors = range(30, 37).map(ansi);
  var bgColors = range(40, 47).map(ansi);
  var foregrounds = [nothing].concat(fgColors);
  var backgrounds = [nothing, reverse].concat(bgColors);
  var fonts = [nothing, bold];
  var out = "";
  foregrounds.forEach(function(fg) {
    fonts.forEach(function(font) {
      backgrounds.forEach(function(bg) {
        out += reset + font + fg + bg + text + reset + " ";
      });
      out += "\n";
    });
  });
  return out;
}

function version() {
  return require("./package.json").version;
}

function help() {
  return "Just run the command! Or use '--version' I guess!";
}

function wordMatch(arg, words) {
  return words.split(" ").indexOf(arg) >= 0;
}

function main() {
  var arg = process.argv[2] || "";
  if (wordMatch(arg, "-help --help -h -?")) {
    process.stderr.write(help() + "\n");
  } else if (wordMatch(arg, "-version --version -v")) {
    console.log(version());
  } else {
    console.log(chart());
  }
}

exports.main = main;
