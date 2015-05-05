<?php

// ------------------------------------------------------------------------------
// Import Template Files
// ------------------------------------------------------------------------------

$files = array(
   'helpers',
   'admin',
   'template',
   'acf-blocks',
   'images',
   'items',
   'loops'
);

if (is_array($files)) {
   foreach ($files as $filename) {
      include(TEMPLATEPATH . '/functions/' . $filename . '.php');
   }
}