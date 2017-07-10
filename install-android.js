'use strict';

const
    spawn = require( 'child_process' ).spawn,
    ls = spawn( 'adb', [ 'install', '-r',  'android/app/build/outputs/apk/app-release.apk'] );

ls.stdout.on( 'data', data => {
    console.log( `stdout: ${data}` );
});

ls.stderr.on( 'data', data => {
    console.log( `stderr: ${data}` );
});

ls.on( 'close', code => {
    console.log( `child process exited with code ${code}` );
});