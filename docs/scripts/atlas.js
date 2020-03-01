var Atlas = function() {
  function getTileList() {
    return [
      'Wall',
      'Grass',
      'Dirt',
      'Stone',
      'Gold',
      'Silver',
      'Bronze',
      'Iron',
      'Copper',
      'TNT',
    ];
  };

  const size = {
    width: 1024,
    height: 1024,
  };

  function resetAtlas(atlas) {
    switch (atlas.name) {
      case 'Wall':
      case 'Gold':
      case 'Silver':
      case 'Bronze':
      case 'Iron':
      case 'Copper':
      case 'TNT':
      case 'Grass':
        break;
      default:
        console.log('Sorry, we are out of ' + atlas.name + '.');
    }
  };

  // Atlas Module
  return {
    // Public Members
    name: getTileList()[0], // CSS string
    size: size,
    // Public Methods
    getTileList: getTileList,
    resetAtlas: resetAtlas,
  };
}
