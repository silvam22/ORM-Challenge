const router = require('express').Router();
const { Category, Product } = require('../../models');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to get categories.' });
  }
});

// Get a category by id
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['category_id']
      }
    });

    if (!category) {
      res.status(404).json({ error: 'Category not found.' });
      return;
    }

    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to get category.' });
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
    });

    res.json(newCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to create category.' });
  }
});

// Update a category by id
router.put('/:id', async (req, res) => {
  try {
    const [rowsUpdated] = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    if (!rowsUpdated) {
      res.status(404).json({ error: 'Category not found.' });
      return;
    }

    res.json({ message: 'Category updated successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to update category.' });
  }
});

// Delete a category by id
router.delete('/:id', async (req, res) => {
  try {
    const rowsDeleted = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!rowsDeleted) {
      res.status(404).json({ error: 'Category not found.' });
      return;
    }

    res.json({ message: 'Category deleted successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Unable to delete category.' });
  }
});

module.exports = router;
