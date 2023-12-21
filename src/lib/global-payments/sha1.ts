export const sha1 = string => {
	return stringToHex(arrayToString(run(stringToArray(string), string.length * 8)));
};
/* eslint-disable no-bitwise */

const run = (input, len) => {
	const l = (((len + 64) >> 9) << 4) + 15;
	const W = [
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
	];
	let i = 0;
	let H0 = 1732584193;
	let H1 = -271733879;
	let H2 = -1732584194;
	let H3 = 271733878;
	let H4 = -1009589776;
	let a = H0;
	let b = H1;
	let c = H2;
	let d = H3;
	let e = H4;

	/* eslint-disable no-param-reassign */
	input[len >> 5] |= 0x80 << (24 - (len % 32));
	input[l] = len;

	for (; i < l; i += 16) {
		H0 = a;
		H1 = b;
		H2 = c;
		H3 = d;
		H4 = e;

		let j = 0;
		let t = null;

		for (; j < 80; j += 1) {
			if (j < 16) {
				W[j] = input[i + j];
			} else {
				W[j] = rotl(W[j - 3] ^ W[j - 8] ^ W[j - 14] ^ W[j - 16], 1);
			}
			t = add(add(rotl(a, 5), chMajPty(j, b, c, d)), add(add(e, W[j]), cnst(j)));
			e = d;
			d = c;
			c = rotl(b, 30);
			b = a;
			a = t;
		}

		a = add(a, H0);
		b = add(b, H1);
		c = add(c, H2);
		d = add(d, H3);
		e = add(e, H4);
	}

	return [a, b, c, d, e];
};

const arrayToString = input => {
	const l = input.length * 32;
	let i = 0;
	let output = "";

	for (; i < l; i += 8) {
		output += String.fromCharCode((input[i >> 5] >>> (24 - (i % 32))) & 0xff);
	}
	return output;
};

const stringToArray = input => {
	const l = input.length * 8;
	const output = Array(input.length >> 2);
	const lo = output.length;
	let i = 0;

	for (i = 0; i < lo; i += 1) {
		output[i] = 0;
	}
	for (i = 0; i < l; i += 8) {
		output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (24 - (i % 32));
	}
	return output;
};

const stringToHex = input => {
	const hex = "0123456789abcdef";
	const l = input.length;
	let output = "";
	let x = 0;
	let i = 0;

	for (; i < l; i += 1) {
		x = input.charCodeAt(i);
		output += hex.charAt((x >>> 4) & 0x0f) + hex.charAt(x & 0x0f);
	}
	return output;
};

const chMajPty = (t, b, c, d) => {
	if (t < 20) {
		return (b & c) | (~b & d);
	}
	if (t < 40) {
		return b ^ c ^ d;
	}
	if (t < 60) {
		return (b & c) | (b & d) | (c & d);
	}
	return b ^ c ^ d;
};

const cnst = t => {
	// eslint-disable-next-line no-nested-ternary
	return t < 20 ? 1518500249 : t < 40 ? 1859775393 : t < 60 ? -1894007588 : -899497514;
};

const rotl = (x, n) => {
	return (x << n) | (x >>> (32 - n));
};

const add = (x, y) => {
	const lsw = (x & 0xffff) + (y & 0xffff);
	const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xffff);
};
