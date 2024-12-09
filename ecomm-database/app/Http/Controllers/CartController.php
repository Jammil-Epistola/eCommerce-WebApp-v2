<?php

namespace App\Http\Controllers;
use App\Models\CartItem;
use Illuminate\Http\Request;

class CartController extends Controller
{
    //Get Cart
    public function getCart(Request $request)
    {
        $user = $request->user();
        $cart = $user->cartItems()->with('product')->get();

        $formattedCart = $cart->map(function ($item) {
            return [
                'id' => $item->id,
                'product_id' => $item->product->id,
                'name' => $item->product->name,
                'price' => $item->product->price,
                'quantity' => $item->quantity,
            ];
        });

        return response()->json($formattedCart);
    }

    // Add Product to Cart
    public function addToCart(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $user = $request->user();

        $cartItem = CartItem::firstOrCreate(
            ['user_id' => $user->id, 'product_id' => $validated['product_id']],
            ['quantity' => 0]
        );

        $cartItem->quantity += $validated['quantity'];
        $cartItem->save();

        return response()->json(Cart::where('user_id', $user->id)->get(), 200);
    }

    //Update Product Quantity
        public function updateCart(Request $request)
    {
        $validatedData = $request->validate([
            'cart_id' => 'required|exists:cart_items,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::findOrFail($validatedData['cart_id']);
        $cartItem->quantity = $validatedData['quantity'];
        $cartItem->save();

        return response()->json(['message' => 'Cart updated successfully.']);
    }

    //Delete Product from Cart
        public function removeFromCart($id)
    {
        $cartItem = CartItem::findOrFail($id);
        $cartItem->delete();

        return response()->json(['message' => 'Product removed from cart.']);
    }

    //Clear Cart
        public function clearCart(Request $request)
    {
        $user = $request->user();
        $user->cartItems()->delete();

        return response()->json(['message' => 'Cart cleared successfully.']);
    }
    
}
