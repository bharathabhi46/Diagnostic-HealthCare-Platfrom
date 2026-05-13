import article from "../models/article.js";

export const addArticle = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const article = await Article.create({
      title,
      content,
      category,
    });

    res.status(201).json({
      message: "Article created",
      article,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* Public get articles */
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({ isPublished: true });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
