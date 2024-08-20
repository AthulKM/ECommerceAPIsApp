import Product from '../models/productModel.js';

export const createProduct = async (req, res, next) => {
    
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
    
};

export const getAllProducts = async (req, res, next) => {
    
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
    
};
export const getProductById = async (req, res, next) => {
    
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return next(ErrorResponse("Product not found", 404));
        }

        res.status(200).json({
            message: "Product retrieved successfully",
            status: "Success",
            error: false,
            data: product
        });
   
};



export const updateProductById = async (req, res, next) => {
    
        const { id } = req.params;
        const { name, description, price, category, stock } = req.body;

        // Prepare the update object with the fields that are provided in the request
        const update = {};
        if (name) update.name = name;
        if (description) update.description = description;
        if (price) update.price = price;
        if (category) update.category = category;
        if (stock) update.stock = stock;

        // Handle file upload if a new image is provided
        if (req.file) {
            update.image = `/${req.file.path}`;
        }

        // Find the product by ID and update it with the new values
        const updatedProduct = await Product.findByIdAndUpdate(id, update, {
            new: true,          // Return the updated document
            runValidators: true // Validate the updated fields against the schema
        });

        if (!updatedProduct) {
            return next(ErrorResponse("Product not found", 404));
        }

        res.status(200).json({
            message: "Product updated successfully",
            status: "Success",
            error: false,
            data: updatedProduct
        });
    
};




export const deleteProductById = async (req, res, next) => {
    
        const { id } = req.params;

        const product = await Product.findByIdAndDelete({ "_id":id });

        if (!product) {
            return next(ErrorResponse("Product not found", 404));
        }

        res.status(200).json({
            message: "Product deleted successfully",
            status: "Success",
            error: false
        });
    
};
