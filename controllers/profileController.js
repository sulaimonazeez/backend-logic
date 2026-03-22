export const myProfile = (req, res) => {
  try {
    const { id, email, fullname, phone, country, role } = req.user;

    res.set("Cache-Control", "no-store");
    res.json({ id, email, fullname, phone, country, role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
