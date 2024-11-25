<?php
namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductCRUD extends Controller
{
    public function index() {
        return Product::all();
    }

    public function store(Request $request){

        $validatedData = $request->validate([
            'barcode' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
            'avail_quantity' => 'required|integer',
            'price' => 'required|numeric',
        ]);

        $product = Product::create($validatedData);

        return response()->json($product, 201);
    }

    public function show($id) {
        return Product::findOrFail($id);
    }

   // Update a product
   public function update(Request $request, $id){
        $validatedData = $request->validate([
            'barcode' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
            'avail_quantity' => 'required|integer',
            'price' => 'required|numeric',
        ]);

        $product = Product::findOrFail($id);
        $product->update($validatedData);
        return response()->json($product, 200);
    }

    // Delete a product
    public function destroy($id) {
    Product::findOrFail($id)->delete();
    return response()->json(null, 204);
    }
}