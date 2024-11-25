<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('barcode');           
            $table->string('name');              
            $table->text('description');         
            $table->string('category');          
            $table->integer('avail_quantity'); 
            $table->decimal('price', 8, 2);     
            $table->timestamps();         
        });
    }
};