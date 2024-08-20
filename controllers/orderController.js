import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import ErrorResponse from '../utils/errorResponse.js';

export const createOrder = async (req, res, next) => {
    
        const { products, totalAmount, shippingAddress, paymentMethod } = req.body;

        // Validate product availability and update stock
        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                return next(ErrorResponse("Product not found", 404));
            }

            if (product.stock < item.quantity) {
                return next(ErrorResponse(`Not enough stock for product: ${product.name}`, 404));
            }

            // Deduct the quantity from stock
            product.stock -= item.quantity;
            await product.save();
        }

        // Create the order
        const order = new Order({
            user: req.user._id,
            products,
            totalAmount,
            shippingAddress,
            paymentMethod
        });

        const savedOrder = await order.save();

        return res.status(201).json({
            message: "Order created successfully",
            status: "Success",
            error: false,
            order: savedOrder
        });
    
    
};


export const getUserOrders = async (req, res, next) => {
    
        // Fetch orders for the authenticated user
        const orders = await Order.find({ user: req.user._id }).populate('products.product', 'name price'); // Populate product details

        if (!orders || orders.length === 0) {
            return next(ErrorResponse("No orders found for this user",404))
        }

        return res.status(200).json({
            message: "Orders retrieved successfully",
            status: "Success",
            error: false,
            orders: orders
        });
        
    
};


export const updateOrderStatus = async (req, res, next) => {
    
        const { id } = req.params;
        const { orderStatus } = req.body;

        // Update the order status using findByIdAndUpdate
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { orderStatus },  // The fields to update
            { new: true, runValidators: true }  // Options: new returns the updated document, runValidators ensures validation
        );

        if (!updatedOrder) {
            return next(ErrorResponse("Order not found", 404));
        }

    return res.status(200).json({
            message: "Order status updated successfully",
            status: "Success",
            error: false,
            data: updatedOrder
        });
    
};
