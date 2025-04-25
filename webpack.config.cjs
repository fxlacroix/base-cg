const path = require("path");
const glob = require("glob"); // Importer le module glob
const CopyPlugin = require("copy-webpack-plugin");
const { exec } = require("child_process");

// Utiliser glob pour récupérer tous les fichiers .js dans src et autres dossiers
const entryFiles = glob.sync(path.resolve(__dirname, "src/**/*.js")); // Cela prend tous les .js dans le dossier src

module.exports = {
  mode: "development",
  target: "node", // 👈 Important si tu veux cibler Node.js
  entry: entryFiles, // Tous les fichiers JS seront inclus
  output: {
    filename: "index.js", // Ce fichier contiendra tous les fichiers combinés
    path: path.resolve(__dirname, "dist"),
  },
  watchOptions: {
    ignored: ["**/*.swp", "**/~*", "**/.#*"], // Ignorer les fichiers temporaires
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "dist/index.js"),
          to: path.resolve(__dirname, "dist"),
          toType: "dir",
          noErrorOnMissing: true,
          transform(content, path) {
            // Copier le contenu dans le presse-papiers avec pbcopy
            exec(`cat "${path}" | pbcopy`);
            return content;
          },
        },
      ],
    }),
  ],
};
