;(function(win, doc) {

'use strict';
 


  //https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_slider_role#Possible_effects_on_user_agents_and_assistive_technology

  var seekbar = doc.querySelector( '#player__seek-bar' );
  var seekbarValue;
  const playButton = doc.querySelector( '#player__play' );
  const playButtonIcon = doc.querySelector( '.js-player__play .icon' );


  seekbar.addEventListener('input', function() {
    seekbarValue = seekbar.value;
    outputUpdate(seekbarValue);
  }, false);

  function outputUpdate(val) {
    doc.querySelector('#player__time-elapsed').value = val;
  }

  // we need to set this here for now.
  var marquee;

  // first, let's grab the element we're going to move around
  var marquee_el = doc.querySelector('.player__screen-collection');
  var children = [].slice.call(marquee_el.querySelectorAll( '.player__screen-item'));

  // the key here is not to animate all of the cells in the grid, which might be products or what have you; we have a grid constrained by a container, so we can just translate the entire grid and only the part of the grid that fits into the container will be visible anyway
  function createMarquee() {
    
    // just to be doubly sure there's an animation method...
    if ('animate' in marquee_el && typeof marquee_el.animate === 'function') {
      
      // we're going to recreate the marquee animation when 
      // the viewport is resized so get rid of any existing 
      // animation first
      if( typeof marquee !== 'undefined' ) { marquee.cancel(); }

      // set this dynamically, so the thing will gracefully degrade to a typical grid of items
      marquee_el.style.whiteSpace = 'nowrap';

      // create a variable for the distance by which the grid element will be transformed
      var displacement = 0;

      // the width of all the elements in the marquee
      // it's important to total up the child element widths because if overflow is hidden,
      // the clientWidth of the grid_to_animate element will be that of the parent element
      displacement = children.map(function(child) {
        return child.clientWidth;
      }).reduce(function(acc, next) {
        return acc + next;
      }) - marquee_el.clientWidth << 0;
      /*for ( var j = 0; j < children.length; ++j ) {
        displacement += children[j].clientWidth;
        console.log(displacement)
      }*/

      // crucial: subtract the width of the container
      // take the opportunity to round the displacement
      // value down to the nearest pixel
      // the browser may thank you for this by not blurring
      displacement = (displacement - marquee_el.clientWidth) << 0;

      // by using the variable 'marquee' we created in the parent
      // scope, we can easily use the reference to pause/cancel the
      // animation later if necessary
      marquee = marquee_el.animate([
        // these are your keyframes, if you are familiar with the
        // CSS syntax
        // so your 'from' or '0%' keyframe translates to 'offset: 0'
        // 'to'/'100%' translates to 'offset: 1'
        // and anything in betwen like '54%' will be 'offset: .54'
        { transform: 'matrix(1, 0.00, 0.00, 1, 0, 0)', offset: 0 },
        { transform: 'matrix(1, 0.00, 0.00, 1,' + displacement + ', 0)', offset: 1 }
      ],
      {
        // animation-duration = 1 second for each element in marquee
        // arbitrary decision
        duration: children.length * 4e3,

        // could be 'ease', 'cubic-bezier(.4,0,.2,1)', etc.
        easing: 'linear',

        // useful if you don't want the animation to start until your content has loaded from, say, a REST API and you want to speculate a reasonable time for that to take
        delay: 0,

        // kind of crucial for a marquee...
        iterations: Infinity,

        // invert animation after completion, so it scrolls backwards
        direction: 'alternate',

        // you would use this if your animation is set to occur only 
        // a finite number of times, and you wanted the animated 
        // element to finish at the end keyframe, rather than the 
        // first keyframe
        fill: 'forwards'
      });
      marquee.pause();
    } 
  }


  // quick check for the WAAPI method
  // you could also do if (typeof grid_to_animate.animate !== 'undefined')
  // but this is cleaner in my opinion
  if ('animate' in marquee_el && typeof marquee_el.animate === 'function') {
    
    // okay, let's fire up the marquee!
    createMarquee();

    // now for the playing/pausing
    //marquee_el.addEventListener('mouseenter', pauseMarquee, false);
    //marquee_el.addEventListener('mouseleave', playMarquee, false);
    playButton.addEventListener('click', playMarquee, false);
    //playButton.addEventListener('click', pauseMarquee, false);
    
    // and resizing
    win.addEventListener('resize', debounce( createMarquee ), false);
    
  } else {
      // let's say hello to those using Safari
      // or indeed users of IE, not-recently-updated FF, very old Chrome, old Opera, etc.
      doc.querySelector('h1').innerHTML = 'Your browser does not appear to <br> support the Web Animation API';
      doc.querySelector('h2').innerHTML = 'So you see a grid of items like this';
  }

  function playMarquee() {
    if ( marquee.playState === 'paused' ) {
      playButtonIcon.classList.remove('icon-play3');
      playButtonIcon.classList.add('icon-pause2');
      updateMarquee(1);
      marquee.play();
    }
    else {
      playButtonIcon.classList.remove('icon-pause2');
      playButtonIcon.classList.add('icon-play3');
      marquee.pause();
    }
  }

  function pauseMarquee() {
    if ( marquee.playState === 'running' ) {
      marquee.pause();
    }
    else {
      marquee.play();
    }
  }

  // a debouncing function using requestAnimationFrame
  // this is just an easy-to-use wrapper I like to use
  // for event handlers
  function debounce(func) {
    var scheduled, context, args;
    return function() {
      context = this; args = [];
      for(var i = 0; i < arguments.length; ++i) args[i] = arguments[i];
      !!scheduled && win.cancelAnimationFrame(scheduled);
      scheduled = win.requestAnimationFrame(function(){
        func.apply(context, args);
        scheduled = null;
      });
    }
  }

  function updateMarquee(animDuration) {
    console.log(marquee);
    marquee.playbackRate = (animDuration) || (1);
  }
})(window, document);