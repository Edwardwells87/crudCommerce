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
          attributes: ["id", "product_name", "product_price", "product_stock", "category_id"],
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
        include: [
          {
            model: Product,
            attributes: [
              'id',
              'product_name',
              'product_price',
              'product_stock',
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
  });
  
  
 

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  }) .then((newTag) => {
    res.json({message: "New tag created", newTag})
  })
  .catch((error) => {
    console.error('Error creating tag:', error);
  });
});

router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    if (tagData[0] === 0) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json('Tag updated');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((deletedTag) => {
    res.json({ message: `Tag with ID ${req.params.id} successfully deleted.` });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
