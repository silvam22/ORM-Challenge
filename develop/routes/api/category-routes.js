const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
try {
  const categoriesData = await Category.findAll({ include: [{ model: Product }] });
  res.status(200).json(categoriesData);
} catch (err){
  console.error(err);
  res.status(500).json(err);
}

});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      where: { id: req.params.id },
      include: [{ model: Product }]
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category to be found' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
  const improveCategory = await Category.updatedOne({_id: req.params.id }, req.body );
  res.status(200).json(improveCategory);
} catch (err) {
  console.error(err);
  res.status(500).json(err);
}
});

router.delete('/:id', async (req, res) => {
try {
  const goneCategory = await Category.deleteOne({_id: req.params.id });
  res.status(200).json(goneCategory);
} catch (err) {
  console.error(err);
  res.status(500).json(err);
}
});

module.exports = router;