const requireds = [
  'PROTOCOL',
  'HOST',
  'PORT',
  'NODE_ENV',
];

export default () => {
  for (const required of requireds) {
    if (!process.env[required]) {
      global.logger.log('error', `Missing environment requireds: ${requireds.join()}`);
      process.exit(1);
    }
  }
};
