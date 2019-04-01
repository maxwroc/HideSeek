/**
 * HideSeek-Mod jQuery plugin
 *
 * @copyright Copyright 2015, Dimitris Krestos
 * @license   Apache License, Version 2.0 (http://www.opensource.org/licenses/apache2.0.php)
 * @link      http://vdw.staytuned.gr
 * @version   v0.8.3
 *
 * Dependencies are include in minified versions at the bottom:
 * 1. Highlight v4 by Johann Burkard
 *
 * Sample html structure
 *
 *   <input name="search" placeholder="Start typing here" type="text" data-list=".list">
 *   <ul class="list">
 *     <li>item 1</li>
 *     <li>...</li>
 *     <li><a href="#">item 2</a></li>
 *   </ul>
 *
 *   or
 *
 *   <input name="search" placeholder="Start typing here" type="text" data-list=".list">
 *   <div class="list">
 *     <span>item 1</span>
 *     <span>...</span>
 *     <span>item 2</span>
 *   </div>
 *
 *   or any similar structure...
 */
(function ($, hideseek) {
  "use strict";

  $.fn.hideseek = function (options) {

    var defaults = {
      list: '.hideseek-data',
      nodata: '',
      attribute: 'text',
      matches: false,
      highlight: false,
      ignore: '',
      headers: '',
      navigation: false,
      ignore_accents: false,
      hidden_mode: false,
      min_chars: 1,
      throttle: 0,
    };

    var options = $.extend(defaults, options);

    return this.each(function () {

      var $this = $(this);

      $this.opts = [];
      $this.state = {};

      $.map(['list', 'nodata', 'attribute', 'matches', 'highlight', 'ignore', 'headers', 'navigation', 'ignore_accents', 'hidden_mode', 'min_chars', 'throttle'], function (val, i) {
        $this.opts[val] = $this.data(val) || options[val];
      });

      if ($this.opts.headers) {
        $this.opts.ignore += $this.opts.ignore ? ', ' + $this.opts.headers : $this.opts.headers;
      }

      var getNormalizedText = function (text) {
        text = text.toLowerCase();
        return $this.opts.ignore_accents ? hideseek.removeAccents(text) : text;
      };

      var $list = $($this.opts.list);

      if ($this.opts.navigation) $this.attr('autocomplete', 'off');

      if ($this.opts.hidden_mode) $list.children().hide();

      $this.keyup(throttle(function (e) {

        var q = getNormalizedText($this.val());

        if ($this.opts.min_chars && q.length < $this.opts.min_chars) {
          // if query is too short show initial set of results
          q = "";
        }

        if (shouldHandleQueryChange($this, q)) {

          $list.children($this.opts.ignore.trim() ? ':not(' + $this.opts.ignore + ')' : '').removeClass('selected').each(function () {

            var data = getNormalizedText(
              $this.opts.attribute != 'text'
                ? ($(this).attr($this.opts.attribute) || '')
                : $(this).text()
            );

            var treaty = data.indexOf(q) == -1 || q === ($this.opts.hidden_mode ? '' : false)

            if (treaty) {

              $(this).hide();

            } else {

              if ($this.opts.matches && q.match(new RegExp(Object.keys($this.opts.matches)[0])) !== null) {

                if (data.match(new RegExp(Object.values($this.opts.matches)[0])) !== null) {
                  show_element($(this));
                } else {
                  $(this).hide();
                }

              }
              else {

                show_element($(this));

              }
            }

            $this.trigger('_after_each');

          });

          // No results message
          if ($this.opts.nodata) {

            $list.find('.no-results').remove();

            if (!$list.children(':not([style*="display: none"])').length) {

              $list
                .children()
                .first()
                .clone()
                .removeHighlight()
                .addClass('no-results')
                .show()
                .prependTo($this.opts.list)
                .text($this.opts.nodata);

              $this.trigger('_after_nodata');

            }

          }

          // hide headers with no results
          if ($this.opts.headers) {
            $($this.opts.headers, $list).each(function () {
              if (!$(this).nextUntil($this.opts.headers).not('[style*="display: none"],' + $this.opts.ignore).length) {
                $(this).hide();
              } else {
                $(this).show();
              }
            });
          }

          $this.trigger('_after');

        };

        function show_element(element) {
          $this.opts.highlight ? element.removeHighlight().highlight(q, $this.opts.ignore_accents).show() : element.show();
        }

        // Navigation
        function current(element) {
          return element.children('.selected:visible');
        };

        function prev(element) {
          return current(element).prevAll(":visible:first");
        };

        function next(element) {
          return current(element).nextAll(":visible:first");
        };

        if ($this.opts.navigation) {

          if (e.keyCode == 38) {

            if (current($list).length) {

              prev($list).addClass('selected');

              current($list).last().removeClass('selected');

            } else {

              $list.children(':visible').last().addClass('selected');

            };

          } else if (e.keyCode == 40) {

            if (current($list).length) {

              next($list).addClass('selected');

              current($list).first().removeClass('selected');

            } else {

              $list.children(':visible').first().addClass('selected');

            };

          } else if (e.keyCode == 13) {

            if (current($list).find('a').length) {

              document.location = current($list).find('a').attr('href');

            } else {

              $this.val(current($list).text());

            };

          };

        };

      }, $this.opts.throttle));

    });

  };

  function throttle(func, time) {
    if (!time || typeof time !== "number" || time <= 0) {
      return func;
    }

    var throttleTimer = 0;

    return function () {
      var args = arguments;

      clearTimeout(throttleTimer);

      throttleTimer = setTimeout(function () {
        func.apply(null, args);
      }, time);
    }
  }

  function shouldHandleQueryChange($this, q) {
    if ($this.state.lastQuery == q) {
      return false;
    }

    $this.state.lastQuery = q;

    return true;
  }

  $(document).ready(function () { $('[data-toggle="hideseek"]').hideseek(); });

})(jQuery, window["hideseek"] = window["hideseek"] || {});
