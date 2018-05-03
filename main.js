function ansi(code) {
  return `\x1b[${code}m`;
}

function range(start, end) {
  const array = [];
  for (let i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
}

function longChart() {
  const nothing = "";
  const text = "  gYw  ";
  const reset = ansi(0);
  const bold = ansi(1);
  const reverse = ansi(7);
  const fgColors = range(30, 37).map(ansi);
  const bgColors = range(40, 47).map(ansi);
  const foregrounds = [nothing, ...fgColors];
  const backgrounds = [nothing, reverse, ...bgColors];
  const fonts = [nothing, bold];
  let out = "";
  for (const fg of foregrounds) {
    for (const font of fonts) {
      for (const bg of backgrounds) {
        out += reset + font + fg + bg + text + reset + " ";
      }
      out += "\n";
    }
  }
  return out;
}

function shortChart() {
  const nothing = "";
  const text = "    ";
  const reset = ansi(0);
  const bold = ansi(1);
  const reverse = ansi(7);
  const bgColors = range(40, 47).map(ansi);
  const backgrounds = [reverse].concat(bgColors);
  const fonts = [nothing, bold];
  let out = "";
  for (const font of fonts) {
    for (const bg of backgrounds) {
      out += reset + font + bg + text + reset + " ";
    }
    out += "\n";
  }
  return out;
}

function version() {
  return require("./package.json").version;
}

function help() {
  return `\
show-colors (version ${version()})

usage: show-colors [--help] [--short]

  -h, --help      show this help
  -v, --version   show the version
  -s, --short     show a shorter color palette without text
`;
}

function wordMatch(arg, words) {
  return words.split(" ").indexOf(arg) >= 0;
}

function main() {
  const arg = process.argv[2] || "";
  if (wordMatch(arg, "-help --help -h -?")) {
    console.error(help());
  } else if (wordMatch(arg, "-version --version -v")) {
    console.log(version());
  } else if (wordMatch(arg, "-short --short -s")) {
    console.log(shortChart());
  } else {
    console.log(longChart());
  }
}

exports.main = main;
