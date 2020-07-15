// const fs = require('fs');
const {exec} = require("child_process");
const user_settings = require("../inputs/user-settings.js");
const user_cred = require("../inputs/yt-credentials");
require('colors');

const misc_opt = "--socket-timeout 300 --retries 30"

if(user_settings.urls < 1) {
    return console.log("Please include at least one link to watch.".red);
} else {
    for(let i = 0; i < user_settings.urls.length; i++) {
        console.log(`Downloading link ${i + 1} of ${user_settings.urls.length}`.green)
        ytdl(user_settings.urls[i].link, user_settings.out_plname, user_settings.audio_only, user_settings.descriptions, true,  misc_opt)
    }
}

function ytdl(link, out_plname, audio_only, dl_descriptions, credentials, misc) {
    const base_dir = (out_plname ? "%(playlist_title)s" : user_settings.urls[i].name);
    const out_dir = `-o './outputs/${base_dir}/%(title)s-%(id)s.%(ext)s'`
    const track = `--download-archive './${base_dir}/archive.txt'`
    const desc = (dl_descriptions ? "--youtube-skip-dash-manifest --write-description" : "");
    
    let cred = "";
    if(credentials) {
        cred = `--username ${user_cred.username} --password ${user_cred.password}`
    }

    const type = (audio_only ? "--extract-audio --audio-format mp3" : "-f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio' --merge-output-format mp4");
    let list;
    if(/playlist/.test(link)) {
        list = "--yes-playlist";
        console.log(`Link ${link} is a playlist. Will download all videos`.yellow);
    } else if(!/playlist/.test(link)) {
        list = "";
        console.log(`Link ${link} is a playlist. Will download the video`.yellow);
    };

    const cmd = `--verbose --ignore-errors ${link} ${list} ${out_dir} ${track} ${type} ${desc} ${cred} ${misc}`

    console.log(`Running the command: ${cmd}`.blue)

    exec(`youtube-dl ${cmd}`, (err, stdout, stderr) => {
        if (err) {
            //some err occurred
            console.error(err.red)
        } else {
            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout.green}`);
            console.log(`stderr: ${stderr.green}`);
        };
    });
}

console.log("Programme done running".green);
