<!doctype html>
<html lang="en">
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?=$site->title()?> | <?=$page->title()?></title>


  <?=css(['assets/css/modem.css', '@auto'])?>
  <?=css(['assets/css/index.css', '@auto'])?>
  <?=js("assets/js/jquery.min.js")?>
  <?=js("assets/js/paper-full.min.js")?>
  <?=js("assets/js/main.js")?>
  <?=js("assets/js/jquery.colorbox-min.js")?>
  <?php if ($page->isHomePage()): ?>
    <?=js("assets/js/home.js")?>
    <?=js("assets/js/bubbles.js", ['type' => "text/paperscript", 'canvas' => "bubbles"])?>
  <?php endif;?>



</head>
<body class="<?php echo isset($class) ? $class : '' ?>">



<header class="header flex <?=!$page->isHomePage() ? 'logo-lock header--simple' : ''?>" role="banner">
    <div class="center">
      <div class="logo-container">
        <nav class="header__nav">
          <div>
            <p><?php echo $site->coords(); ?></p>
            <a href="<?=url()?>/about">about</a>
          </div>
          <div>
          <?php
$projects = page('projects')->children()->listed()->count();
?>
            <p><?php echo "<span class='js-project-count'>" . $projects . '</span>/' . $projects ?></p>
            <a class="js-go-to-projects" href="<?=url()?>/#projects">projects</a>
          </div>
        </nav>
        <a class="main-logo" href="<?=url()?>/#projects"><img src="<?=url('assets/imgs/logos/modem_logo-' . random_int(01, 22) . '.svg')?>"></a>

        <button class="menu-toggle"><span class="menu-toggle__icon">+</span></button>
    </div>

    <!-- <h1><?=$site->title()->html()?></h1> -->
  </div>
</header>


