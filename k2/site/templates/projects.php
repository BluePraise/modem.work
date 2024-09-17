<?php snippet('header') ?>
<main>
    <?php foreach($projects as $project): ?>
        <?php snippet('project', ['project' => $project]); ?>
    <?php endforeach ?>

  </main>

<?php snippet('footer') ?>