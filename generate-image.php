<?php

require_once( dirname( dirname( dirname( dirname( __FILE__ )))) . '/wp-load.php' );

$post_id = $_GET['post_id'];

if (!$_GET['post_id']) {
  die('No post id');
}

$post_title = get_the_title($post_id);

$img = imagecreatefromjpeg('template.jpg');

$width = 1600;
$height = 900;

$title_color   = imagecolorallocate($img, 255, 222, 89);

imagettftext($img, 150, 0, 10, 20, $title_color, $font, $post_title);

# display the image and free memory
Header("Content-type: image/jpeg");
imagejpeg($img);
imagedestroy($img);