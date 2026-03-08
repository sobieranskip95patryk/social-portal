// models/User.js
const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    avatar: { type: String, default: "" },
    bio: { type: String, default: "" },
    gender: { type: String, enum: ["M", "F", "O"], default: "O" },
    lookingFor: { type: String, default: "" }, // np. "relacja", "flirt", "przyjaźń"
    age: { type: Number },
    city: { type: String, default: "" },
    interests: [String]
});
