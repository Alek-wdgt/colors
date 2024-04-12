<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Color;
//use Faker\Factory as Faker;



class ColorSeeder extends Seeder
{
  public function run()
  {
//    $faker = Faker::create();
//
//    foreach (range(1, 10) as $index) {
//      Color::create([
//          'name' => $faker->colorName,
//          'hex_code' => $faker->hexColor,
//      ]);
//    }

    $colors = [
        ['name' => 'Aqua', 'hex_code' => '#00FFFF'],
        ['name' => 'Seashell', 'hex_code' => '#FFF5EE'],
        ['name' => 'Dark Green', 'hex_code' => '#006400'],
        ['name' => 'Cornflower Blue', 'hex_code' => '#6495ED'],
        ['name' => 'Orange', 'hex_code' => '#FFA500'],
        ['name' => 'Saddle Brown', 'hex_code' => '#8B4513'],
        ['name' => 'Silver', 'hex_code' => '#C0C0C0'],
        ['name' => 'Light Cyan', 'hex_code' => '#E0FFFF'],
        ['name' => 'Peach Puff', 'hex_code' => '#FFDAB9'],
        ['name' => 'Dim Gray', 'hex_code' => '#696969'],
        ['name' => 'Pale Green', 'hex_code' => '#98FB98'],
        ['name' => 'Steel Blue', 'hex_code' => '#4682B4'],
        ['name' => 'Blue Violet', 'hex_code' => '#8A2BE2'],
        ['name' => 'Thistle', 'hex_code' => '#D8BFD8'],
        ['name' => 'Peru', 'hex_code' => '#CD853F'],
        ['name' => 'Misty Rose', 'hex_code' => '#FFE4E1'],
        ['name' => 'Light Salmon', 'hex_code' => '#FFA07A'],
        ['name' => 'Fuchsia', 'hex_code' => '#FF00FF'],
        ['name' => 'Olive Drab', 'hex_code' => '#6B8E23'],
        ['name' => 'Dark Blue', 'hex_code' => '#00008B'],
        ['name' => 'Violet', 'hex_code' => '#EE82EE'],
        ['name' => 'Brown', 'hex_code' => '#A52A2A'],
        ['name' => 'Rosy Brown', 'hex_code' => '#BC8F8F'],
        ['name' => 'Lavender Blush', 'hex_code' => '#FFF0F5'],

        ['name' => 'Dark Red', 'hex_code' => '#8B0000'],
        ['name' => 'Light Blue', 'hex_code' => '#ADD8E6'],
        ['name' => 'Olive', 'hex_code' => '#808000'],
        ['name' => 'Medium Orchid', 'hex_code' => '#BA55D3'],
        ['name' => 'Salmon', 'hex_code' => '#FA8072'],
        ['name' => 'Navy', 'hex_code' => '#000080'],
        ['name' => 'Indian Red', 'hex_code' => '#CD5C5C'],
        ['name' => 'Light Pink', 'hex_code' => '#FFB6C1'],
        ['name' => 'Powder Blue', 'hex_code' => '#B0E0E6'],

        ['name' => 'White', 'hex_code' => '#FFFFFF'],
        ['name' => 'Pale Goldenrod', 'hex_code' => '#EEE8AA'],
        ['name' => 'Spring Green', 'hex_code' => '#00FF7F'],
        ['name' => 'Cadet Blue', 'hex_code' => '#5F9EA0'],
        ['name' => 'Papaya Whip', 'hex_code' => '#FFEFD5'],
        ['name' => 'Dark Slate Blue', 'hex_code' => '#483D8B'],
        ['name' => 'Red', 'hex_code' => '#FF0000'],
        ['name' => 'Indigo', 'hex_code' => '#4B0082'],
        ['name' => 'Pale Turquoise', 'hex_code' => '#AFEEEE'],
        ['name' => 'Aquamarine', 'hex_code' => '#7FFFD4'],

        ['name' => 'Moccasin', 'hex_code' => '#FFE4B5'],
        ['name' => 'Yellow', 'hex_code' => '#FFFF00'],

    ];

    foreach ($colors as $colorData) {
      // Check if a color with the same hex code already exists
  $existingColor = Color::where('hex_code', $colorData['hex_code'])->first();

      if (!$existingColor) {
        Color::create([
            'name' => $colorData['name'],
            'hex_code' => $colorData['hex_code'],
        ]);
      } else {
        echo "Color hex code '{$colorData['hex_code']}' already exists.\n";
        $existingColor->update(['name' => $colorData['name']]);
      }
    }

  }
}
