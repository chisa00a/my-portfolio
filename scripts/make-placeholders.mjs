// Generates simple gradient placeholder PNGs for assets that were missing
// from the workspace. Replaced once real files are dropped in public/.
import { deflateSync } from 'node:zlib';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

function crc32(buf) {
  let table = crc32.table;
  if (!table) {
    table = crc32.table = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      table[n] = c;
    }
  }
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const out = Buffer.alloc(8 + data.length + 4);
  out.writeUInt32BE(data.length, 0);
  out.write(type, 4, 'ascii');
  data.copy(out, 8);
  out.writeUInt32BE(crc32(Buffer.concat([Buffer.from(type, 'ascii'), data])), 8 + data.length);
  return out;
}

function png(width, height, colorA, colorB) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // truecolor
  const raw = Buffer.alloc(height * (1 + width * 3));
  let p = 0;
  for (let y = 0; y < height; y++) {
    raw[p++] = 0; // filter none
    const t = y / (height - 1);
    for (let x = 0; x < width; x++) {
      const u = x / (width - 1);
      const k = (t * 0.75 + u * 0.25);
      raw[p++] = Math.round(colorA[0] + (colorB[0] - colorA[0]) * k);
      raw[p++] = Math.round(colorA[1] + (colorB[1] - colorA[1]) * k);
      raw[p++] = Math.round(colorA[2] + (colorB[2] - colorA[2]) * k);
    }
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const targets = [
  ['public/images/dropdoii1.jpg', [139, 92, 246], [236, 72, 153]], // Stage / band photo placeholder
  ['public/images/pic2.png', [6, 182, 212], [139, 92, 246]], // Python Essentials 1 (Cisco)
  ['public/images/pic3.png', [16, 185, 129], [6, 182, 212]], // NCSA MOOC 1
  ['public/images/pic4.png', [236, 72, 153], [139, 92, 246]], // Fortinet CyberNet Pro
];

for (const [file, a, b] of targets) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, png(960, 640, a, b));
  console.log('wrote', file);
}
