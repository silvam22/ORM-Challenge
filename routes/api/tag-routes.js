const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
try {
  const tags = await Tag.findAll({
    include: [{model: Product, through: ProductTag}],
  });
  res.status(200).json(tags);
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product }]
    });
    if (!tagData) {
      res.status(400).json({message: 'could not find a tag with this id'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(tag => {
    res.status(200).json(tag);
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err);
  });
});

router.put('/:id', async (req, res) => {
  try {
    const newTag = await Tag.update(
      {tag_name: req.body.tag_name },
      {returning: true, where: {id: req.params.id }}
    );
    res.json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    .then((destroyTag) => {
      res.json(destroyTag)
    })
  .catch((err)  => {
    console.log(err)
    res.status(500).json(err);
  })
});

module.exports = router;