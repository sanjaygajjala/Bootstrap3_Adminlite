import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {



  constructor(
    private router: Router
  ) { }


  ngOnInit() {
    $(document).ready(function () {
      $('.sidebar-menu').tree();
    });

    this.router.events.subscribe((event) => {

      const Selector = {
        wrapper: '.wrapper',
        contentWrapper: '.content-wrapper',
        layoutBoxed: '.layout-boxed',
        mainFooter: '.main-footer',
        mainHeader: '.main-header',
        sidebar: '.sidebar',
        controlSidebar: '.control-sidebar',
        fixed: '.fixed',
        sidebarMenu: '.sidebar-menu',
        logo: '.main-header .logo'
      };

      const ClassName = {
        fixed: 'fixed',
        holdTransition: 'hold-transition'
      };

      // Get window height and the wrapper height
      const footerHeight = $(Selector.mainFooter).outerHeight() || 0;
      const headerHeight = $(Selector.mainHeader).outerHeight() || 0;
      const neg = headerHeight + footerHeight;
      const windowHeight = $(window).height();
      const sidebarHeight = $(Selector.sidebar).height() || 0;

      // Set the min-height of the content and sidebar based on
      // the height of the document.
      if ($('body').hasClass(ClassName.fixed)) {
        $(Selector.contentWrapper).css('min-height', windowHeight - footerHeight);
      } else {
        let postSetHeight;
        if (windowHeight >= sidebarHeight) {
          $(Selector.contentWrapper).css('min-height', windowHeight - neg);
          postSetHeight = windowHeight - neg;
        } else {
          $(Selector.contentWrapper).css('min-height', sidebarHeight);
          postSetHeight = sidebarHeight;
        }
        // Fix for the control sidebar height
        const $controlSidebar = $(Selector.controlSidebar);
        if (typeof $controlSidebar !== 'undefined') {
          if ($controlSidebar.height() > postSetHeight) {
            $(Selector.contentWrapper).css('min-height', $controlSidebar.height());
          }
        }
      }

      $('.control-sidebar-bg').css({
        position: 'absolute',
        height: $('.wrapper').height()
      });

    });







  }

}