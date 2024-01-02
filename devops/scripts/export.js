const moveOutDirectory = () => {
	const fs = require("fs");
	const path = require("path");
	const commandIndex = process.argv.findIndex(arg => arg === "-o");
	const folder = process.argv[commandIndex + 1]?.startsWith("dist/") ? process.argv[commandIndex + 1] : "dist/prod";
	const distFolder = path.join(__dirname, "../../dist");
	const sourceFolder = path.join(__dirname, "../../out");
	const destinationFolder = path.join(__dirname, `../../${folder}`);
	if (!fs.existsSync(distFolder)) fs.mkdirSync(distFolder);
	fs.rm(destinationFolder, { recursive: true, force: true }, err => {
		console.log(`Moving ${sourceFolder} to ${destinationFolder}`);
		fs.renameSync(sourceFolder, destinationFolder);
	});
};

moveOutDirectory();
