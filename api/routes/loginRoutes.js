const express = require('express');
const cors = require('cors');
const router = express.Router();

//cors middleware to resolve cors issues
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)

router.get('/', (req, res) => {
    res.json('working!!!')
})

module.exports = router;
