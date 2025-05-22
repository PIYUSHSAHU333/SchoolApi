const db = require("../db.js");

module.exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (? ,?, ?, ?)",
      [name, address, latitude, longitude]
    );

    res.status(201).json({
      message: "School added succesfully",
      schoolId: result.insertId,
    });
  } catch (e) {
    console.log("error inserting schools:", e);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports.listSchools = async (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);
  //Calculating the distance between the user’s location and each school using the Haversine formula.
  //This formula determines the shortest distance over the earth’s surface (in kilometers),
  //accounting for the spherical shape of the Earth based on latitude and longitude.
  try {
    const sql = `
        SELECT id, name, address, latitude, longitude,
        (6371 * acos(
          cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) +
          sin(radians(?)) * sin(radians(latitude))
        )) AS distance
        FROM schools 
        ORDER BY distance ASC 
    `;
    const [schools] = await db.execute(sql, [userLat, userLon, userLat]);
    const formattedSchools = schools.map((school) => ({
      ...school,
      distance: parseFloat(school.distance).toFixed(2) + "km",
    }));
    res.status(200).json(formattedSchools);
  } catch (e) {
    console.error("Error fetching schools", e);
    res.status(500).json({ error: "Internal server error" });
  }
};
