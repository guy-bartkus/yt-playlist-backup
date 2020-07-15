global.__basedir = __dirname;
const fs = require('fs');
const path = require('path');
require('colors');

if(!fs.existsSync('./ytapi-auth.json')) {
    fs.writeFileSync('./ytapi-auth.json', "");
    console.error("You need to add the contents of your YouTube API service account key json file to ytapi-auth.json.");
    return;
}

if(!fs.existsSync('./ytdl-auth.json')) {
    fs.writeFileSync('./ytdl-auth.json', JSON.stringify({username: "", password: ""}, null, 2));
    console.error("Warning: No credentials specified in ytdl-auth.json, will not be able to download age restricted videos.".yellow);
}

process.env.GOOGLE_APPLICATION_CREDENTIALS = "./ytapi-auth.json";