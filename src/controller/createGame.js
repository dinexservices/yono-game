import Game from "../model/game.model.js";
import slugify from "slugify";

const generateUniqueSlug = async (name) => {
  let baseSlug = slugify(name, { lower: true, strict: true });
  let slug = baseSlug;
  let count = 1;

  while (await Game.findOne({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
};

const createGame = async (req, res, next) => {
  try {
    const {
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
    } = req.body;

    // 🔹 Validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    // 🔹 Generate slug
    const finalSlug = slug
      ? slugify(slug, { lower: true, strict: true })
      : await generateUniqueSlug(name);

    // 🔹 Handle file upload
    let logoUrl = "";
    if (req.file) {
      logoUrl = req.file.path;
    }

    // 🔹 Normalize tags (Postman sends string sometimes)
    let parsedTags = tags;
    if (typeof tags === "string") {
      parsedTags = tags.split(",").map(t => t.trim());
    }

    // 🔹 Create object explicitly
    const gameData = {
      name,
      slug: finalSlug,
      icon,
      logoUrl,
      category,
      rating,
      size,
      signupBonus,
      minWithdraw,
      downloadUrl,
      description,
      longDescription,
      tags: parsedTags,
      isNewGame,
      isFree,
      relatedApps,
    };

    const game = await Game.create(gameData);

    res.status(201).json({
      success: true,
      data: game,
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Game with this slug already exists",
      });
    }

    next(err);
  }
};

export default createGame;