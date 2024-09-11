const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
  // be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const data = await Tag.findAll({
      attributes: ['id', 'tag_name'],
      includes: [{ model: Product}]
    });
    res.status(200).json(data)
  } catch (err) {
    res.status(400).json(err);
  }
});

// find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const data = await Tag.findByPk(req.params.id, {
      attributes: ['id', 'tag_name'],
      include: [{ model: Product }]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const data = await Tag.create(req.body);
    res.status(200).json(data)
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const data = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json(data)
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const data = await Tag.destroy({
      where: {
        id:req.params.id,
      }
    });
    res.status(200).json(data)
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
