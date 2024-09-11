const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
  // be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const data = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

// find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const data = await Category.findByPk(req.params.id, {
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  };
});

// create a new category
router.post('/',  async (req, res) => {
 try {
  const data = await Category.create(req.body);
  res.status(200).json(data);
 } catch (err) {
  res.status(400).json(err);
 }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const data = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id
        }
      },
    )
    res.status(200).json(data)
  } catch (err) {
    res.status(400).json(err)
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const data = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(data)
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
