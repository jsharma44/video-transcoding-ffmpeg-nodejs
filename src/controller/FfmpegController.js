import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import path from 'path';
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

class FfmpegController {
    outputPath;
    constructor() {
        this.outputPath = path.join(__dirname + '../../../videos');
    }

    getFilename = () => {
        return this.outputPath + '/output.m3u8';
    };
    hls = videoPath => {
        return new Promise((resolve, reject) => {
            ffmpeg(videoPath, { timeout: 432000 })
                .addOptions([
                    '-profile:v baseline',
                    '-level 3.0',
                    '-start_number 0',
                    '-hls_time 10',
                    '-hls_list_size 0',
                    '-f hls',
                ])
                .output(this.getFilename())
                .on('end', () => {
                    console.log(`Video transcoded`);
                    return resolve();
                })
                .on('err', error => {
                    console.log(error);
                    return reject(error);
                })
                .run();
        });
    };
}

export default new FfmpegController();
