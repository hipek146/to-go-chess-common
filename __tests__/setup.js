global.console = {
    log: jest.fn(), // console.log are ignored in tests
    error: console.error,
    warn: jest.fn(),
    info: console.info,
    debug: console.debug,
};