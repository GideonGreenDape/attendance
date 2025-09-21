const TrackRouter = require('express').Router();
const { getAllTracks, getStudentsInTrack } = require('../mongodb/track');
require('dotenv').config();


TrackRouter.get('/', async (req, res) => {
  try {
    const tracks = await getAllTracks();
    res.status(200).json({
      success: true,
      tracks
    });
  } catch (error) {
    console.error('Fetch tracks error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch tracks' });
  }
});


TrackRouter.get('/:trackName', async (req, res) => {
  const { trackName } = req.params;

  try {
    const students = await getStudentsInTrack(trackName);
    res.status(200).json({
      success: true,
      track: trackName,
      students
    });
  } catch (error) {
    console.error('Fetch students in track error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch students for this track' });
  }
});

module.exports = TrackRouter;
