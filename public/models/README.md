# 3D models

Files in this folder are served straight from the site root. A file at
`public/models/heat-king/hk300.glb` is fetched by the browser as
`/models/heat-king/hk300.glb`, which is exactly the string that goes in the
`modelUrl` field in `lib/models.ts`.

```
public/models/
  heat-king/
    hk300.glb        <- the Heat King 300
  thawzall-xhr/
    xhr475.glb
```

## Format

Use **GLB**. It is a single self contained binary file with the geometry, the
materials and the textures all inside it, so there is nothing else to keep
track of. Plain `.gltf` works too but arrives as a folder of loose files.

Do not put the 3D PDF itself in here. A browser cannot read the 3D geometry
out of a PDF, so it has to be converted first.

## Getting a GLB out of a 3D PDF

A 3D PDF carries its geometry as an embedded U3D or PRC stream. There are two
practical routes:

1. **Ask the supplier for the source CAD.** By far the best option. A STEP,
   SolidWorks or Inventor file converts cleanly and keeps the part names,
   which is what the hotspot markers hang off. The 3D PDF was exported from
   one of these, so it exists somewhere.

2. **Extract from the PDF.** Open the PDF in Adobe Acrobat Pro, right click
   the 3D object, and export the model. That gives a U3D or PRC file, which
   Blender or an online converter turns into GLB. Expect to lose part names
   and to have to redo the materials.

## Before committing a converted file

CAD geometry is far heavier than a web page needs. Run it through
`gltf-transform` first:

```bash
npx @gltf-transform/cli optimize input.glb hk300.glb --compress draco
```

Aim for **under about 15 MB**. A raw CAD conversion is often 100 MB or more,
which is a very slow page on a phone. `optimize` welds vertices, drops unused
nodes, resizes textures and applies Draco mesh compression.

The Draco decoder is committed at `public/draco/`, so compressed files load
without reaching out to a CDN. If you do not compress, nothing in that folder
is ever requested.

## Wiring a new model up

In `lib/models.ts`, set `modelUrl` on the relevant entry:

```ts
modelUrl: "/models/heat-king/hk300.glb",
upAxis: "z-up",
```

`upAxis` matters. Most CAD packages build with Z pointing up, while three.js
uses Y up, so a machine exported straight out of CAD stands on its nose.
Set `"z-up"` to lay it flat. If it comes in already lying flat, remove the
line or set `"y-up"`.

Size and position do not need adjusting. The viewer measures the bounding box
of whatever it loads, scales it so the longest side is 3.4 scene units, and
sits it on the ground plane. Every machine therefore turns up framed the same
way regardless of whether the file was authored in millimetres or inches.

## Hotspots

Hotspot `position` values are `[x, y, z]` in scene units *after* that fitting,
so with the machine centred on the origin, roughly 1.7 units either side of
centre and up to about 3.4 units tall depending on its proportions. The
quickest way to place one is to guess a coordinate, look at where the marker
lands, and nudge it.
