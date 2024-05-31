<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {   
            $products = Product::with('user')->orderBy('id', 'desc')->get();
            
            return response([
                "products" => $products
            ], 200);
        } catch (Exception $e) {
            return response([
                "error" => $e->getMessage()
            ], 500);
        }
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProductRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_name' => 'required|string|max:255',
            'product_price' => 'required|numeric|min:0',
            'user_id' => 'required|exists:users,id',
        ]);
    
        try {
            $product = new Product();
            $product->product_name = $request->product_name;
            $product->product_price = $request->product_price;
            $product->user_id = $request->user_id;
            $product->save();

            $product->load('user');
    
            return response()->json([
                'message' => 'Product created successfully',
                'product' => $product
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $product = Product::findOrFail($id);
            return response()->json($product);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProductRequest  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);
            $update = $product->update([
                'product_name' => $request->product_name,
                'product_price' => $request->product_price
            ]);

            // Retrieve the updated product after the update operation
            $updatedProduct = Product::findOrFail($id);

            $updatedProduct->load('user');

    
            return response([
                "status" => "Success",
                "product" => $updatedProduct
            ]);
        } catch (Exception $e) {
            return response([
                "error" => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);

            if($product) {
                $product->delete();
    
                return response([
                    "status" => "Success",
                    "message" => "Product deleted successfully"
                ]);
            } 
        } catch (Exception $e) {
            return response([
                "error" => $e->getMessage()
            ], 500);
        }
    }
}
