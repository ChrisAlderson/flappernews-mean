const global = {
  master: true,
  port: 5001,
  workers: 2,
  tempDir: `${process.cwd()}/tmp`,
  dbHosts: ["localhost"],
  Promise
};

export { global };
