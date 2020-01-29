const { argv } = process;

const full = parseInt(argv[2]);
const target = parseInt(argv[3]);
const coef = full/target;
console.log(100/coef);
