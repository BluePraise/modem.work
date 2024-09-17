<?php

$tag = urldecode(param('tag'));
if ($tag) {
    $projects = page('projects')->children()->visible()->filterBy('tags', $tag, ',')->sortBy('order')->flip();
} else {
    $projects = page('projects')->children()->visible()->sortBy('order', SORT_NUMERIC);
}

?>


<?php foreach ($projects as $project): ?>

    <li class="showcase-item">
      <div class="content">

        <div class="meta-info">
            <span><?=$project->Location()?> / <?=$project->Year()?></span>
        </div>
      <h3 class="showcase-title"><a href="<?=$project->url()?>" class="showcase-link"><?=$project->Headline()->kt()?></a></h3>

        <ul class="showcase-tags <?=$tag ? 'tag-page' : ''?>">
            <?php $tags = str::split($project->Tags(), ',');?>
            <?php foreach ($tags as $t): ?>
              <li class="showcase-tag <?=$tag && $tag === $t ? 'showcase-tag--active' : ''?>">
                <a href="<?=url('tag:' . urlencode($t))?>" class="js-tag" data-tag="<?=$t?>"><?php echo html($t) ?></a>
              </li>
            <?php endforeach?>
          <li></li>

        </ul>

      <div class="showcase-item__images">

        <?php if ($image = $project->images()->sortBy('sort', 'asc')->first()): ?>
          <a href="<?=$project->url()?>">
            <img class="showcase-image showcase-image--big" src="<?=$image->url()?>" alt="<?=$image->title()?>">
        </a>
        <?php endif; ?>
      </div>
        <div class="showcase-text">
          <?= $project->excerptedText()->kirbytextinline($project->url()); ?>
          <a class="more"href="<?= $project->url() ?>">...more</a>
        </div>

      </div>
    </li>
<?php endforeach?>

