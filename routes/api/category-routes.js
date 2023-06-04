const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product }],
    });
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }


  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    console.log(req.params.id)
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'name'
      ],
        include: [{model: Product }],
      
    });
    res.json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      name: req.body
    });
    res.json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

  // create a new category
});

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body,{
      where: {id: req.params.id},
      returning: true,
    });
    if (!categoryData) {
      res.status(404).json({ message: 'Please try Again With a Valid Id' });
       return
    }
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  }


  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    console.log(req.params.id)
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: 'Please try Again With a Valid Id' });
       return
    }
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err); 
  }
  // delete a category by its `id` value
});

module.exports = router;
