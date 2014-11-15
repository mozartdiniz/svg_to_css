fs = require('fs');

var path = process.argv[2] || './',
    cssBody = '',
    cssRule = '';

fs.readdir (path, function (err, files) {
    if (err) {
        return console.log(err);
    }
    files.forEach (function (file) {

        var fileContent = fs.readFileSync(path + '/' + file, 'utf8');

        cssRule += '.' + file.replace('.', '_') + ' {';
        cssRule += '\n';
        cssRule += "    background: url('data:image/svg+xml;base64," + new Buffer(fileContent).toString('base64') + "') no-repeat center center;";
        cssRule += '\n';
        cssRule += '}';
        cssRule += '\n';
        cssRule += '\n';

        cssBody += cssRule;

        cssRule = '';

    });

    console.log (cssRule);

    fs.writeFile('./havefun.css', cssBody, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The css file was saved!");
        }
    });
});