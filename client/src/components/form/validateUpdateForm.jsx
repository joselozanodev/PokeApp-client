export const validateUpdateForm = (pokemon) => {
    let errors = {};
  
    if (pokemon.hp < 100 || pokemon.hp > 500) {
      errors.hp = "HP must be between 100 and 500";
    } else if (pokemon.hp === "") {
      errors.hp = "HP is required";
    } else if (!/^\d+$/.test(pokemon.hp)) {
      errors.hp = "HP must be a number";
    }
  
    if (pokemon.attack < 0 || pokemon.attack > 200) {
      errors.attack = "Attack must be between 0 and 200";
    } else if (pokemon.attack === "") {
      errors.attack = "Attack is required";
    } else if (!/^\d+$/.test(pokemon.attack)) {
      errors.attack = "Attack must be a number";
    }
  
    if (pokemon.defense === "") {
      errors.defense = "Defense is required";
    } else if (pokemon.defense < 5 || pokemon.defense > 200) {
      errors.defense = "Defense must be between 5 and 200";
    } else if (!/^\d+$/.test(pokemon.defense)) {
      errors.defense = "Defense must be a number";
    }
  
    if (pokemon.speed !== null && (pokemon.speed < 10 || pokemon.speed > 150)) {
      errors.speed = 'Speed must be between 10 and 150'
    } else if (pokemon.speed !== undefined && !/^\d+$/.test(pokemon.speed)) {
      errors.speed = 'Speed must be a number'
    }
  
    if (pokemon.height !== null && (pokemon.height < 1 || pokemon.height > 15)) {
      errors.height = 'Height must be between 1 and 15'
    } else if (pokemon.height !== undefined && !/^\d+$/.test(pokemon.height)) {
      errors.height = 'Height must be a number'
    }
  
    if (pokemon.weight !== null && (pokemon.weight < 1 || pokemon.weight > 1000)) {
      errors.weight = 'Weight must be between 1 and 100'
    } else if (pokemon.weight !== undefined && !/^\d+$/.test(pokemon.weight)) {
      errors.weight = 'Weight must be a number'
    }
  
    if (!pokemon.image.trim()) {
      errors.image = "Image is required";
    } else if (!/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(pokemon.image)) {
      errors.image = "Image must be a valid URL";
    }
  
    return errors;
  };
  