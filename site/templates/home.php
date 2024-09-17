<?php if (
!kirby()
  ->request()
  ->ajax()
): ?>
<?php snippet('header'); ?>

  <canvas class="bubbles-canvas" id="bubbles" resize></canvas>

  <div class="image-circles">
    <?php
    $projects = page('projects')
      ->children()
      ->visible();
    $i = 0;
    foreach ($projects->images() as $image):
      if ($image->inHero() == 'true'):
        $image = $image->thumb();

        if ($i < 2):
          $circleDim = $i === 0 ? 300 : 400;
          $cxy = $i === 0 ? 150 : 200;
          $r = $i === 0 ? 100 : 125;
          $strokeWidth = $i === 0 ? 75 : 100;
          $svgClass = $i === 0 ? 'image-circle--small' : 'image-circle--big';
          $viewBox = "0 0 $circleDim $circleDim";

          ?>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
               class="image-circle <?= $svgClass ?>" viewBox="<?= $viewBox ?>">
            <defs>
              <!-- Add width and height in php file, because not working from css -->
              <pattern id="<?= 'mask-' . $i ?>" patternUnits="userSpaceOnUse" width="<?= $circleDim ?>"
                       height="<?= $circleDim ?>">
                <image xlink:href="<?= $image->url() ?>" width="100%" height="100%"
                       preserveAspectRatio="xMidYMid slice"/>
              </pattern>
            </defs>
            <circle fill="transparent" stroke="url(#<?= 'mask-' . $i ?>)" stroke-width="<?= $strokeWidth ?>"
                    r="<?= $r ?>" cx="<?= $cxy ?>" cy="<?= $cxy ?>"/>
          </svg>
          <?php $i += 1; ?>
        <?php endif; endif; endforeach; ?>
  </div>

<main>


  <section class="projects-section" id="projects">

    <ul class="showcase grid-layout">
      <?php endif; ?>
      <?php snippet('project'); ?>
      <?php if (!kirby()->request()->ajax()): ?>
    </ul>
  </section>

</main>

<?php snippet('footer'); ?>


  <script>

      $('.showcase').on('click', '.js-tag', function (ev) {
          ev.preventDefault()

          ModemGetPostsByTag($(this).data('tag'))
          window.scrollTo(0, $("#projects").offset().top);
      })
  </script>

<?php endif; ?>
