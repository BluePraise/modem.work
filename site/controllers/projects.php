<?php

return function ($page) {

    // get all projects
    $projects = $page->children()->listed()->flip();

    // fetch all tags
    // $tags = $projects->children()->Tags();

    // fetch all tags
    $tags = $articles->pluck('tags', ',', false);

     // pass $projects to the template
    return [
        'projects' => $projects,
        'tags' => $tags
    ];

};
