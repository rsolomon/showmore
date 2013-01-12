/**
 * jQuery showMorePlugin
 *
 * @version 0.0.1
 * @author Ross Solomon
 * @licence MIT Licence - http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Ross Solomon
 * https://github.com/rsolomon
 */
;(function($){
  $.fn.showMore = function(options) {

    var settings = $.extend({
        charLength: 50,
        linkText: 'Show More',
        duration: 250
      }, options);
    
    var $parentObject = this,
      $expandLink = $(['<a href="#">', settings.linkText, '</a>'].join('')),
      expandedContent = this.html(),
      expandedHeight = this.height();
    
    // Set up event handlers
    $expandLink.on('click', showMore);

    // If the text inside of the original object is above the given threshold,
    // Place the "Show More" link and force the height of the object to be that
    // of the reduced text.
    if (this.text().length > settings.charLength) {
      placeShowMoreLink(this, 0);
      this.css({
        height: this.height() + 'px',
        overflow: 'hidden'
      });
    }
    return this;

    /**
     * Restores the original content and animates from the collapsed height 
     * to the full original height.
     */
    function showMore() {
      $parentObject.html(expandedContent)
        .animate({
          height: expandedHeight
        }, settings.duration);
    }

    /**
     * Search through the child nodes recursively with the intent of truncating
     * the expanded text without slicing up any child HTML nodes. Will place
     * the "Show More" link after the truncation point.
     * @param {jQuery} parentContent jQuery node to search through for the ideal
     *   place to truncate text and insert the link.
     * @param {Number} runningTotal A total count of characters that exist
     *   before the beginning of `parentContent`.
     */
    function placeShowMoreLink(parentContent, runningTotal) {
      var total = runningTotal,
        contents = parentContent.contents();

      if (contents.length === 1 && contents[0].nodeType === 3) {
        if (runningTotal > settings.charLength) {

          // If we've already passed the `charLength` threshold, the "Show More"
          // link should have already been inserted so we can just remove
          // everything after that point.
          parentContent.remove();
        } else if ((parentContent.text().length + runningTotal) >
            settings.charLength) {

          // We've found the node that is pure text and contains the point
          // at which we should split the text and insert the text.
          var splitIndex = settings.charLength - runningTotal,
            nodeText = parentContent.text();

          // Truncate the text and insert the "Show More" link.
          parentContent.text('')
            .append(nodeText.slice(0, splitIndex))
            .append('... ')
            .append($expandLink);
        }
      } else {

        // Recursively search through the other nodes with the intent of either
        // keeping them, hiding them, or inserting the link.
        contents.each(function() {
          placeShowMoreLink($(this), total);
          total += $(this).text().trim().length;
        });
      }
    }
  };
})(jQuery);