export const gcd_two_numbers = (x, y) => {
    if ((typeof x !== 'number') || (typeof y !== 'number')) 
      return false;
    x = Math.abs(x);
    y = Math.abs(y);
    while(y) {
      var t = y;
      y = x % y;
      x = t;
    }
    return x;
}

 // Returns a random number between the inputted min and max (defaults between 0 - 1)
export const randomInt = (min=0, max=1) => {
	return Math.floor(Math.random() * (max - min + 1) + min)
}