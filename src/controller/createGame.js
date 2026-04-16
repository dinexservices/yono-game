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
      faqs,
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

    // 🔹 Handle file upload (also accept logoUrl from body for seeding)
    let logoUrl = req.body.logoUrl || "";
    if (req.file) {
      logoUrl = req.file.path;
    }

    let parsedTags = tags;
    if (typeof tags === "string") {
      parsedTags = tags.split(",").map(t => t.trim());
    }

    // 🔹 Parse faqs
    let parsedFaqs = [];
    if (faqs) {
      if (typeof faqs === "string") {
        try {
          parsedFaqs = JSON.parse(faqs);
        } catch (e) {
          console.error("Error parsing faqs", e);
        }
      } else {
        parsedFaqs = faqs;
      }
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
      faqs: parsedFaqs,
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