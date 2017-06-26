'use strict';

const fs = require('fs');
const plist = require('plist');

// Name of the font files you want to copy
const font2Copy = [ 'MaterialIcons.ttf', 'Roboto.ttf', 'Roboto_medium.ttf', 'clingme_font.ttf' ] 

// android copy fonts folder 
const androidFolder = './android/app/src/main/assets/fonts'

// ios just replace font content in Info.plist
const iosInfoFile = './ios/MerchantApp/Info.plist'

fs.readdir(androidFolder, (err, files) => {
  files.filter(file => font2Copy.indexOf(file) === -1).forEach(file=>{
    const path = `${androidFolder}/${file}`;
    console.log('Deleted: ' + path);  
    fs.unlinkSync(path);
  });
})


const plistObj = plist.parse(fs.readFileSync(iosInfoFile, 'utf8'));
// replace font
plistObj.UIAppFonts = font2Copy
const plistXMLContent = plist.build(plistObj)
fs.writeFileSync(iosInfoFile, plistXMLContent)


