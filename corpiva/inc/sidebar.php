<?php
/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */

function corpiva_widgets_init() {	
	if ( class_exists( 'WooCommerce' ) ) {
		register_sidebar( array(
			'name' => __( 'WooCommerce Widget Area', 'corpiva' ),
			'id' => 'corpiva-woocommerce-sidebar',
			'description' => __( 'This Widget area for WooCommerce Widget', 'corpiva' ),
			'before_widget' => '<aside id="%1$s" class="widget %2$s">',
			'after_widget' => '</aside>',
			'before_title' => '<h5 class="widget-title">',
			'after_title' => '</h5>',
		) );
	}
	
	register_sidebar( array(
		'name' => __( 'Sidebar Widget Area', 'corpiva' ),
		'id' => 'corpiva-sidebar-primary',
		'description' => __( 'The Primary Widget Area', 'corpiva' ),
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget' => '</aside>',
		'before_title' => '<h5 class="widget-title">',
		'after_title' => '</h5>',
	) );
	
	
	$corpiva_footer_widget_column = get_theme_mod('corpiva_footer_widget_column','4');
	for ($i=1; $i<=$corpiva_footer_widget_column; $i++) {
		register_sidebar( array(
			'name' => __( 'Footer  ', 'corpiva' )  . $i,
			'id' => 'corpiva-footer-widget-' . $i,
			'description' => __( 'The Footer Widget Area', 'corpiva' )  . $i,
			'before_widget' => '<aside id="%1$s" class="widget %2$s">',
			'after_widget' => '</aside>',
			'before_title' => '<h5 class="widget-title">',
			'after_title' => '</h5>',
		) );
	}
}
add_action( 'widgets_init', 'corpiva_widgets_init' );