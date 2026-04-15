import { redirect } from "next/navigation";

export default function SignupPage() {
  redirect("/login");
}

export default function SignupPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error, signupSuccess, admin } = useAppSelector((s) => s.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (admin) router.replace("/dashboard");
  }, [admin, router]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (signupSuccess) {
      toast.success("Account created! Please log in.");
      dispatch(clearSignupSuccess());
      router.push("/login");
    }
  }, [signupSuccess, dispatch, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    dispatch(signupAdmin(form));
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: 60,
              height: 60,
              background: "linear-gradient(135deg, #a6e3a1, #89b4fa)",
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <Gamepad2 size={28} color="#11111b" />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--text-text)" }}>
            Create Admin Account
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-overlay)", marginTop: 6 }}>
            Register a new admin for Yono Games
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form-grid">
          <div>
            <label className="label">Full Name</label>
            <input
              id="signup-name"
              className="input"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="label">Email Address</label>
            <input
              id="signup-email"
              className="input"
              type="email"
              placeholder="admin@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="label">Password</label>
            <div style={{ position: "relative" }}>
              <input
                id="signup-password"
                className="input"
                type={showPass ? "text" : "password"}
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                style={{ paddingRight: 44 }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-overlay)",
                  display: "flex",
                }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="label">Role</label>
            <select
              id="signup-role"
              className="select"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          <button
            id="signup-submit"
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "13px",
              background: "linear-gradient(135deg, #a6e3a1, #89b4fa)",
            }}
          >
            {loading ? <span className="spinner" /> : <UserPlus size={16} />}
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: 24,
            fontSize: 14,
            color: "var(--text-overlay)",
          }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            style={{ color: "var(--accent-purple)", textDecoration: "none", fontWeight: 500 }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
