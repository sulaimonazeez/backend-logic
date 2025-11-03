export const myProfile = (req, res) => {
  try {
    res.set("Cache-Control", "no-store"); 
    res.json({
      id: req.user.id,
      email: req.user.email,
      firstname: req.user.fullname,
      lastname: req.user.fullname,
      phone: req.user.phone,
      country: req.user.country
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};