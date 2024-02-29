const Order = require('../models/order');
const User = require('../models/user');
const Product = require('../models/product');

module.exports = {
    index,
    create,
    delete: deleteOrder,
};

async function index(req, res) {
    try {
        const userId = req.params.userId
        const orders = await Order.find({ username: req.params.username }).populate('items');
        let total = 0;
        if (orders.length > 0) {
            orders.forEach(order => {
                order.items.forEach(item => {
                    total += item.price;
                });    
            });
        }
        // Checks if cart is empty
        const isEmpty = orders.length === 0;
        res.render('orders/index', { orders, total, isEmpty });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}



async function create(req, res) {
    try {
        // Get user's ID from the req
        const userId = req.params.userId;
        const productId = req.params.productId;

        // Find product in the db using product ID from the req parameters
        const product = await Product.findById(req.params.productId);

        // Check if the product exists
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Find the user's order
        let order = await Order.findOne({ user: userId });

        // If the order doesn't exist, create a new one
        if (!order) {
            order = new Order({ user: userId, items: [] });
        }

        // Add the product to the order
        order.items.push({
            seller: product.seller,
            color: product.color,
            category: product.category,
            name: product.name,
            price: product.price,
        });

        // Save the order
        await order.save();
        
        return res.redirect('/orders'); // Redirect to the orders page
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


// async function create(req, res) {
//     try {
        // Get user's ID from the request parameters
//         const userId = req.params.userId;

         // Find the product in the database using the product ID from the request parameters
//         const product = await Product.findById(req.params.productId);

//         // Check if the product exists
//         if (!product) {
//             return res.status(404).send('Product not found');
//         }

         // Find the user's order
//         let order = await Order.findOne({ user: userId });

        // If the order doesn't exist, create a new one
//         if (!order) {
//             order = new Order({ user: userId, items: [] });
//             await order.save();
//         }

         // Check if the product already exists in the order
//         if (order.items.some(item => item.product.equals(req.params.productId))) {
             // Item already exists in the order, do not add it again
//             return res.redirect('/orders');
//         }

         // Add the product to the order
//         order.items.push({
//             product: req.params.productId,
//             price: product.price,
//         });

         // Save the order
//         await order.save();
        
        // Redirect back to the product detail page
//         return res.redirect('/products/' + req.params.productId);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send('Internal Server Error');
//     }
// }
