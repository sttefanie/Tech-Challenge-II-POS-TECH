module.exports = {
  presets: [
    [
      "@babel/preset-env",  // Este preset permite que o Babel converta código moderno (ES6+) para uma versão compatível com o Node.js
      {
        targets: {
          node: "current"  // Esta linha garante que o Babel converta o código de acordo com a versão do Node.js que você está utilizando
        }
      }
    ]
  ]
};
