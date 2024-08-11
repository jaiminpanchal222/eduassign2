const fs = require('fs');
const yargs = require('yargs');

// File to store the filenames
const filenamesFile = 'filenames.txt';

// Function to get existing filenames from the file
const getExistingFilenames = () => {
  if (fs.existsSync(filenamesFile)) {
    const data = fs.readFileSync(filenamesFile, 'utf8');
    return data.split('\n').filter(Boolean);
  }
  return [];
};

// Function to save a filename to the file
const saveFilename = (filename) => {
  fs.appendFileSync(filenamesFile, filename + '\n');
};

// Function to write text to a new file
const writeToFile = (filename) => {
  fs.writeFileSync(filename, 'You are awesome');
  console.log(`File ${filename} created with text "You are awesome".`);
};

// Set up yargs to take input from the user
yargs.command({
  command: 'create',
  describe: 'Create a new file with a unique name',
  builder: {
    filename: {
      describe: 'Name of the file to be created',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    const userFilename = argv.filename;
    const existingFilenames = getExistingFilenames();

    if (existingFilenames.includes(userFilename)) {
      console.log(`File ${userFilename} already exists. Please provide a new filename.`);
    } else {
      writeToFile(userFilename);
      saveFilename(userFilename);
    }
  }
});

// Parse the command-line arguments
yargs.parse();
