const db = require("../models");

const School = db.school

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => (degree * Math.PI) / 180;

    const R = 6371; 
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
};


const addSchool = async (req, res) => {
    
    const school = await School.create(req.body)
    res.status(200).send(school)
}

const getSchools = async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).send({ message: "Latitude and longitude are required" });
    }

    try {
        const schools = await School.findAll();

        const schoolsWithDistance = schools.map((school) => {
            const distance = calculateDistance(
                parseFloat(latitude),
                parseFloat(longitude),
                school.latitude,
                school.longitude
            );
            return { ...school.dataValues, distance };
        });

        // Sort schools by distance
        const sortedSchools = schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.status(200).send(sortedSchools);
    } catch (error) {
        res.status(500).send({ message: "Error fetching schools", error });
    }
};



module.exports ={
    addSchool,
    getSchools
}