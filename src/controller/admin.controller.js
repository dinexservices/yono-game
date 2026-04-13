import Admin from "../model/admin.model.js";

export const signupAdmin = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // 🔹 Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // 🔹 Check existing admin
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists with this email",
      });
    }

    // 🔹 Create admin
    const admin = await Admin.create({
      name,
      email,
      password, // ⚠️ plain text
      role,
    });

    res.status(201).json({
      success: true,
      data: admin,
    });

  } catch (err) {
    next(err);
  }
};




export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 🔹 Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 🔹 Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 🔹 Plain password comparison
    if (admin.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 🔹 Success
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: admin,
    });

  } catch (err) {
    next(err);
  }
};

// List all admins
export const listAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find({}, { password: 0 }).lean();
    res.status(200).json({ success: true, data: admins });
  } catch (err) {
    next(err);
  }
};

// Delete admin by id
export const deleteAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }
    res.status(200).json({ success: true, message: "Admin deleted" });
  } catch (err) {
    next(err);
  }
};