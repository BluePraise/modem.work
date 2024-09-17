<?php snippet('header') ?>

<main>

  <div class="about-layout">
    <section>
      <h1 class="about-title"><?= $page->title() ?></h1>
      <div class="about-text">
        <?= $page->text()->kt() ?>
      </div>
      <div class="about-text">
        <?= $page->address()->kt() ?>
      </div>
      <div class="about-text">
        <p class="mb-0">
          <?= html::tel($page->phone()) ?>
        </p>
        <p class="mb-0">
        <?= html::email($page->email()) ?>
        </p>
      </div>
    </section>
    <section>
      <h3 class="about-title"><?= $page->statement() ?></h3>
      <?php if ($image = $page->images()->first()) : ?>
      <div class="text-center">
        <img src="<?= $image->url() ?>" alt="" class="showcase-image showcase-image--small">
      </div>
      <?php endif ?>
      <div class="about-text">
        <?= $page->kathrynbio()->kt() ?>
      </div>
    </section>
    <section>
      <h3 class="about-title"><?= $page->quote() ?></h3>
      <?php if ($image = $page->images()->last()) : ?>
      <div class="text-center">
        <img src="<?= $image->url() ?>" alt="" class="showcase-image showcase-image--small">
      </div>
      <?php endif ?>
      <div class="about-text">
        <?= $page->nicholasbio()->kt() ?>
      </div>
    </section>
    <section>
      <h3 class="about-title">+</h3>
      <div class="about-text">
        <?= $page->moretext()->kt() ?>
      </div>
    </section>
  </div>
</main>

<?php snippet('footer') ?>
