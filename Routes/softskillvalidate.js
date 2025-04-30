const validateSoftskills = require('express').Router();
const { findSoftskillToken } = require('../mongodb/generatesoftskill');

validateSoftskills.get('/:token', async (req, res) => {
    try {
        const { token } = req.params;
        
        if (!token) {
            return res.status(400).json({ 
                valid: false, 
                message: 'Token is required' 
            });
        }

        const tokenStatus = await findSoftskillToken(token);
        
        switch(tokenStatus) {
            case 'valid':
                return res.status(200).json({ 
                    valid: true, 
                    message: 'Token is valid' 
                });
            case 'expired':
                return res.status(400).json({ 
                    valid: false, 
                    message: 'This link has expired' 
                });
            case 'invalid':
                return res.status(400).json({ 
                    valid: false, 
                    message: 'Invalid link' 
                });
            default:
                return res.status(500).json({ 
                    valid: false, 
                    message: 'Token verification failed' 
                });
        }
    } catch (error) {
        console.error('Token validation error:', error);
        return res.status(500).json({ 
            valid: false, 
            message: 'Token verification failed' 
        });
    }
});

module.exports = validateSoftskills;