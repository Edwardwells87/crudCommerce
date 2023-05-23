const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      attributes: ["id", "tag_name"],
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });
    res.json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  });


   // find all tags
  // be sure to include its associated Product data


router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'tag_name'
      ],
      include: [
        {
          model: Product,
          attributes: [
            'id',
            'product_name',
            'price',
            'stock',
            'category_id'
          ]
        }
      ]
    });
    res.json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  }) .then((newTag) => {
    console.log('New tag Created:', newTag);
  })
  .catch((error) => {
    console.error('Error creating tag:', error);
  });
});

router.put('/:id', (req, res) => {
  
});

router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      tag_name: req.params.tag_name,
    },
  })
  .then((deletedTag) => {
    res.json(deletedTag)
  })
  .catch((err)=> res.json(err));
});

module.exports = router;
