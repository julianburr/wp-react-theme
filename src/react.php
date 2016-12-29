<?php

/**
 * React
 * Experimental WP theme
 * 
 * Author: Julian Burr
 * Version: 0.1
 * License: Published under MIT license
 */

namespace WPTheme\React;
use WP_Query;

class ReactTheme {

  protected $themeSlug = 'react-api';
  protected $apiVersion = 1;

  protected $restNamespace;
  protected $sidebars;

  public function __construct () {
    $this->restNamespace = $this->themeSlug . '/v' . $this->apiVersion;
    $this->sidebars = array(
      // Home sidebar
      'home' => array(
        'name' => 'Home',
        'id' => 'home',
        'before_widget' => '<div>',
        'after_widget' => '</div>',
        'before_title' => '<h2>',
        'after_title' => '</h2>',
      )
    );
  }

  public function init () {
    add_action('after_setup_theme', array($this, 'setup'));
    add_action('rest_api_init', array($this, 'registerRestApis'));
    add_action('widgets_init', array($this, 'registerWidgetAreas'));
  }

  public function setup () {
    $this->addLocaleSupport();
    $this->addThemeSupport();
  }

  public function addLocaleSupport () {
    // Make available for translations
    load_theme_textdomain('react');
  }

  public function addThemeSupport () {
    // Add theme supports
    add_theme_support('custom-logo');
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('post-formats', array('aside', 'image', 'video', 'quote', 'link', 'gallery', 'audio'));
    add_theme_support('html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ));
  }

  public function registerWidgetAreas () {
    foreach ($this->sidebars as $sidebar) {
      register_sidebar($sidebar);
    }
  }

  public function getRoutesFromRewriteRules ($rewriteRules, $permalinkStructure) {
    // Try to translate as many rules into react router routes as possible
    // React router doesn't support regex though, so not all routes can be translated
    // e.g. routes that would only include placeholders!
    $routes = array();
    $contentRoute = null;
    foreach ($rewriteRules as $regex => $target) {
      $continue = array('attachment', '.*wp-', 'robots', 'wp-json');
      foreach ($continue as $c) {
        if (strpos($regex, $c) !== false || strpos($target, $c) !== false) {
          continue 2;
        }
      }
      preg_match_all('/[&?]{1,2}([^=]*)=\$matches\[([0-9+])\]/', $target, $matches, PREG_PATTERN_ORDER);
      $replaces = array();
      foreach ($matches[1] as $key => $match) {
        preg_match_all('/_([a-zA-Z])/', $match, $matchWrongCases, PREG_OFFSET_CAPTURE);
        foreach($matchWrongCases[0] as $key => $wrong) {
          $match = str_replace($wrong[0], strtoupper($matchWrongCases[1][$key][0]), $match);
        }
        $replaces[(int)$matches[2][$key]] = ':' . $match;
      }
      $newRegex = $regex;
      foreach ($replaces as $replace) {
        preg_match('/\([^\)]*\)/', $newRegex, $replaceMatch, PREG_OFFSET_CAPTURE);
        $newRegex = substr_replace($newRegex, $replace, $replaceMatch[0][1], strlen($replaceMatch[0][0]));
      }
      $newRegex = str_replace('?$', '', $newRegex);
      $check = false;
      foreach(explode('/', $newRegex) as $string) {
        if (strlen($string) > 0 && strpos($string, ':') === false) {
          $check = true;
          break;
        }
      }
      if ($check && strpos($newRegex, '?') === false) {
        $routes[] = '/' . $newRegex;
      }
    }
    $contentRoute = $permalinkStructure;
    preg_match_all('/[%]{1}([^%]*)[%]{1}/', $contentRoute, $contentRouteMatches, PREG_PATTERN_ORDER);
    foreach ($contentRouteMatches[1] as $match) {
      $contentRoute = str_replace('%' . $match . '%', ':' . $match, $contentRoute);
    }
    return array(
      'lists' => $routes,
      'content' => $contentRoute
    );
  }

  public function getSettings () {
    $rewriteRules = get_option('rewrite_rules');
    $permalinkStructure = get_option('permalink_structure');
    $routes = $this->getRoutesFromRewriteRules($rewriteRules, $permalinkStructure);

    $categoryBase = get_option('category_base');
    if (strlen($categoryBase) === 0) {
      $categoryBase = 'category';
    }

    $tagBase = get_option('tag_base');
    if (strlen($tagBase) === 0) {
      $tagBase = 'tag';
    }
    
    // Get relevant option fields
    return array(
      'baseUrl' => get_option('siteurl'),
      'home' => get_option('home'),
      'siteName' => get_option('blogname'),
      'postsPerPage' => get_option('posts_per_page'),
      'dateFmt' => get_option('date_format'),
      'timeFmt' => get_option('time_format'),
      'routes' => $routes,
      'categoryBase' => $categoryBase,
      'tagBase' => $tagBase,
      'sidebars' => $this->getSidebars(),
      'menus' => $this->getMenus()
    );
  }

  public function getContentBySlug () {
    $args = array(
      'name' => $_GET['slug'],
      'post_type' => 'any'
    );
    $query = new WP_Query($args);
    if ($query->have_posts()) {
      $post = null;
      while($query->have_posts()) {
        $query->the_post();
        // Get content
        global $more;
        $content = '';
        $excerpt = '';
        ob_start();
        $more = 1;
        the_content();
        $content = ob_get_clean();
        // ... and excerpt
        ob_start();
        $more = 0;
        the_excerpt();
        $excerpt = ob_get_clean();
        // Categories
        $c = get_categories();
        $categories = array();
        foreach ($c as $category) {
          $categories[] = array(
            'id' => $category->term_id,
            'name' => $category->name,
            'link' => get_category_link($category->id),
            // 'originalData' => $category
          );
        }
        // Tags
        $t = get_tags();
        $tags = array();
        foreach ($t as $tag) {
          $tags[] = array(
            'id' => $tag->term_id,
            'name' => $tag->name,
            'link' => get_tag_link($tag->id),
            // 'originalData' => $tag
          );
        }
        // Put everything together
        $post = array(
          'id' => get_the_ID(),
          'type' => get_post_type(),
          'slug' => $_GET['slug'],
          'data' => array(
            'title' => get_the_title(),
            'date' => get_the_date(),
            'content' => array(
              'excerpt' => $excerpt,
              'rendered' => str_replace($excerpt, '<div class="excerpt">' . $excerpt . '</div>', $content)
            ),
            'categories' => $categories,
            'tags' => $tags,
            'link' => get_permalink()
          ),
          // 'originalData' => $query->post
        );
        break;
      }
      return $post;
    } else {
      return null;
    }
  }

  public function getMenus () {
    $terms = get_terms('nav_menu');
    $menus = array();
    foreach ($terms as $term) {
      $menus[] = $this->getMenu($term->term_id);
    }
    return $menus;
  }

  public function getMenu ($id) {
    $menu = wp_get_nav_menu_object($id);
    if (!$menu) {
      return null;
    }
    $menu->id = $id;
    $menu->items = $this->getMenuItems($id);
    return $menu;
  }

  public function getMenuRest ($data) {
    return $this->getMenu($data['id']);
  }

  public function getMenuItems ($id) {
    return wp_get_nav_menu_items($id);
  }

  public function getSidebars () {
    $sidebars = array();
    $option = get_option('sidebars_widgets');
    foreach ($option as $name => $data) {
      if ($name !== 'orphaned_widgets_1' && $name !== 'wp_inactive_widgets' && $name !== 'array_version') {
        // Grab widgets
        $widgets = array();
        foreach ($data as $className) {
          $base = _get_widget_id_base($className);
          $id = str_replace($base . '-', '', $className);
          $widget = get_option('widget_' . $base)[$id];
          $widgets[] = array(
            'type' => $base,
            'typeID' => $id,
            'class' => $className,
            'data' => $widget
          );
        }
        // Get rendered sidebar HTML
        ob_start();
        dynamic_sidebar($name); 
        $rendered = ob_get_clean();
        // Put everything together
        $sidebars[$name] = array(
          'id' => $name,
          'data' => $this->sidebars[$name],
          'widgets' => $widgets,
          'rendered' => $rendered
        );
      }
    }
    if (count($sidebars) > 0) {
      return $sidebars;
    }
    return null;
  }

  public function registerRestApis() {
    // Settings
    register_rest_route($this->restNamespace, '/settings', array(
      'methods' => 'GET',
      'callback' => array($this, 'getSettings')
    ));
    // Content by slug
    register_rest_route($this->restNamespace, '/content', array(
      'methods' => 'GET',
      'callback' => array($this, 'getContentBySlug')
    ));
    // Menus
    register_rest_route($this->restNamespace, '/menus', array(
      'methods' => 'GET',
      'callback' => array($this, 'getMenus')
    ));
    register_rest_route($this->restNamespace, '/menus/(?P<id>\d+)', array(
      'methods' => 'GET',
      'callback' => array($this, 'getMenuRest')
    ));
    // Sidebars & Widgets
    register_rest_route($this->restNamespace, '/sidebars', array(
      'methods' => 'GET',
      'callback' => array($this, 'getSidebars')
    ));
  }
}
