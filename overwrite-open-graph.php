<?php
// This file is to be imported/requried in the theme's functions.php file.

function wp_open_graph_overwrite_YOAST( $url ) {
  if (!is_singular('post')) {
    return $url;
  }

  // Check if the file exists on disk
  $image = '/image-generator/images/' . get_the_ID() . ".png";
  $imageURL = get_stylesheet_directory_uri() . $image;
  $imagePath = get_stylesheet_directory() . $image;

  if (file_exists($imagePath)) {
    return $imageURL;
  }

  return $url;
}

add_filter( 'wpseo_opengraph_image', 'wp_open_graph_overwrite_YOAST' );