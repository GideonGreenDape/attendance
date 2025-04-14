function generateStudentId() {
    // Prefix for all student IDs
    const prefix = "MVC-";
    
    // Generate a random 6-digit number
    const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    
    // Get current timestamp to ensure uniqueness
    const timestamp = Date.now().toString(36).slice(-4);
    
    // Combine all parts
    const studentId = `${prefix}${randomNum}-${timestamp}`;
    
    return studentId;
}

module.exports = generateStudentId;