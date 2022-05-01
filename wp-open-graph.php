<?php
/*
Plugin Name: WordPress Open Graph Image Generator
Plugin URI: https://ricard.dev
Description: Generated Open Graph Image for your WordPress site
Author: Ricard Torres
Version: 1.0
Author URI: https://ricard.dev
License: GPLv2 (or later)
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function wp_open_graph_overwrite_YOAST( $url ) {
  if (!is_singular('post')) {
    return $url;
  }

  return plugin_dir_url( __FILE__ ) . 'generate-image.php?post_id=' . get_the_ID();
}

add_filter( 'wpseo_opengraph_image', 'wp_open_graph_overwrite_YOAST' );

