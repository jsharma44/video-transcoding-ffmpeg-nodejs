import express from 'express';
import ffmpegRouter from './ffmpeg.router';
const router = express();
router.use('/ffmpeg', ffmpegRouter);
export default router;
