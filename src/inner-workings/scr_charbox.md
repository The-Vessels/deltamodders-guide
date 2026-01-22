# `scr_charbox()`

This is a very important function in Deltarune because it controls these:

**INSERT PICTURE/GIF OF SCR_CHARBOX IN DELTARUNE, HERE!!!**

The source code for Chapter 3's variant of `scr_charbox()`
can be found [here](https://code.deltarune.wiki/ch3/gml_globalscript_scr_charbox).

Explanation of how `scr_charbox()`'s animations work:
```js
if (gc == charpos[c]) {
  // "gc" is the currently selected character.
  // This is checking whether or not the character at index c
  // is the current character.

  // The rest of the statements in here are of the form:
  if (mmy[c] > a) mmy[c] -= b;
  // It means that if mmy is greater than a certain value,
  // then subtract it by a certain value.
  // Notice that when checking for more negative mmy values
  // a smaller value is decremented.
  // This results in an animation that slows down as it approaches
  // its final value, -32.

  // Note that in my testing, mmy only goes between 0 (inactive)
  // and -32 (active). I don't know what the "mmy[c] = -64" thing is.
  // It never ever actually executes in Deltarune, but I don't think
  // it was intended at all. In gonerengine, I changed it to:
  if (mmy[c] < -32) mmy[c] = -32;
  // because it makes more sense.
} else {
  // This just moves mmy back from -32 to 0, and executes
  // whenever a character is unfocused.
  // Lets evaluate this step by step
  // (if it became inactive on frame 1).
  // Frame 0: active, mmy = -32
  // Frame 1: inactive, mmy = -17
  // Frame 2: inactive, mmy = -2
  // Frame 3: inactive, mmy = 0 (and it'll be zero from now on).
  if (mmy[c] < -14) mmy[c] += 15;
  else mmy[c] = 0;
}
```
