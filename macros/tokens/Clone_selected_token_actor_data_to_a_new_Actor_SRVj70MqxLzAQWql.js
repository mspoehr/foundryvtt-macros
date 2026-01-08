// metadata-name: Clone selected token actor data to a new Actor
// metadata-img: icons/svg/dice-target.svg
// end-metadata
const actorNameSuffix = "_cloned";

canvas.tokens.controlled.forEach(o => {
  Actor.create(o.actor).then(a => {
    a.update({name: a.name + actorNameSuffix});
  });
});