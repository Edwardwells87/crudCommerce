const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Tag, Product, ProductTag, Tag, Tag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
  const tagData = await Tag.findAll({
    include: [{ model: Tag}, { model: Product}],
    attributes: {
      include: [[
        sequelize.literal( //ask james to help with the literals because im not sure about 'associated data' 
        )
      ]

      ]
    }
  });

 
  return res.json(tagData);
} catch (error) {
  console.error('Error retrieving tag data:', error);
  return res.status(500).json({ error: 'Failed to retrieve products' });
}
});
   // find all tags
  // be sure to include its associated Product data


router.get('/:id', (req, res) => {
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
