/*! Angular CKEditor placeholder v0.1.1 | (c) 2014 Le Monde | License MIT */

(function (root, factory) {
  // AMD
  if (typeof define === 'function' && define.amd) define(['angular', 'angular-ckeditor'], factory);
  // Global
  else factory(angular);
}(this, function (angular) {

  angular
  .module('ckeditorPlaceholder', ['ckeditor'])
  .directive('placeholder', ['$parse', '$timeout', placeholderDirective]);

  /**
   * Placeholder directive.
   */

  function placeholderDirective($parse, $timeout) {
    return {
      restrict: 'A',
      require: ['?ckeditor'],
      link: function (scope, element, attrs, ctrls) {
        var ckeditor = ctrls[0];
        if (! ckeditor) return ;

        var placeholder = attrs.placeholder;
        var className = 'placeholder';

        // Initialize placeholder.
        ckeditor.ready().then(function initialize() {
          // Listen events.
          ckeditor.instance.on('blur', show);
          ckeditor.instance.on('key', hide);
          ckeditor.instance.on('focus', hide);

          // Since placeholder is fake data,
          // the getData should be intercepted to send nothing.
          ckeditor.instance.on('getData', function (event) {
            if (isActive()) event.data.dataValue = '';
          });

          // And of course the placeholder must be removed
          // if data is set.
          ckeditor.instance.on('setData', function (event) {
            if (event.data.dataValue) hide();
            // If active, plan an other show.
            else if(isActive()) $timeout(show);
          });

          // assist focusing when using contenteditable
          // thank you http://stackoverflow.com/q/9093424/587407
          element.focus(function() {
            // focus assist is needed only after a placeholder disappeared.
            // The placeholder, if any, is already removed at this stage.
            // We know there was one when there is no text :
            if (element.text()) return; // no placeholder was here, no need to assist focus.

            if (document.createRange && window.getSelection) {
              var range = document.createRange();
              range.selectNodeContents(this);
              var sel = window.getSelection();
              sel.removeAllRanges();
              sel.addRange(range);
            }
          });

          // Try to display placeholder.
          $timeout(show);
        });

        /**
         * Display the placeholder.
         */

        function show() {
          // If there is data, we don't show the placeholder.
          if (ckeditor.instance.getData()) return ;

          ckeditor.instance.container.addClass(className);
          ckeditor.instance.container.setHtml('<div contenteditable="false">' + placeholder  + '</div>');
        }

        /**
         * Hide the placeholder.
         */

        function hide() {
          // If not active, do nothing.
          if (! isActive()) return ;

          ckeditor.instance.container.removeClass(className);
          ckeditor.instance.container.setHtml('');
        }

        /**
         * Check if the placeholder is active or not.
         *
         * @returns {Boolean}
         */

        function isActive() {
          return ckeditor.instance.container.hasClass(className);
        }
      }
    };
  }
}));