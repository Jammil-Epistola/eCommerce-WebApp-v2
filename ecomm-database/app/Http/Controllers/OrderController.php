<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function submitOrder(Request $request)
    {
        $validatedData = $request->validate([
            'shippingDetails.name' => 'required|string|max:255',
            'shippingDetails.address' => 'required|string',
            'shippingDetails.phone' => 'required|string|min:10|max:15',
            'paymentMethod' => 'required|string|in:Cash on Delivery,Credit Card',
            'paymentDetails' => 'nullable|string',
            'cart' => 'required|array',
            'cart.*.id' => 'required|exists:products,id',
            'cart.*.quantity' => 'required|integer|min:1',
        ]);

        $user = $request->user();

        // Save the order
        $order = Order::create([
            'user_id' => $user->id,
            'shipping_name' => $validatedData['shippingDetails']['name'],
            'shipping_address' => $validatedData['shippingDetails']['address'],
            'shipping_phone' => $validatedData['shippingDetails']['phone'],
            'payment_method' => $validatedData['paymentMethod'],
            'payment_details' => $validatedData['paymentDetails'] ?? null,
            'status' => 'Pending',
        ]);

        // Save order items
        foreach ($validatedData['cart'] as $cartItem) {
            $product = Product::find($cartItem['id']);
            $order->orderItems()->create([
                'product_id' => $cartItem['id'],
                'quantity' => $cartItem['quantity'],
                'price' => $product->price,
            ]);
        }

        return response()->json(['message' => 'Order placed successfully!', 'order_id' => $order->id], 201);
    }
}
