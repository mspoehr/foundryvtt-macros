// metadata-name: Token Vision Configuration
// metadata-img: macros/vision_config.png
// end-metadata
// // A macro for the Foundry virtual tabletop that lets a user configure their token's vision and lighting settings. 

let applyChanges = false;
new Dialog({
  title: `Token Vision Configuration`,
  content: `
    <form>
      <div class="form-group">
        <label>Vision Type:</label>
        <select id="vision-type" name="vision-type">
          <option value="nochange">No Change</option>
          <option value="self">Self</option>
          <option value="darkvision30">Darkvision (30 ft)</option>
          <option value="darkvision60">Darkvision (60 ft)</option>
          <option value="darkvision90">Darkvision (90 ft)</option>
          <option value="darkvision120">Darkvision (120 ft)</option>
          <option value="darkvision150">Darkvision (150 ft)</option>
          <option value="darkvision180">Darkvision (180 ft)</option>
          <option value="devilsSight">Devil's Sight (Warlock)</option>
        </select>
      </div>
      <div class="form-group">
        <label>Light Source:</label>
        <select id="light-source" name="light-source">
          <option value="nochange">No Change</option>
          <option value="none">None</option>
          <option value="candle">Candle</option>
          <option value="lamp">Lamp</option>
          <option value="bullseye">Lantern (Bullseye)</option>
          <option value="hooded-dim">Lantern (Hooded - Dim)</option>
          <option value="hooded-bright">Lantern (Hooded - Bright)</option>
          <option value="light">Light (Cantrip)</option>
          <option value="torch">Torch</option>
          <option value="moon-touched">Moon-Touched</option>
          <option value="darkness">Darkness (Spell)</option>
        </select>
      </div>
    </form>
    `,
  buttons: {
    yes: {
      icon: "<i class='fas fa-check'></i>",
      label: `Apply Changes`,
      callback: () => applyChanges = true
    },
    no: {
      icon: "<i class='fas fa-times'></i>",
      label: `Cancel Changes`
    },
  },
  default: "yes",
  close: html => {
    if (applyChanges) {
      let updates = [];
      for ( let token of canvas.tokens.controlled ) {
        let visionType = html.find('[name="vision-type"]')[0].value || "none";
        let lightSource = html.find('[name="light-source"]')[0].value || "none";
        let visionMode = token.document.sight.visionMode;
        let visionRange = token.document.sight.range;
        let dimLight = 0;
        let brightLight = 0;
        let lightAngle = 360;
        let luminosity = 0.5;
        let lockRotation = token.document.lockRotation;
        let lightAnimation = token.document.light.animation;
        let lightAlpha = token.document.light.alpha;
        let lightColor = token.document.light.color;
        const colorFire = "#f8c377";
        const colorWhite = "#ffffff";
        const colorMoonGlow = "#f4f1c9";
        // Get Vision Type Values
        switch (visionType) {
          case "self":
            visionMode = "basic";
            visionRange = 5;
            break;
          case "darkvision30":
            visionMode = "darkvision";
            visionRange = 30;
            break;
          case "darkvision60":
            visionMode = "darkvision";
            visionRange = 60;
            break;
          case "darkvision90":
            visionMode = "darkvision";
            visionRange = 90;
            break;
          case "darkvision120":
            visionMode = "darkvision";
            visionRange = 120;
            break;
          case "darkvision150":
            visionMode = "darkvision";
            visionRange = 150;
            break;
          case "darkvision180":
            visionMode = "darkvision";
            visionRange = 180;
            break;
          case "nochange":
          default:
            dimSight = token.document.dimSight;
            brightSight = token.document.brightSight;
        }
        // Get Light Source Values
        switch (lightSource) {
          case "none":
            dimLight = 0;
            brightLight = 0;
            lightAnimation = {type: "none"};
            break;
          case "candle":
            dimLight = 10;
            brightLight = 5;
            lightAnimation = {type: "torch", speed: 2, intensity: 2};
            lightColor = colorFire;
            lightAlpha = 0.15;
            break;
          case "lamp":
            dimLight = 45;
            brightLight = 15;
            lightAnimation = {type: "torch", speed: 2, intensity: 2};
            lightColor = colorFire;
            lightAlpha = 0.15;
            break;
          case "bullseye":
            dimLight = 120;
            brightLight = 60;
            lockRotation = false;
            lightAngle = 52.5;
            lightAnimation = {type: "torch", speed: 2, intensity: 2};
            lightColor = colorFire;
            lightAlpha = 0.15;
            break;
          case "hooded-dim":
            dimLight = 5;
            brightLight = 0;
            lightAnimation = {type: "torch", speed: 2, intensity: 2};
            lightColor = colorFire;
            lightAlpha = 0.15;
            break;
          case "hooded-bright":
            dimLight = 60;
            brightLight = 30;
            lightAnimation = {type: "torch", speed: 2, intensity: 2};
            lightColor = colorFire;
            lightAlpha = 0.15;
            break;
          case "light":
            dimLight = 40;
            brightLight = 20;
            lightAnimation = {type: "none"};
            lightColor = colorWhite;
            lightAlpha = 0;
            break;
          case "torch":
            dimLight = 40;
            brightLight = 20;
            lightAnimation = {type: "torch", speed: 2, intensity: 2};
            lightColor = colorFire;
            lightAlpha = 0.15;
            break;
          case "moon-touched":
            dimLight = 30;
            brightLight = 15;
            lightAnimation = {type: "none"};
            lightColor = colorMoonGlow;
            break;
          case "darkness":
            dimLight = 0;
            brightLight = 15;
            luminosity = -0.5;
            break;
          case "nochange":
          default:
            dimLight = token.document.light.dim;
            brightLight = token.document.light.bright;
            lightAngle = token.document.light.angle;
            lockRotation = token.document.lockRotation;
            lightAnimation = token.document.light.animation;
            lightAlpha = token.document.light.alpha;
            lightColor = token.document.light.color;
        }
        // Update Token
        updates.push({
          _id: token.id,
          "sight.enabled": true,
          "sight.visionMode": visionMode,
          "sight.range": visionRange,
          "light.dim": dimLight,
          "light.bright":  brightLight,
          "light.angle": lightAngle,
          lockRotation: lockRotation,
          "light.animation": lightAnimation,
          "light.alpha": lightAlpha,
          "light.color": lightColor,
          "light.luminosity": luminosity,
        });
      }
      canvas.scene.updateEmbeddedDocuments("Token", updates);
    }
  }
}).render(true);