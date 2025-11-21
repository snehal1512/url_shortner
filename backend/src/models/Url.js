import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
    {
        shortCode: { type: String, required: true, unique: true },
        longUrl: { type: String, required: true },
        clicks: { type: Number, default: 0 },
        ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
        expiresAt: { type: Date, default: null },
        passwordHash: { type: String, default: null }
    },
    {timestamps: true}
);

const Url = mongoose.model("Url", urlSchema);
export default Url;