import Product from '../models/productModel.js';

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const image = req.file ? req.file.path : null; // Get the image path from multer

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            image
        });

        const savedProduct = await newProduct.save();

        return res.status(201).json({
            message: "Product created successfully",
            status: "Success",
            error: false,
            product: savedProduct
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Failure",
            error: true
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        // Extract query parameters for filtering, sorting, and pagination
        const { category, minPrice, maxPrice, available, sortBy, order, page, limit } = req.query;

        // Create a filter object based on query parameters
        const filter = {};
        if (category) filter.category = category;
        if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
        if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
        if (available === 'true') filter.stock = { $gt: 0 }; // Filters for products in stock

        // Handle sorting (default is sorting by 'createdAt' in descending order)
        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === 'asc' ? 1 : -1;
        } else {
            sortOptions.createdAt = -1; // Default sorting by newest
        }

        // Handle pagination
        const pageNumber = Number(page) || 1; // Default page is 1
        const pageSize = Number(limit) || 10; // Default limit is 10
        const skip = (pageNumber - 1) * pageSize;

        // Fetch products with filtering, sorting, and pagination
        const products = await Product.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(pageSize);

        // Get the total count of products that match the filter criteria
        const totalProducts = await Product.countDocuments(filter);

        res.status(200).json({
            message: "Products retrieved successfully",
            status: "Success",
            error: false,
            data: products,
            totalProducts,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalProducts / pageSize)
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Failure",
            error: true
        });
    }
};
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                status: "Failure",
                error: true
            });
        }

        res.status(200).json({
            message: "Product retrieved successfully",
            status: "Success",
            error: false,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Failure",
            error: true
        });
    }
};

export const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, stock } = req.body;

        // Find the product by its ID
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                status: "Failure",
                error: true
            });
        }

        // Update the product details
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        product.stock = stock || product.stock;

        // Handle file upload if a new image is provided
        if (req.file) {
            product.image = `/${req.file.path}`; // Path where image is stored
        }

        // Save the updated product
        const updatedProduct = await product.save();

        res.status(200).json({
            message: "Product updated successfully",
            status: "Success",
            error: false,
            data: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Failure",
            error: true
        });
    }
};


export const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete({ "_id":id });

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                status: "Failure",
                error: true
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            status: "Success",
            error: false
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Failure",
            error: true
        });
    }
};
