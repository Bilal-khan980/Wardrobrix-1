const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../Schemas/ProductSchema.js');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/products/');
    },
    filename: function (req, file, cb) {
        // Generate unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { id, name, price, latest, category, featured, sizes, colors, quantity } = req.body;

        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'Product image is required' });
        }

        const existingProduct = await Product.findOne({ id });

        if (existingProduct) {
            return res.status(400).json({ error: 'Product with this id already exists' });
        }

        // Create image URL path for the uploaded file
        const imageUrl = `/uploads/products/${req.file.filename}`;

        const newProduct = new Product({
            id,
            name,
            price,
            imageUrl,
            latest: latest === 'true',
            category,
            featured: featured === 'true',
            sizes: sizes ? sizes.split(',') : [],
            colors: colors ? colors.split(',') : [],
            quantity
        });

        await newProduct.save();
        console.log('Product saved to database');
        return res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (err) {
        console.error('Error saving product:', err);
        return res.status(500).json({ error: 'Failed to add product' });
    }
});

router.get('/latest', async (req, res) => {
    try {
        const latestProducts = await Product.find({ latest: true });
        res.status(200).json(latestProducts);
    } catch (err) {
        console.error('Error fetching latest products:', err);
        res.status(500).json({ error: 'Failed to fetch latest products' });
    }
});

router.get('/featured', async (req, res) => {
    try {
        const featuredProducts = await Product.find({ featured: true });
        res.status(200).json(featuredProducts);
    } catch (err) {
        console.error('Error fetching featured products:', err);
        res.status(500).json({ error: 'Failed to fetch featured products' });
    }
});

router.get('/mens', async (req, res) => {
    try {
        const mensProducts = await Product.find({ category: "Mens" });
        res.status(200).json(mensProducts);
    } catch (err) {
        console.error('Error fetching mens products:', err);
        res.status(500).json({ error: 'Failed to fetch mens products' });
    }
});

router.get('/womens', async (req, res) => {
    try {
        const womensProducts = await Product.find({ category: "Womens" });
        res.status(200).json(womensProducts);
    } catch (err) {
        console.error('Error fetching womens products:', err);
        res.status(500).json({ error: 'Failed to fetch womens products' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findOne({ id: productId });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (err) {
        console.error('Error fetching product by ID:', err);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

router.get('/all/x', async (req, res) => {
    try {
        const allProducts = await Product.find();

        res.status(200).json(allProducts);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

router.delete('/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findOneAndDelete({ id: productId });

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        console.log('Product deleted:', deletedProduct);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

router.get('/trending', async (req, res) => {
    try {
        // Logic to determine trending items, e.g., based on most viewed or added to cart
        const trendingItems = await Product.find({ /* criteria for trending items */ });

        res.status(200).json(trendingItems);
    } catch (err) {
        console.error('Error fetching trending items:', err);
        res.status(500).json({ error: 'Failed to fetch trending items' });
    }
});

router.get('/most-sold', async (req, res) => {
    try {
        const mostSoldItems = await Product.find().sort({ sold: -1 }).limit(10);

        res.status(200).json(mostSoldItems);
    } catch (err) {
        console.error('Error fetching most sold items:', err);
        res.status(500).json({ error: 'Failed to fetch most sold items' });
    }
});

module.exports = router;
