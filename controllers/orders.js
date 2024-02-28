const Order = require('../models/order');

module.exports = {
    index,
    create,
    delete: deleteOrder,
};

async function index(req, res) {
    try {
        const orders = await Order.find({ googleID: req.user.googleId }).populate('products');
        let total = 0;
        orders.forEach(order => {
            order.items.forEach(item => {
                total += item.price;
            });
        });
        const isEmpty = orders.length === 0;
        res.render('orders/index', { orders, isEmpty });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

async function create(req, res) {
    try {
        // Get user's Google ID from the req
        const googleId = req.user.googleId;

        // Find product in the db using product ID from the req parameters
        const product = await Product.findById(req.params.productId);

        // Check if the product exists
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Check if the buyer has an existing order with the seller
        const existingOrder = await Order.findOne({ seller: product.seller, buyer: googleId });

        // If the buyer has an existing order, check if the item already exists in the order
        if (existingOrder) {
            const existingItem = existingOrder.items.find(item => item.product.equals(product._id));
            if (existingItem) {
                // If the item already exists, no need to add it again
                return res.redirect('/products/' + req.params.productId);
            } else {
                // If the item doesn't exist, add it to the existing order
                existingOrder.items.push({
                    product: product._id,
                    price: product.price
                });
                await existingOrder.save();
                return res.redirect('/products/' + req.params.productId); // Redirect to product detail page
            }
        }

        // If no existing order, create a new order and add the item
        const newOrder = new Order({
            buyer: googleId,
            seller: product.seller,
            items: [{
                product: product._id,
                price: product.price
            }]
        });
        await newOrder.save();
        return res.redirect('/products/' + req.params.productId); // Redirect to product detail page using specific product ID
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

async function deleteOrder(req, res) {
    try {
        await Order.findByIdAndRemove(req.params.id);
        res.redirect('/orders/:id');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}






//maybe a prompt for when a user adds item to cart to either, "Go to cart" or "Continue shopping"
//so if "Go to cart" redirects to cart, if "Continue shopping" remain on current page.






// async function create(req, res) {
//     const order = new Order({
//         product: req.body.product,
//         quantity: req.body.quantity,
//         price: req.body.price
//     });
//     try {
//         const newOrder = await order.save();
//         res.redirect('/orders');
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// }