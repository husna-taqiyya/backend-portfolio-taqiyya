import Joi from 'joi';

const isBlogTitle = Joi.string().trim().min(3).max(255).required().label("Blog Title")

const isBlog = Joi.object({
    title: isBlogTitle,
    content: Joi.string().trim().min(3).required().label("Blog Content"),
    photos: Joi.array().items(Joi.number()) // kumpulan id [1, 2, 3]
});

export {
    isBlog,
    isBlogTitle
}