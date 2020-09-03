function randomRange(max, min) {
    return (Math.floor(Math.random() * (+max - +min)) + +min); 
  }
  function getRanDeci(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  
  function drawBubbles() {
    var w = window.innerWidth;
    var bubbles;
    document.getElementById('gooey-anim').innerHTML = '';
  
  
    if(w >= 1000) {
      bubbles = 80;
    } else
      if(w >= 500) {
        bubbles = 40;
      } else if (w >= 0) 
      {
        bubbles = 10;
      }
    console.log(bubbles);
  
  
    for (i = 0; i <= bubbles; i++) {
      var iDiv = document.createElement('div');
      var size = randomRange(120, 50);
  
      iDiv.id = 'blubb' + i;
      iDiv.className = 'blubb';
      iDiv.style.animationDelay = getRanDeci(0,5)+"s";
      iDiv.style.animationDuration = getRanDeci(3,4)+"s";
      iDiv.style.backgroundColor = "#00897b";
      iDiv.style.width = size + "px";
      iDiv.style.height = size + "px";
      iDiv.style.left = randomRange(w, 0) - (size/2) + "px";
      iDiv.style.top = 0;
  
      document.getElementById('gooey-anim').appendChild(iDiv);
  
    }
  }
  
  
  window.onresize = function(event) {
    drawBubbles();
  };

          
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        
            
        
          drawBubbles();
      }
    };