# zip-code-maps

Once upon a time, I saw these maps that showed, by color, what each digit of the zip code was all across the US. Then, in my time of need, I couldn't find them again. So I thought, "I'm a programmer, and the data is out there. Time to do this." So I did.

This one is a weekend project and is pretty rough, so give it a grain of salt.

## Do the thing!

1. Clone the thing and `npm install`.
2. Grab the JSON files from https://github.com/OpenDataDE/State-zip-code-GeoJSON and put them in _data/_
3. `npm run draw`
4. Look at the pretty maps in _output/_

## What did I learn?

- How to use canvas better (it's pretty neat!)
- What GeoJSON is (it's pretty well-designed!)
- `require` keeps the loaded file around whether you like it or not, so don't use it to load big JSON files. Do something like I wrote in _read-json.js_ (though, you should probably make it async).
- Zip codes are fun!
- Don't use d3 unless you have to (which, sometimes you do... but this time, I didn't)

# Thanks

A lot of this is inspired by and adapted from http://mikefowler.me/journal/2014/06/10/drawing-geojson-in-a-canvas. So... thanks!
