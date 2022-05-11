# Node image generator

Generates images with a given text and an ID using canvas.

## [Open Graph](https://ogp.me/) and WordPress

⚠️ You don't have to integrate with WordPress if you don't want to. Fork the project and use it as a standalone or with another data source.

The database (source of the script) is generated based on WordPress posts titles with their ID's using the [generate-posts-ids.php](generate-posts-ids.php)

Then by adding the [overwrite-open-graph.php](overwrite-open-graph.php) you can overwrite the [Yoast SEO](https://wordpress.org/plugins/wordpress-seo/) plugin output for the Open Graph image.

Should the image file exist on disk, it will look something like:

```html
<meta property="og:image" content="https://ricard.dev/wp-content/themes/ricks-code/image-generator/images/9105.png" />
```

You can either place this script inside your WordPress theme or use a WordPress plugin.

## How it works?

1. Get an array of images to create (title+id) from [database.txt](database.txt)
2. Create a canvas with background color
3. Defines font sizes and colors
4. Adds a text to the canvas, check for word wrapping.
5. Creates the image (PNG) file to disk

### Throttle

The code has a setTimeout to throttle the process and prevent from being killed in certain environments. You may customize the delay.