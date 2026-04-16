import Game from "../model/game.model.js";
import slugify from "slugify";

const generateUniqueSlug = async (name, excludeId) => {
    let baseSlug = slugify(name, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    while (await Game.findOne({ slug, _id: { $ne: excludeId } })) {
        slug = `${baseSlug}-${count}`;
        count++;
    }

    return slug;
};

const updateGame = async (req, res, next) => {
    try {
        const {
            id,
            name,
            slug,
            icon,
            category,
            rating,
            size,
            signupBonus,
            minWithdraw,
            downloadUrl,
            description,
            longDescription,
            tags,
            isNewGame,
            isFree,
            relatedApps,
            faqs,
        } = req.body;

        // 🔹 Find existing game
        const game = await Game.findById(id);
        if (!game) {
            return res.status(404).json({
                success: false,
                message: "Game not found",
                id
            });
        }

        // 🔹 Prepare update object (only provided fields)
        const updateData = {};

        if (name) updateData.name = name;
        if (icon) updateData.icon = icon;
        if (category) updateData.category = category;
        if (rating !== undefined) updateData.rating = rating;
        if (size) updateData.size = size;
        if (signupBonus !== undefined) updateData.signupBonus = signupBonus;
        if (minWithdraw !== undefined) updateData.minWithdraw = minWithdraw;
        if (downloadUrl) updateData.downloadUrl = downloadUrl;
        if (description) updateData.description = description;
        if (longDescription) updateData.longDescription = longDescription;
        if (isNewGame !== undefined) updateData.isNewGame = isNewGame;
        if (isFree !== undefined) updateData.isFree = isFree;
        if (relatedApps) updateData.relatedApps = relatedApps;

        // 🔹 Handle tags
        if (tags) {
            if (typeof tags === "string") {
                updateData.tags = tags.split(",").map(t => t.trim());
            } else {
                updateData.tags = tags;
            }
        }

        // 🔹 Handle faqs
        if (faqs) {
            if (typeof faqs === "string") {
                try {
                    updateData.faqs = JSON.parse(faqs);
                } catch (e) {
                    console.error("Error parsing faqs", e);
                }
            } else {
                updateData.faqs = faqs;
            }
        }

        // 🔹 Handle slug update
        if (slug) {
            updateData.slug = slugify(slug, { lower: true, strict: true });
        } else if (name) {
            updateData.slug = await generateUniqueSlug(name, id);
        }

        // 🔹 Handle logo update
        if (req.file) {
            updateData.logoUrl = req.file.path;
        }

        // 🔹 Update DB
        const updatedGame = await Game.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: updatedGame,
        });

    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Slug already exists",
            });
        }

        next(err);
    }
};

export default updateGame;