export function findHighestZIndex(elem:string)
{
  var elems = document.getElementsByTagName(elem);
  var highest = Number.MIN_SAFE_INTEGER || -(Math.pow(2, 53) - 1);
  for (var i = 0; i < elems.length; i++)
  {
    var val = document.defaultView?.getComputedStyle(elems[i], null).getPropertyValue("z-index")
    
    if (val){
        var zindex = Number.parseInt(
            val ,
          10
        );
        if (zindex > highest)
        {
          highest = zindex;
        }
    }
    
  }
  return highest;
}