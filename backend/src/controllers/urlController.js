import Url from "../models/Url.js";
import { nanoid } from "nanoid";

export const createShortUrl = async(req, res) => {
    try{

        const { longUrl } = req.body;

        if(!longUrl) {
            return res.status(400).json({message: "Long Url is required"});
        }

        const shortCode = nanoid(6);

        const newUrl = await Url.create({
            longUrl,
            shortCode,
            ownerId: req.user || null
        });

        return res.status(201).json({
            message: "Short Url created successfully",
            shortCode: newUrl.shortCode,
            longUrl: newUrl.longUrl
        });

    } catch(error){
        console.error("Error creating short URL:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const redirectToUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    // increase click count
    urlDoc.clicks++;
    await urlDoc.save();

    return res.redirect(urlDoc.longUrl);

  } catch (error) {
    console.error("Redirect error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
