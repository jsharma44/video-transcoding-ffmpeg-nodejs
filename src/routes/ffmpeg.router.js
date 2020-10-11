import express from 'express';
import ffmpegController from '../controller/FfmpegController';
const router = express.Router();

const videoPath =
    'https://dramaking.sgp1.digitaloceanspaces.com/videos/d6babaea-a57f-4a66-82a0-4f837a3807ac/2b52d3b4-fdbe-4151-afc2-bb9a0d82df39video.mp4';
router.get('/hls', async (req, res) => {
    try {
        await ffmpegController.hls(videoPath);
        res.status(200).json({
            status: 'success',
            message: 'video transcoded to hls',
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message,
        });
    }
});

export default router;
