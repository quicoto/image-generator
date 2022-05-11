<?php

$path = preg_replace('/wp-content.*$/','',__DIR__);

include($path.'wp-load.php');

$args = array(
  'numberposts' => -1
);

$posts = get_posts( $args );

echo "<pre>";

if ( $posts ) {
  foreach ( $posts as $post ) {
    print_r($post->ID . "|" . $post->post_title . "\n");
  }
}

echo "</pre>";