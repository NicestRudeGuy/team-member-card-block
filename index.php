<?php

/***
 * Plugin Name: Team Member Card Block
 * Plugin URI: https://github.com/moitorrijos/team-member-card-block
 * Description: This is a plugin for displaying team member card block
 * Version: 0.1.0
 * Author: Juan Moises Torrijos
 * Author URI: https://moitorrijos.com
 * 
 */

defined( 'ABSPATH' ) || exit;

add_action( 'init', 'team_member_card_block_load_textdomain' );

function team_member_card_block_load_textdomain() {
  load_plugin_textdomain( 'team_member_card_block', false, basename( __DIR__ ) . '/languages' );
}

function team_member_card_register_block() {

  wp_register_script(
    'gutenberg_team_member_card_block',
    plugins_url('build/index.js', __FILE__),
    array('wp-block-editor', 'wp-blocks', 'wp-components', 'wp-element', 'wp-i18n', 'wp-polyfill'),
    '01'
  );

  wp_register_style(
    'gutenberg_team_member_card_block',
    plugins_url( 'style.css', __FILE__ ),
    array(),
    '01'
  );

  register_block_type( 'team-member-card/team_member_card_block_gutenberg', array(
    'style' => 'gutenberg_team_member_card_block',
    'editr_script' => 'gutenberg_team_member_card_block'
  ) );

  if ( function_exists( 'wp_set_script_translations' ) ) {
    wp_set_script_translations( 'gutenberg_team_member_card_block', 'team_member_card_block' );
  }
}

add_action( 'init', 'team_member_card_register_block' );
