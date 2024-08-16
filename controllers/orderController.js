import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

export const createOrder = async (req, res) => {
    try {
        const { products, totalAmount, shippingAddress, paymentMethod } = req.body;

        // Validate product availability and update stock
        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({
                    message: `Product not found with ID: ${item.product}`,
                    status: "Failure",
                    error: true
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Not enough stock for product: ${product.name}`,
                    status: "Failure",
                    error: true
                });
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

    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Failure",
            error: true
        });
    }
};


export const getUserOrders = async (req, res) => {
    try {
        // Fetch orders for the authenticated user
        const orders = await Order.find({ user: req.user._id }).populate('products.product', 'name price'); // Populate product details

        if (!orders || orders.length === 0) {
            return res.status(404).json({
                message: "No orders found for this user",
                status: "Failure",
                error: true
            });
        }

        return res.status(200).json({
            message: "Orders retrieved successfully",
            status: "Success",
            error: false,
            orders: orders
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Failure",
            error: true
        });
    }
};


export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;

        // Find the order by ID
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found",
                status: "Failure",
                error: true
            });
        }

        // Update the order status
        order.orderStatus = orderStatus || order.orderStatus;

        // Save the updated order
        const updatedOrder = await order.save();

        return res.status(200).json({
            message: "Order status updated successfully",
            status: "Success",
            error: false,
            data: updatedOrder
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            status: "Failure",
            error: true
        });
    }
};
