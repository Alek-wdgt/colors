<?php

namespace App\Http\Controllers;

use App\Models\Color;
use Illuminate\Http\Request;

class ColorController extends Controller
{
  public function index()
  {
    return Color::all();
  }

  public function store(Request $request)
  {
    $request->validate([
        'name' => 'required|string',
        'hex_code' => 'required|string',
    ]);

    return Color::create($request->all());
  }

  public function show($id)
  {
    return Color::findOrFail($id);
  }

  public function update(Request $request, $id)
  {
    $color = Color::findOrFail($id);
    $color->update($request->all());

    return $color;
  }

  public function destroy($id)
  {
    $color = Color::findOrFail($id);
    $color->delete();

    return response()->json(['message' => 'Color deleted successfully']);
  }
}
