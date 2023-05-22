const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  try{
  const productData = await Product.findAll({
    include: { 
      product_name, 
      price,
      stock,
      category_id,
    }
  });

 
  return res.json(productData);
} catch (error) {
  console.error('Error retrieving products:', error);
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
  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
  }) .then((newProduct) => {
    console.log('New product created:', newProduct);
  })
  .catch((error) => {
    console.error('Error creating product:', error);
  });
});

router.put('/:id', (req, res) => {
  
});

router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      product_id: req.params.product_id,
    },
  })
  .then((deletedProduct) => {
    res.json(deletedProduct)
  })
  .catch((err)=> res.json(err));
});

module.exports = router;
