<?php snippet('header', ['class' => 'product-page']); ?>


<main>

    <div class="showcase-container">

        <div class="showcase-item">
            <div class="meta-info">
                <span><?php echo $page->Location(); ?> / <?php echo $page->Year(); ?></span>
            </div>
            <h3 class="showcase-title">
                <?= $page->Headline()->kt() ?>
            </h3>

            <ul class="showcase-tags">
                <?php $tags = str::split($page->Tags(), ','); ?>
                <?php foreach ($tags as $t): ?>
                    <li class="showcase-tag">
                        <a href="<?php echo url(
                          'tag:' . urlencode($t)
                        ); ?>" class="js-tag" data-tag="<?php echo $t; ?>">
                            <?php echo html($t); ?>
                        </a>
                    </li>
                <?php endforeach; ?>
            </ul>

            <div class="showcase-text">
                <?= $page->text()->kirbytext() ?>
            </div>

            <div class="showcase-item__footer">
                <ul>
                    <li>

                        <?php if ($prev = $page->prev()): ?>
                            <a href="<?= $prev->url() ?>">Please show me another project</a>
                        <?php endif; ?>
                        <?php if (!isset($prev) && ($next = $page->next())): ?>
                            <a href="<?= $page
                              ->siblings()
                              ->last()
                              ->url() ?>">Please show me another project</a>
                        <?php endif; ?>
                   </li>
                   <li>
                    <a href="<?= url() ?>/#projects">All projects, please</a>
                   </li>
               </ul>
            </div>

        </div>

        <div class="showcase-images">
            
            <?php 
            if (
              $image = $page
                ->images()
                ->sortBy('sort', 'asc')
                ->first()
            ): ?>
            <div class="showcase-images__col">
                <img src="<?php echo $image->resize(1416)->url(); ?>" alt="<?php echo $image->title(); ?>">
            </div>
            <?php endif; ?>

            <div class="showcase-images__col">
            <?php if ($images = $page->images()->sortBy('sort', 'asc')): ?>
            <?php foreach ($images->slice(1) as $image): ?>
                <img class="showcase-images__img" loading="lazy" src="<?php echo $image->resize(1416)->url(); ?>" alt="<?php echo $image->title(); ?>">
            <?php endforeach; endif; ?>
            </div>
        </div> <!-- /.showcase-images -->
    </div> <!-- /.showcase-container -->

</main>

<?php snippet('footer'); ?>
